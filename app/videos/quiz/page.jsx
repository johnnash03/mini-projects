"use client";
import { useState } from "react";
import questions from "./mockData";
// import "./App.css";

function Quiz() {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  function handleOptionChange(e) {
    setCurrentAnswer(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setCurrentAnswer("");
    setAnswers([...answers, currentAnswer]);
    setCurrentQuestionId(currentQuestionId + 1);
  }
  function renderQuestion() {
    const options = ["A", "B", "C", "D"].map((option) => {
      return (
        <div key={option}>
          <label htmlFor={option}>
            <input
              id={option}
              type="radio"
              checked={currentAnswer === option}
              value={option}
              name="answers"
              onChange={handleOptionChange}
            />
            {questions[currentQuestionId - 1].options[option]}
          </label>
        </div>
      );
    });

    return (
      <div>
        {questions[currentQuestionId - 1].question}
        <form onSubmit={handleSubmit}>
          <div>{options}</div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  function showScore() {
    let score = 0;
    answers.forEach((answer, index) => {
      if (questions[index].answer === answer) score++;
    });
    return <div>Your score is {score}</div>;
  }
  return (
    <>{currentQuestionId > questions.length ? showScore() : renderQuestion()}</>
  );
}

export default Quiz;
