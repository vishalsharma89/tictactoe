import React from 'react'

const StatusMessage = ({winner,current}) => {
    //  const message = winner?`WINNER is - ${winner}`:`Next player is ${current.isXNext ? 'X':'0'}`;
    const noMovesLeft = current.board.every(el=> el!==null);
  return (
    <h2>
    {winner &&`WINNER is - ${winner}`}
    {!winner && !noMovesLeft && `Next player is ${current.isXNext ? 'X':'0'}`}    
    {!winner && noMovesLeft && 'X and 0 tied'}
    </h2>
  )
}

export default StatusMessage