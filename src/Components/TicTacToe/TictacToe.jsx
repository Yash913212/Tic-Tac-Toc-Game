import React, { useRef } from "react";
import "./TictacToe.css";
import { useState } from "react";
import circle from "../Assets/circle.png";
import cross from "../Assets/cross.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";

let data = ["", "", "", "", "", "", "", "", ""];

const TictacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setlock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock) {
      toast.info("Game is over. Click reset to play again.");
      return;
    }

    if (data[num] !== "") {
      toast.warning("Box already filled!");
      return;
    }

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross}' />`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle}' />`;
      data[num] = "o";
    }

    const newCount = count + 1;
    setCount(newCount);
    checkWin(newCount);
  };

  const checkWin = (currentCount) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] === data[b] && data[b] === data[c] && data[a] !== "") {
        won(data[a]);
        return;
      }
    }

    if (currentCount === 9) {
      draw();
    }
  };

  const won = (winner) => {
    setlock(true);
    confetti({
      particleCount: 200,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
    });

    if (winner === "x") {
      toast.success("Player X wins!");
    } else {
      toast.success("Player O wins!");
    }
  };

  const draw = () => {
    setlock(true);
    // titleRef.current.innerHTML = `It's a <span>Draw!</span>`;
    toast.info("It's a Draw!");
  };

  const reset = () => {
    setlock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    titleRef.current.innerHTML = "Tic Tac Toe In <span>React</span>";
    const boxes = document.querySelectorAll(".boxes");
    boxes.forEach((box) => (box.innerHTML = ""));
    toast.info("Game reset. Start playing!");
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" />
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe in <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TictacToe;
