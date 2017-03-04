import React from 'react';
import Header from './Header';
import axios from 'axios';
import BookPreview from './BookPreview';

class App extends React.Component {
  state = {
    pageHeader: 'Crups',
    books:this.props.initialBooks
  };
  componentDidMount() {

  }
  componentWillUnmount() {
    // clean timers, listeners
  }



   render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
         <div>
          {this.state.books.map(book =>
            <BookPreview key={book.id} {...book} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
