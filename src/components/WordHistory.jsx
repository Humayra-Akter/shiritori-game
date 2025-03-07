import React from "react";

const WordHistory = ({ words }) => {
  return (
    <div className="mt-5 p-5 bg-gray-900 rounded-lg">
      <h2 className="font-semibold">Word History:</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index} className="text-white">
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordHistory;
