import React,{useState} from 'react'
import Board from "./components/Board";
import "./styles/root.scss";
import { calculateWinner } from './helpers';

export default () => {
   const [board, setBoard] = useState(Array(9).fill(null))
    const [isXNext,setIsXNext] = useState(false)

    const winner  = calculateWinner(board);
    console.log(winner);
    const message = winner?`WINNER is - ${winner}`:`Next player is ${isXNext ? 'X':'0'}`;
    const handleSquareClick=position=>{

        // if we already have value of x or 0
        if(board[position] || winner){
            return;
        }


    setBoard(prev =>{
    return prev.map((square,pos)=>{
        if(pos===position){
            return isXNext?'X':'0';
        }

        return square;
    });
});
setIsXNext(prev=>!prev);
};
return (
<>
  <div className="app">
    <h1>Tic Tac Toe App!</h1>
    <h2>{message}</h2>
    <Board board={board} handleSquareClick={handleSquareClick}/>
  </div>
</>
    )
}
