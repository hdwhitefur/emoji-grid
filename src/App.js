import React from 'react';
import Nav from "./Nav";
import Grid from "./Grid";
import Control from "./Control";
import './App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <Grid width="30" height="30" />
      <Control />
    </div>
  );
}

export default App;
