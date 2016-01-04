var React = require('react');
var Comment = require('./comment.js');

var CommentList = React.createClass({
  render: function() {

    var commentNodes = this.props.data.map(function(comment){
      return(
        <Comment author={comment.author} key={comment.id}>
        {comment.text}
        </Comment>  
        );
    });

    return (
      <div className="CommentList">
      {commentNodes}
      </div>
      );
  }
});

module.exports = CommentList;