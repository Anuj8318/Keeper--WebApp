import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticateToken from './authMiddleware.js';

const app = express();
const port = 3000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const JWT_SECRET = process.env.SECRET_KEY || 'your_default_secret'; // fallback

// ✅ Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userCheck = await db.query("SELECT * FROM users WHERE LOWER(email) = LOWER($1)", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, email",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userResult = await db.query("SELECT * FROM users WHERE LOWER(email) = LOWER($1)", [email]);
    const user = userResult.rows[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Save Note Route (Protected)
app.post("/api/notes", authenticateToken, async (req, res) => {
    try {
      const { title, info, color } = req.body; // ✅ correctly match the frontend payload
      const userId = req.user.userId;          // ✅ coming from the auth middleware
  
      if (!title || !info) {
        return res.status(400).json({ message: "Title and note content are required" });
      }
  
      const newNote = await db.query(
        "INSERT INTO notes (title, info, color, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, info, color, userId] // ✅ variables now correctly match
      );
  
      res.status(201).json({ message: "Note saved successfully", note: newNote.rows[0] });
    } catch (error) {
      console.error("Error saving note:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  

// Get Notes - Only user’s own notes
app.get("/api/notes", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await db.query(
            "SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Update Note - Make sure user owns it
app.patch("/api/notes/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const updates = req.body;

        // Check if the note belongs to the user
        const check = await db.query("SELECT * FROM notes WHERE id = $1 AND user_id = $2", [id, userId]);
        if (check.rowCount === 0) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(", ");
        const values = Object.values(updates);

        if (fields.length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const query = `UPDATE notes SET ${fields} WHERE id = $${values.length + 1} RETURNING *`;
        const result = await db.query(query, [...values, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Delete Note - Only if owned by user
app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const check = await db.query("SELECT * FROM notes WHERE id = $1 AND user_id = $2", [id, userId]);
        if (check.rowCount === 0) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await db.query("DELETE FROM notes WHERE id = $1", [id]);
        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
