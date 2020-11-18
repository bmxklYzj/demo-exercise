// function display() {
//   console.log(this.name);
// }
// display();

var obj = {
  name: 'bmxklyzj',
  display: function () {
    console.log(this.name);
  }
}
// obj.display();

var name = 'global name';
var display = obj.display;
display();
console.log(this);

class ToggleButton extends React.Component {
  handleClick = () => {
    console.log(this);
  }
  render() {
    return <button onClick={this.handleClick}>toggle</button>
  }
}

class ToggleButton extends React.Component {
  handleClick() {
    console.log(this);
  }
  render() {
    return <button onClick={e => this.handleClick(e)}></button>
  }
}
