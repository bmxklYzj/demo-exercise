import React from 'react';

export class TodoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: '',
            list: []
        }
        this.foo = 2;
    }
    add = () => {
        this.foo = 3;
        this.setState({
            list: [
                ...this.state.list,
                this.state.todo,
            ],
            todo: ''
        });
    }

    render() {
        return (
            <div>
                {this.foo}
                <input value={this.state.todo} onChange={(element) => {
                    // console.log('val', element.target.value);
                    this.setState({
                        todo: element.target.value
                    });
                }} />
                <button onClick={this.add} >add</button>
                <ul>
                    {this.state.list.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        );
    }
}