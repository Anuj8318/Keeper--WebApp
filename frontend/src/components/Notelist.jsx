import React, { useEffect, useState } from "react";
import Card from "./cards/Card";
import style from "./cards/card.module.css";

function Notelist() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Delete Note Function
  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/notes?id=${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit Note Function
  const editNote = async (id, newTitle, newInfo) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, info: newInfo }),
      });

      const updatedNote = await response.json();
      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <>
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
            <p style={{textAlign:"center",fontSize:"2rem", fontFamily:"cursive"}}>No notes available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Notelist;
