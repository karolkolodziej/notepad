import React from "react";

import { Navi } from "./components/Navi";
import AddNote from "./components/AddNote";
import List from "./components/List";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Navi />
      <AddNote />
      <List />
    </div>
  );
}

export default App;
