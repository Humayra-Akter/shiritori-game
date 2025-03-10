import React, { useEffect, useState } from "react";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";
import WordHistory from "./WordHistory";
import { toast } from "react-toastify";
import axios from "axios";
import FinalTimer from "./FinalTimer";

const GameBoard = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [words, setWords] = useState([]);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [timeLeft, setTimeLeft] = useState(10);
  const [finalTimeLeft, setFinalTimeLeft] = useState(100);
  const [inputWord, setInputWord] = useState("");

  //final time
  useEffect(() => {
    if (finalTimeLeft === 0) {
      handleFinalTimeout();
    }
    const finalTimer = setTimeout(
      () => setFinalTimeLeft(finalTimeLeft - 1),
      1000
    );
    return () => clearTimeout(finalTimer);
  }, [finalTimeLeft]);

  const handleFinalTimeout = () => {
    let winnerMessage = "";

    if (score.player1 > score.player2) {
      winnerMessage = "Player 1 Wins!";
    } else if (score.player2 > score.player1) {
      winnerMessage = "Player 2 Wins!";
    } else {
      winnerMessage = "It's a Draw!";
    }

    alert(
      `GAME END!!!\nPlayer 1 Score: ${score.player1}\nPlayer 2 Score: ${score.player2}\n${winnerMessage}`
    );
    toast.success(`GAME OVER! ${winnerMessage}`);

    // Reset the game
    setFinalTimeLeft(100);
    setWords([]);
    setScore({ player1: 0, player2: 0 }); 
    setCurrentPlayer(1); 
    setTimeLeft(10); 
  };


  //time
  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleTimeout = () => {
    toast.error(`Player ${currentPlayer} ran out of time!`);
    setScore((prev) => ({
      ...prev,
      [`Player${currentPlayer}`]: prev[`Player${currentPlayer}`] - 1,
    }));
    console.log(score.player1),
      // switch player
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setTimeLeft(10);
  };

  const handleSubmit = async () => {
    if (inputWord.length < 4) {
      toast.error("Word must be at least 4 characters long!");
      return;
    }

    if (words.includes(inputWord)) {
      toast.error("Word already used!");
      return;
    }

    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      if (inputWord[0].toLowerCase() !== lastWord.slice(-1).toLowerCase()) {
        toast.error(
          "Word must start with the last letter of the previous word"
        );
        return;
      }
    }

    try {
      const { data } = await axios.post(
        "https://shiritori-game-server.onrender.com/wordValidate",
        { word: inputWord }
      );

      if (!data.valid) {
        toast.error("Word is not meaningful!");
        return;
      }

      setWords((prevWords) => [...prevWords, inputWord]);

      setScore((prev) => ({
        ...prev,
        [`player${currentPlayer}`]: prev[`player${currentPlayer}`] + 10, // Correct key format
      }));

      setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
      setTimeLeft(10);
      setInputWord("");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Word!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-7 bg-blue-950 rounded-lg shadow-lg">
      <h2 className="text-4xl text-white text-center">
        Multiplayer SHIRITORI Game
      </h2>
      <ScoreBoard score={score} />
      <FinalTimer finalTimeLeft={finalTimeLeft} />
      <Timer timeLeft={timeLeft} />
      <div>
        <h1 className="text-2xl">Player {currentPlayer}'s Turn</h1>
        <input
          className="border-2 py-1 px-2 rounded"
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder="Enter a Word"
        />
        <button
          className="py-1 px-3 bg-blue-700 rounded hover:bg-blue-900 text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <WordHistory words={words} />
    </div>
  );
};

export default GameBoard;
