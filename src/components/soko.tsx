import React, { useState, useEffect } from 'react';
import '../css/';


type CellType = 0 | 1 | 2 | 3 | 4; // 0: empty, 1: wall, 2: player, 3: box, 4: target

const map: CellType[][] = [
  [1, 1, 1, 1, 1],
  [1, 2, 0, 3, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 4, 0, 1],
  [1, 1, 1, 1, 1]
];

const playerChar: CellType = 2;
const boxChar: CellType = 3;
const targetChar: CellType = 4;
const wallChar: CellType = 1;

const Sokoban: React.FC = () => {
  const [gameMap, setGameMap] = useState<CellType[][]>(map);

  useEffect(() => {
    document.addEventListener('keydown', movePlayer);
    return () => {
      document.removeEventListener('keydown', movePlayer);
    };
  }, []);

  const movePlayer = (event: KeyboardEvent) => {
    let playerPosition = findPlayer();

    // Check if playerPosition is undefined
    if (!playerPosition) return;

    let newRow = playerPosition.row;
    let newCol = playerPosition.col;

    switch (event.key) {
      case 'ArrowUp':
        newRow--;
        break;
      case 'ArrowDown':
        newRow++;
        break;
      case 'ArrowLeft':
        newCol--;
        break;
      case 'ArrowRight':
        newCol++;
        break;
      default:
        return;
    }

    if (isValidMove(newRow, newCol)) {
      const newMap = [...gameMap];
      switch (newMap[newRow][newCol]) {
        case 0:
          newMap[playerPosition.row][playerPosition.col] = 0;
          newMap[newRow][newCol] = 2;
          break;
        case 3:
          if (isValidMove(newRow + (newRow - playerPosition.row), newCol + (newCol - playerPosition.col))) {
            newMap[playerPosition.row][playerPosition.col] = 0;
            newMap[newRow][newCol] = 2;
            newMap[newRow + (newRow - playerPosition.row)][newCol + (newCol - playerPosition.col)] = 3;
          }
          break;
      }
      setGameMap(newMap);
    }
  };

  const findPlayer = () => {
    for (let i = 0; i < gameMap.length; i++) {
      for (let j = 0; j < gameMap[i].length; j++) {
        if (gameMap[i][j] === playerChar) {
          return { row: i, col: j };
        }
      }
    }
  };

  const isValidMove = (row: number, col: number) => {
    return row >= 0 && row < gameMap.length && col >= 0 && col < gameMap[0].length && gameMap[row][col] !== wallChar;
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {gameMap.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {row.map((cell, j) => (
              <div key={`${i}-${j}`} className="cell">
                {cell === playerChar && '🙂'}
                {cell === boxChar && '📦'}
                {cell === targetChar && '🎯'}
                {cell === wallChar && ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sokoban;

