# react

总结：

- Each JSX element is just syntactic sugar for calling React.createElement(component, props, ...children)

问题：

- setState callback 参数

- `method.bind(this)`
  ```js 
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  ```

