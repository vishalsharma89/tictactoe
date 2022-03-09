import React,{useState} from 'react'
import Board from "./components/Board";
import "./styles/root.scss";
import { calculateWinner } from './helpers';

export default () => {
   const [history, setHistory] = useState([
     {board:Array(9).fill(null),isXNext:true}
   ])

   const [currentMove,setCurrentMove] = useState(0);
   const current = history[currentMove]
   
    const winner  = calculateWinner(current.board);
    // console.log(winner);

    const message = winner?`WINNER is - ${winner}`:`Next player is ${current.isXNext ? 'X':'0'}`;
    const handleSquareClick=position=>{

        // if we already have value of x or 0
        if(current.board[position] || winner){
            return;
        }

        // Set history of winner
    setHistory(prev =>{
      const last = prev[prev.length -1]
      const newBoard =last.board.map((square,pos)=>{
        if(pos===position){
            return last.isXNext?'X':'0';
        }

        return square;
    });
    return prev.concat({board:newBoard,isXNext:!last.isXNext})
});
// setIsXNext(prev=>!prev);
// uppdate curent move
setCurrentMove(prev =>prev+1);

};
return (
<>
  <div className="app">
    <h1>Tic Tac Toe App!</h1>
    <h2>{message}</h2>
    <Board board={current.board} handleSquareClick={handleSquareClick}/>
  </div>
</>
    )
}
