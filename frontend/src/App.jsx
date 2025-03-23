import React from "react";
import Header from "./components/header/Header";
import "./App.css";
import Footer from "./components/footer/Footer";
import Notes from "./components/notes/Notes";
// import Card from "./components/cards/Card";
// import info from "./components/cards/Info";
import style from "./components/cards/card.module.css";
import Notelist from "./components/Notelist";



const App = () => {
  return (
    <div className={style.mainy}>
      <Header></Header>
      <Notes></Notes>
      <Notelist></Notelist>
      {/* cardbody */}
      <Footer></Footer>
    </div>
  );
};

export default App;

// cardBody
