import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class ListBooks extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    changed: false
  };

  componentDidMount = () => this.getBooks();

  getBooks = async () => {
    const books = await BooksAPI.getAll();
    this.setState({
      currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
      wantToRead: books.filter(book => book.shelf === "wantToRead"),
      read: books.filter(book => book.shelf === "read")
    });
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading
                    .filter(book => book.shelf === "currentlyReading")
                    .map((book, index) => (
                      <li key={index}>
                        <Book book={book} onChange={this.getBooks.bind(this)}/>
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead
                    .filter(book => book.shelf === "wantToRead")
                    .map((book, index) => (
                      <li key={index}>
                        <Book book={book} onChange={this.getBooks.bind(this)}/>
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.filter(book => book.shelf === "read").map((book, index) => (
                    <li key={index}>
                      <Book book={book} onChange={this.getBooks.bind(this)}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
