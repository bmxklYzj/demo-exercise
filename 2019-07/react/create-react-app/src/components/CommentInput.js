import React, {Component} from 'react';
import Comment from "./Comment";

class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            comment: '',
        };
    }

    usernameChangeHandler = e => {
        this.setState({
            username: e.target.value
        });
    };
    commentChangeHandler = e => {
        this.setState({
            comment: e.target.value
        });
    };
    submitHandler = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                comment: this.state.comment,
            });
        }
        this.setState({
            username: '',
            comment: '',
        });
    };

    render() {
        return (
            <div>
                <div>
                    用户名：<input type="text" value={this.state.username} onChange={this.usernameChangeHandler}/>
                </div>
                <div>
                    评论：<textarea value={this.state.comment} onChange={this.commentChangeHandler}/>
                </div>
                <button onClick={this.submitHandler}>提交</button>
            </div>
        )
    }
}

export default CommentInput;
