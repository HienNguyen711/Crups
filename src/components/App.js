import React from 'react';
import Header from './Header';
import axios from 'axios';
import BookPreview from './BookPreview';
import * as api from '../api';
import BookList from './BookList';
import Book from './Book';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
//for simple routing
const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

const onPopState = handler => {
  window.onpopstate = handler;
};

//mui
const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
  userAgent: 'all',
});



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
    api.addReader(newReader, bookId).then(resp =>
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
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

      <div className="App">
        <AppBar title="Welcome to Crups - The Book List" />
        <Header message={this.pageHeader()} />

        {this.currentContent()}

          <RaisedButton
            label="See more"
            secondary={true}
          />


      </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
