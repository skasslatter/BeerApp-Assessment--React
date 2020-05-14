import React from 'react';
// import './App.css';

import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Beers from "./pages/Beers";
import BeerDetail from "./pages/BeerDetail";

import Breweries from "./pages/Breweries";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/beers" component={Beers}></Route>
          <Route exact path="/breweries" component={Breweries}></Route>
          <Route exact path="/beers/:id" component={BeerDetail}></Route>
        </Switch>
      </header>
      <Footer />
    </div>
  );
}

export default App;
