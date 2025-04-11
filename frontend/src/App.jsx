import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Notes from "./components/notes/Notes";
import Notelist from "./components/Notelist";
import "./App.css";
import style from "./components/cards/card.module.css";

const App = () => {

  return (

    <div className={style.mainy}>
    <Notes></Notes>
    <Notelist></Notelist>
    {/* cardbody */}
  </div>
  );
};

export default App;
