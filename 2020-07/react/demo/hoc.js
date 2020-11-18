class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id),
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id),
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

const watchDataSource = (WrappedComponent, selectData) =>
  class WatchDataSource extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, this.props),
      };
    }
    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props),
      });
    }

    render() {
      return <WrappedComponent {...this.props} data={this.state.data} />;
    }
  };

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TextBlock text={this.props.data} />;
  }
}
export const BlogPost = watchDataSource(BlogPost, (DataSource, props) =>
  DataSource.getBlogPost(props.id)
);
