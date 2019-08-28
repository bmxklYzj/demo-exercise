import React, {Component} from 'react';
import Comment from "./Comment";

class CommentList extends Component {
    static defaultProps = {
        commentList: []
    };

    render() {
        return (
            <div>
                {this.props.commentList.map((item, index) => <Comment comment={item} key={index}/>)}
            </div>
        )
    }
}

export default CommentList;
