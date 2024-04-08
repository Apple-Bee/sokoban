import React from 'react';
import ReactDOM from 'react-dom';
import Sokoban from '../src/components/soko'; 
import '../src/css/sokocss.css';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div>
        <h1>Sokoban Game</h1>
        <Sokoban />
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;


