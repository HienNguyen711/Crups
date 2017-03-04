import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import FloatingActionButton from 'material-ui/FloatingActionButton';
const style = {
  marginRight: 20,
};
class Book extends Component {
  componentDidMount() {
    this.props.fetchReaders(this.props.readerIds);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addReader(this.refs.newReaderInput.value, this.props._id);
    this.refs.newReaderInput.value = '';
  };
  render() {
    return (

       <div className="Book">
      <Card>

    <CardMedia
      overlay={<CardTitle title={this.props.bookName} subtitle={this.props.categoryName} />}
    >
      <img src="http://www.pro-react.com/images/book.jpg" />
    </CardMedia>
    <CardTitle title="Book description" subtitle="Book content" />
    <CardText>
      {this.props.description}
    </CardText>

      </Card>
      <List>

       {this.props.readerIds.map(readerId =>
        <ListItem key={readerId}
        primaryText={this.props.lookupReader(readerId).name}
        leftAvatar={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2000px-Octicons-mark-github.svg.png" />}
        rightIcon={<CommunicationChatBubble />}
        />
       )}



      </List>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Readers</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {this.props.readerIds.map(readerId =>

                <li key={readerId} className="list-group-item">
                   <FontIcon
      className="muidocs-icon-action-home"

    />
                  {this.props.lookupReader(readerId).name}
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
                   ref="newReaderInput"
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


          <FloatingActionButton secondary={true} style={style}
             onClick={this.props.bookListClick}>

Back
    </FloatingActionButton>
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
