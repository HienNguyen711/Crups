import React from 'react';
import Header from './Header';
import axios from 'axios';
import BookPreview from './BookPreview';
import * as api from '../api';
import BookList from './BookList';
import Book from './Book';
//for simple routing
const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

const onPopState = handler => {
  window.onpopstate = handler;
};
class App extends React.Component {
   static propTypes = {
    initialData: React.PropTypes.object.isRequired
  };
  state = this.props.initialData;
  componentDidMount() {
    onPopState((event) => {
      this.setState({
        currentBookId: (event.state || {}).currentBookId
      });
    });
  }
  componentWillUnmount() {
    onPopState(null);
  }

  fetchBook = (bookId) => {
    pushState(
      { currentBookId: bookId },
      `/book/${bookId}`
    );
    api.fetchBook(bookId).then(book => {
      this.setState({
        currentBookId: book.id,
        books: {
          ...this.state.books,
          [book.id]: book
        }
      });
    });
  };
  fetchBookList = () => {
    pushState(
      { currentBookId: null },
      '/'
    );
    api.fetchBookList().then(books => {
      this.setState({
        currentBookId: null,
        books
      });
    });
  };
  currentBook() {
    return this.state.books[this.state.currentBookId];
  }
  pageHeader() {
    if (this.state.currentBookId) {
      return this.currentBook().bookName;
    }

    return 'Book List';
  }
  currentContent() {
    if (this.state.currentBookId) {
      return <Book
               bookListClick={this.fetchBookList}
               {...this.currentBook()} />;
    }

    return <BookList
            onBookClick={this.fetchBook}
            books={this.state.books} />;
  }
  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
