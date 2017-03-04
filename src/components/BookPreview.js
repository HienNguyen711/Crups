import React from 'react';

const BookPreview = (book) => (
  <div className="BookPreview">
    <div className="category-name">
      {book.categoryName}
    </div>
    <div className="book-name">
      {book.bookName}
    </div>
  </div>
);

export default BookPreview;
