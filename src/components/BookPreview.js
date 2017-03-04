import React, { Component } from 'react';

class BookPreview extends Component{
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
   render() {
    return (
      <div className="link BookPreview" onClick={this.handleClick}>
        <div className="category-name">
          {this.props.categoryName}
        </div>
        <div className="book-name">
          {this.props.bookName}
        </div>
      </div>
    );
  }
}

BookPreview.propTypes = {
  _id: React.PropTypes.number.isRequired,
  categoryName: React.PropTypes.string.isRequired,
  bookName: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default BookPreview;
