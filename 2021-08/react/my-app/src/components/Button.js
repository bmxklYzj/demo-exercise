import React from 'react';
import {useState} from 'react';


export function MyButton() {
    const [count, setCount] = useState(0);
  
    function handleClick() {
        console.log('count: ' + count);
        setCount(count + 1);
    }
  
    return (
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    );
  }