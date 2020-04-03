import React, {useState} from 'react';

function Input() {
  const [a, setA] = useState('2');
  return (
    <div>
      2223
      <input type="text" value={a} onChange={(e) => setA(e.target.value)}/>
    </div>
  );
}

export {Input};
