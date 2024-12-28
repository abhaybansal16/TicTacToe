import { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];


function deriveActivePlayer(gameTurns) 
{
  let currPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player=== 'X')
      {
        currPlayer = 'O';
      }
      return currPlayer;
}
function App() {
  const[players, setPlayers] = useState({
    'X' : 'Player 1',
    'O' : 'Player 2'
  });
  const[gameTurns, setGameTurns] = useState([]);
  // const[activePlayer, setActivePlayer] = useState('X');

  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(const turn of gameTurns)
    {
        const{square,player} = turn;
        const{row,col} = square;
        gameBoard[row][col] = player;
    }
   
  let winner;
  let hasDrawn = gameTurns.length === 9 && !winner;  
  for(const combinations of WINNING_COMBINATIONS)  
  {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
      winner = players[firstSquareSymbol];
    }
  }
  function handleClick(rowIndex, colIndex)
  {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currPlayer}, ...prevTurns, ];
      return updatedTurns;
    }
    )  
  }
  function handleRestart()
  {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName)
  {
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
      [symbol] : newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol = "X" isActive = {activePlayer === 'X'} onChangeName = {handlePlayerNameChange} />
        <Player name="Player 2" symbol = "O" isActive = {activePlayer === 'O'} onChangeName = {handlePlayerNameChange} />
      </ol>
      {(winner|| hasDrawn) && <GameOver winner= {winner} onRestart = {handleRestart} />}
      <GameBoard onSelect = {handleClick} board = {gameBoard} />
    </div>
    <Log turns = {gameTurns} />
    </main>
  );
}

export default App
