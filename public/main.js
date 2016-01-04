var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('../components/comment-box.js');

 ReactDOM.render(
          <CommentBox url="/api/comments" pollInterval={2000} />,
          document.getElementById('content')
        );