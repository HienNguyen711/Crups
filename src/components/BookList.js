import React from 'react';
import BookPreview from './BookPreview';

const BookList = ({ books, onBookClick }) => (
  <div className="BookList">
    {Object.keys(books).map(bookId =>
      <BookPreview
        key={bookId}
        onClick={onBookClick}
        {...books[bookId]} />

    )}

  </div>
);

BookList.propTypes = {
  books: React.PropTypes.object,
  onBookClick: React.PropTypes.func.isRequired,
};

export default BookList;

