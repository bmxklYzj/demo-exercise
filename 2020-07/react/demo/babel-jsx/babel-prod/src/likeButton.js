
class LikeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false,
    };
  }
  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }
    return React.createElement('button',
      {
        onClick: () => {
          this.setState({
            liked: true,
          });
        }
      },
      'Like'
    );
  }
}

ReactDOM.render(React.createElement(LikeButton), document.querySelector('#container'));