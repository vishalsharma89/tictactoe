import React,{useState} from 'react'
import Board from "./components/Board";
import "./styles/root.scss";
import { calculateWinner } from './helpers';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

const NEW_GAME = [
     {board:Array(9).fill(null),isXNext:true}
   ]

export default () => {
   const [history, setHistory] = useState(NEW_GAME)

   const [currentMove,setCurrentMove] = useState(0);
   const current = history[currentMove]
   
    const{ winner,winningSquares } = calculateWinner(current.board);
    // console.log(winner);

   
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

const moveTo = move=>{
  setCurrentMove(move);
}
const onNewGame=()=>{
  setHistory(NEW_GAME);
  setCurrentMove(0);
}
return (
<>
  <div className="app">
    <h1>TIC <span className='text-green'>TAC</span> TOE !</h1>
    <StatusMessage winner={winner} current={current}/>
    <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares}/>
    <button type='button' onClick={onNewGame}
    className={`btn-reset ${winner?'active':''}`}>Start new game</button>
    <h2 style={{fontWeight:'normal'}}>Current game history</h2>
    <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    <div className='bg-balls'/>
  </div>
</>
    )
}
