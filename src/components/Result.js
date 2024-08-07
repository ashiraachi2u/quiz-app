import React from 'react';

const Result = ({ score, onPlayAgain }) => (
  <div>
    <h2>Your Score: {score}</h2>
    <button onClick={onPlayAgain}>Play Again</button>
  </div>
);

export default Result;
