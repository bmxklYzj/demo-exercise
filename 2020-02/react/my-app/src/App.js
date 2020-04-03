import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from './Input';
import BigNumber from 'bignumber.js';

function App() {
  const [a, setA] = useState('1');
  const onChangeHandler = e => {
    // TODO: remove me
    console.log('Remove me in !dev: e', e);
    
  }
  // TODO: remove me
  console.log('Remove me in !dev: ', new BigNumber('0.000001').lte(new BigNumber()));
  console.log('Remove me in !dev: ', new BigNumber('0.000001').lte(new BigNumber('')));
  console.log('Remove me in !dev: ', new BigNumber('0.000001').lte(new BigNumber(0.0001)));
  
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={onChangeHandler}/>
        111
        <input type="text" value={a} onChange={(e) => setA(e.target.value)}/>
        <Input />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
