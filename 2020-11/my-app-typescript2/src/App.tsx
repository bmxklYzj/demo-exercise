import React from 'react';
import logo from './logo.svg';
import './App.css';

import {cloneDeep} from 'bmxklyzj-myutils';

function App() {
  const o = {a: 1, b: {c: 2}};
  const res = cloneDeep(o);
  console.log(res, o.b === res.b);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
