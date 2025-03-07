import React from "react";

const WordHistory = ({ words }) => {
  return (
    <div className="mt-5 p-5 bg-gray-900 rounded-lg">
      <h2 className="font-semibold text-blue-400 text-xl underline">Word History</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index} className="text-white capitalize">
            {word}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WordHistory;
