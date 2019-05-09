// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {
    constructor() {
        super();
        console.log('constructor');
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        console.log('render');
        let arr = [1, 2, 3];
        return (
            <div>
                <h1
                    onClick={this.handleClick.bind(this, 'hello')}
                    className="h1"
                >hello react!</h1>
                <div>{arr.map(item => item * 2)}</div>
            </div>
        );
    }

    handleClick(e) {
        console.log('clicked: ', this, e);
    }
}

ReactDOM.render(
    <Header/>,
    document.getElementById('root')
);
