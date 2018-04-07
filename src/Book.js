import React from "react";
import * as BooksAPI from "./BooksAPI";

class Book extends React.Component {
  state = {
    shelf: 'none'
  }

  selectShelf = event => {
    this.setState({ shelf: event.target.value });
    BooksAPI.update(this.props.book, event.target.value);
    this.props.onChange && this.props.onChange();
  }

  render() {
    const { shelf } = this.state;
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.selectShelf} value={book.shelf || shelf}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    );
  }
}

export default Book;
