import React from 'react';
// import './App.css';

import { Switch, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Beers from "./pages/Beers";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/beers" component={Beers}></Route>
        </Switch>
      </header>
      <Footer />
    </div>
  );
}

export default App;
