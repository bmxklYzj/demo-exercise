const element = <h1 className="greeting">hello world!</h1>;

const element = React.createElement(
  "h1",
  {
    className: "greeting",
  },
  "hello world!"
);

const element = {
  type: "h1",
  propss: {
    className: "greeting",
    children: "hello world!",
  },
};
