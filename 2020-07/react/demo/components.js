function Welcome(props) {
  return <h1>hello {props.name}</h1>;
}

class Welcome extends React.Component {
  render() {
    return <h1>hello {this.props.name}</h1>;
  }
}
