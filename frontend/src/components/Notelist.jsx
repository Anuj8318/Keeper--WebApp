import React, { useEffect, useState } from "react";
import Card from "./cards/Card";
import style from "./cards/card.module.css";

function Notelist() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, [notes,setNotes]);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized or failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:3000/api/notes?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = async (id, newTitle, newInfo) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, info: newInfo }),
      });

      const updatedNote = await response.json();
      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className={style.contain}>
      <div className={style.holder}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              name={note.title}
              content={note.info}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "2rem", fontFamily: "cursive" }}>
            No notes available
          </p>
        )}
      </div>
    </div>
  );
}

export default Notelist;
