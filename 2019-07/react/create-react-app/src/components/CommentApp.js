import React, {Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: []
    };
  }

  onSubmit = item => {
    if (!item.comment.trim()) {
      alert('评论不能为空');
      return;
    }
    let oldComments = this.state.commentList;
    oldComments.push(item.comment);
    this.setState({
      commentList: oldComments,
    });
  };

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.onSubmit}/>
        <CommentList commentList={this.state.commentList}/>
      </div>
    )
  }
}

export default CommentApp;