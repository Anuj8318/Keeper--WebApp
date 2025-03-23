import React, { useState } from "react";
import axios from "axios";
import "./notes.css";

const KeepInputBox = ({ onNoteAdded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title,setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [color,setColor] = useState("default");
  // const [note, setNote] = useState({ title: "", info: "", color: "default" });

    const handleChange1 = (e) => {
      setTitle(e.target.value);
      console.log(title);
    }
    const handleChange2 = (e) => {
      setInfo(e.target.value);
      console.log(info);
    }
    const handleChange3 = (e) => {
      setColor(e.target.value);
      console.log(color);
    }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !info) return;

    try {
      const payload = {title,info,color};
      console.log(payload);
      
      console.log("Note Saved:", info);
      const response = await axios.post(
        "http://localhost:3000/api/notes",
        payload
      );
      console.log("Note Saved:", response.data);
      console.log("Note Saved:", title);
      setTitle("");
      setInfo("");
      setColor("");
      
      // setNote({ title: "", info: "", color: "default" });
      console.log("Note Saved:", title);
      setIsExpanded(false);
      if (onNoteAdded) onNoteAdded(response.data);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`container ${isExpanded ? "expanded" : ""}`}
      onClick={() => setIsExpanded(true)}
    >
      <input
        type="text"
        name="title"
        placeholder="Title..."
        className={`title-input ${isExpanded ? "show" : "hide"}`}
        value={title}
        onChange={handleChange1}
      />
      <textarea
        name="info"
        placeholder="Take a note..."
        className="note-input"
        rows={isExpanded ? "3" : "1"}
        value={info}
        onChange={handleChange2}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}



        
      />
      {/* {isExpanded && (
        <> */}
          <select
            name="color"
            value={color}
            onChange={handleChange3}
            className="color-picker"
          >
            <option value="default">Default</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
          <button type="submit" className="save-button">
            Save
          </button>
        {/* </>
      )} */}
    </form>
  );
};

export default KeepInputBox;
