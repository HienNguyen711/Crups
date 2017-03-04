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
          [book._id]: book
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
  fetchReaders = (readerIds) => {
    if (readerIds.length === 0) {
      return;
    }
    api.fetchReaders(readerIds).then(readers => {
      this.setState({
        readers
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

 lookupReader = (readerId) => {
    if (!this.state.readers || !this.state.readers[readerId]) {
      return {
        reader: '...'
      };
    }
    return this.state.readers[readerId];
  };
  addReader = (newReader, bookId) => {
    api.addName(newReader, bookId).then(resp =>
      this.setState({
        books: {
          ...this.state.books,
          [resp.updatedBook._id]: resp.updatedBook
        },
        readers: {
          ...this.state.readers,
          [resp.newReader._id]: resp.newReader
        }
      })
    )
    .catch(console.error);
  };
  currentContent() {
    if (this.state.currentBookId) {
      return <Book
               bookListClick={this.fetchBookList}
               fetchReaders={this.fetchReaders}
               lookupReader={this.lookupReader}
               addReader={this.addReader}
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
