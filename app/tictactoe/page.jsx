"use client";
import { useState } from "react";
const Tictactoe = () => {
  const initialScore = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };
  const [currSign, setCurrSign] = useState("0");
  const [score, setScore] = useState(initialScore);
  const handleClick = (index) => {
    console.log("handleClick", index);
    if (score[index] === "") {
      const newScore = { ...score };
      newScore[index] = currSign;

      // if (check(newScore)) {
      // }
      check(newScore);
      setScore(newScore);
      setCurrSign(currSign === "*" ? "0" : "*");
    }
  };
  const check = (newScore) => {
    let symOb = {
      1: "*",
      2: "0",
    };
    for (let i = 1; i <= 3; i++) {
      let startGrid = (i - 1) * 3 + 1; // since n=3
      // @Todo: Put this inside for loop for n
      if (
        newScore[startGrid] !== "" &&
        newScore[startGrid] === newScore[startGrid + 1] &&
        newScore[startGrid + 1] === newScore[startGrid + 2]
      )
        alert("won horizontally", newScore[startGrid]);
      if (
        newScore[i] !== "" &&
        newScore[i] === newScore[i + 3] &&
        newScore[i + 3] === newScore[i + 6]
      )
        alert(`won vertically - column ${i}`);
    }

    // Check diagonally
    // Main diagonal

    if (
      newScore[1] !== "" &&
      newScore[1] === newScore[5] &&
      newScore[5] === newScore[9]
    ) {
      alert(`${newScore[1]} won diagonally - main`);
    }
    if (
      newScore[3] !== "" &&
      newScore[3] === newScore[5] &&
      newScore[5] === newScore[7]
    ) {
      alert(`${newScore[3]} won diagonally - secondary`);
    }
  };
  return (
    <div className="p-8">
      <div className="w-96 h-96 border-4 border-white grid grid-cols-3 grid-rows-3">
        {[...Array(9)].map((e, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-yellow-50 flex items-center justify-center"
            onClick={() => {
              handleClick(i + 1);
            }}
          >
            <div className="bg-black">{score[i + 1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tictactoe;
