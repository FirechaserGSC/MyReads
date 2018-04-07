import React from "react";
import { Route } from "react-router-dom";
import ListBooks from "./ListBooks";
import SearchBook from "./SearchBook";
import "./App.css";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBook />} />
        <Route exact path="/" render={() => <ListBooks />} />
      </div>
    );
  }
}

export default BooksApp;
