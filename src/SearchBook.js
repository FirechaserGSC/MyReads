import React from "react";
import { Link } from "react-router-dom";
import Book from './Book';
import * as BooksAPI from "./BooksAPI";

class SearchBook extends React.Component {
  state = {
    books: [],
    query: '',
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount = () => this.getBooks();

  getBooks = async () => {
    const books = await BooksAPI.getAll();
    this.setState({
      shelves: {
        currentlyReading: books.filter(book => book.shelf === "currentlyReading").map(book => book.id),
        wantToRead: books.filter(book => book.shelf === "wantToRead").map(book => book.id),
        read: books.filter(book => book.shelf === "read").map(book => book.id)
      }
    });
  }

  updateQuery = async query => {
    query = query.trim();
    this.setState({ query });
    if (!query) {
      this.setState({ books: [] })
    } else {
      let searchResults = await BooksAPI.search(query);
      if (!searchResults || searchResults.error) {
        this.setState({ books: [] })
      } else {
        searchResults = searchResults.map(book => {
          for (const shelf in this.state.shelves) {
            if (this.state.shelves[shelf].includes(book.id)) {
              book.shelf = shelf;
            }
          }
          return book;
        })
        this.setState({ books: searchResults});
      }
    }
  };

  render() {
    const { books, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book, index) => (
              <li key={index}>
                <Book book={book}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
