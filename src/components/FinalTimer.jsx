import React from "react";

const FinalTimer = ({ finalTimeLeft }) => {
  return (
    <div className="text-center my-3">
      <h2 className="text-yellow-400 text-xl font-semibold">
        Final Time:{finalTimeLeft}
      </h2>
    </div>
  );
};

export default FinalTimer;
