import React from 'react';
import { useState } from 'react';

export function Todo() {
    const [todo, setTodo] = useState('');
    const [list, setList] = useState([]);

    const add = () => {
        setList([
            ...list,
            todo
        ]);
        setTodo('');
    }

    
    return (
        <div>
            <input value={todo} onChange={(element) => {
                console.log('val', element.target.value);
                setTodo(element.target.value);
            }} />
            <button onClick={add} >add</button>
            <ul>
                {list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
}