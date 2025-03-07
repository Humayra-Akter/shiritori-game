import React from "react";

const Timer = ({ timeLeft }) => {
  return (
    <div className="text-center">
      <h2 className="text-red-600 font-bold">Time Left:{timeLeft}</h2>
    </div>
  );
};

export default Timer;
