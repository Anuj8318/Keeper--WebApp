import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// API to Save Notes
app.post("/api/notes", async (req, res) => {
    try {
        const { title, info, color } = req.body; 
        const result = await db.query(
            "INSERT INTO notes (title, info, color) VALUES ($1, $2, $3) RETURNING *",
            [title, info, color || 'default']
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// API to Get Notes
app.get("/api/notes", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// PATCH API to Partially Update a Note
app.patch("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Dynamically building the query
        const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(", ");
        const values = Object.values(updates);

        if (fields.length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const query = `UPDATE notes SET ${fields} WHERE id = $${values.length + 1} RETURNING *`;
        const result = await db.query(query, [...values, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


//  API to Delete a Note
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

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
