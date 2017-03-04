import React, { Component, PropTypes } from 'react';

class Book extends Component {
  componentDidMount() {
    this.props.fetchReaders(this.props.readerIds);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addReader(this.refs.newReaderInput.value, this.props._id);
    this.refs.newReaderInput.value = '';
  };
  render() {
    return (
       <div className="Book">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Book description</h3>
          </div>
          <div className="panel-body">
            <div className="book-description">
              {this.props.description}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Readers</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {this.props.readerIds.map(readerId =>
                <li key={readerId} className="list-group-item">
                  {this.props.lookupReader(readerId).reader}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Reader</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input type="text"
                   placeholder="New Reader Here..."
                   ref="newReaederInput"
                   className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">
                     Sumbit
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="home-link link"
             onClick={this.props.bookListClick}>
          Return back Book List
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  _id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bookListClick: PropTypes.func.isRequired,
  fetchReaders: PropTypes.func.isRequired,
  readerIds: PropTypes.array.isRequired,
  lookupReader: PropTypes.func.isRequired,
  addReader: PropTypes.func.isRequired,
};

export default Book;
