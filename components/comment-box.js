require('whatwg-fetch');
var React = require('react');
var CommentList = require('./comment-list.js');
var CommentForm = require('./comment-form.js');


var CommentBox = React.createClass({
  loadCommmentsFromServer : function() {

    var self = this;

    fetch(self.props.url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      self.setState({data: json});
    }).catch(function(err) {
      console.error(self.props.url,err);
    });

  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;

    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data:newComments});

    var self = this;

    fetch(self.props.url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    }) 
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      self.setState({data: json});
    }).catch(function(err) {
      console.error(self.props.url,err);
      self.setState({data:comments});
    });

  },
  getInitialState : function() {
    return { data: [] };
  },
  componentDidMount: function() {
    this.loadCommmentsFromServer();
    setInterval(this.loadCommmentsFromServer,this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
      );
  }
});

module.exports = CommentBox;
