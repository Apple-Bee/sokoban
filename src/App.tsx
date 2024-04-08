import React from 'react';
import ReactDOM from 'react-dom';
import Sokoban from '../src/components/soko'; // Assuming the Sokoban component is in a file named Sokoban.tsx

const App = () => {
  return (
    <div>
      <h1>Sokoban Game</h1>
      <Sokoban />
    </div>
  );
};

export default App;
