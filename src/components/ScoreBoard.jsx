import React from "react";

const ScoreBoard = ({score}) => {
  return (
    <div className="flex justify-between mt-3 p-3 ">
      <h2 className="text-yellow-300">
        Player 1:{" "}
        <span className="text-blue-300 font-bold">{score.player1}points</span>
      </h2> 
      <h1>||</h1>
      <h2 className="text-teal-300">
        Player 2:{" "}
        <span className="text-blue-300 font-bold">{score.player2}points</span>
      </h2>
    </div>
  );
};

export default ScoreBoard;
