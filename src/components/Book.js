import React, { Component, PropTypes } from 'react';

class Book extends Component {
  render() {
    return (
      <div className="Book">
        <div className="book-description">
          {this.props.description}
        </div>
        <div className="home-link link"
             onClick={this.props.bookListClick}>
          Back to Book List
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  description: PropTypes.string.isRequired,
  bookListClick: PropTypes.func.isRequired,
};

export default Contest;
