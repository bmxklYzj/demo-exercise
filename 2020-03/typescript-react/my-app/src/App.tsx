import React from 'react';
import logo from './logo.svg';
// import './App.css';
import style from './app.module.css';

type Props = {};
function App(props: Props) {
  // TODO: Remove me:
  console.log('Remove me, 1', 1);
  function Foo() {
    // TODO: Remove me:
    console.log('Remove me, 1', 1);
    const b = 1;
    const a = async () => {
      // fuck
      // todo
      if (a === 1) {
        // TODO: Remove me:
        console.log('Remove me, 1', 1);
      } else {
        // TODO: Remove me:
        console.log('Remove me, 2', 2);
      }
      switch ()
    }
  }
  return (
    <div className={style.red}>
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
