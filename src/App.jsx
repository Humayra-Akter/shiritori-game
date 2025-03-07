import { ToastContainer } from "react-toastify";
import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div>
      <GameBoard />
      <ToastContainer />
    </div>
  );
}

export default App;
