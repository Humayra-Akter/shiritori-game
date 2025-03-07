import React from "react";

const Timer = ({ timeLeft }) => {
  return (
    <div className="text-center my-3">
      <h2 className="text-red-400 text-xl font-semibold">Time Left:{timeLeft}</h2>
    </div>
  );
};

export default Timer;
