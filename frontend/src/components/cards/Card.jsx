import React, { useState } from "react";
import card from "./card.module.css";
import imag from "./upload-icon.png";

const Card = ({ id, name, content, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(name);
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleSave = () => {
    onEdit(id, updatedTitle, updatedContent);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete note:", errorData.message || response.statusText);
        return;
      }

      onDelete(id); // Remove from UI
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className={card.container}>
      {isEditing ? (
        <>
          <input
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className={card.input}
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className={card.textarea}
          />
          <button className={card.save} onClick={handleSave}>Save</button>
          <button className={card.cancel} onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div className={card.title}>{name}</div>
          <div className={card.description}>{content}</div>

          <div className={card.buttonContainer}>
            <label htmlFor={`upload-${id}`}>
              <img className={card.photoIcon} src={imag} alt="Upload" />
            </label>
            <input type="file" id={`upload-${id}`} accept="image/*" hidden />

            <button className={card.delete} onClick={handleDelete}>Delete</button>
            <button className={card.edit} onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
