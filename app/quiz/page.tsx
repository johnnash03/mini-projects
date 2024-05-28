"use client";
import { useState, useEffect, useRef } from "react";
import "./quiz.module.css";
import mockQuestions from "./mockQuestions";
function App() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timer, setTimer] = useState(5);
  const questions = mockQuestions;
  useEffect(() => {
    // if (answers.length !== questions.length) {
    console.log("Effect called");
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          if (currentQuestion < questions.length) {
            setAnswers((prevAnswers) => [...prevAnswers, currentAnswer]);
            setCurrentAnswer("");
            setCurrentQuestion(currentQuestion + 1);
          }
          clearInterval(interval);
          return 5;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
    // }
  }, [currentQuestion, currentAnswer, questions.length]);
  /*   useEffect(() => {
    const startTimeMS = new Date().getTime();
    const timer = setTimeout(() => {
      console.log(currentQuestion, "inside timer");
      setCurrentTime(String(5000 - (new Date().getTime() - startTimeMS)));
      if (currentQuestion < questions.length) {
        const ans = [...answers];
        ans.push(currentAnswer);
        setAnswers(ans);
        setCurrentAnswer("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentQuestion, answers, questions.length, currentAnswer]); */
  function handleAnswerClick(value: string) {
    setCurrentAnswer(value);
  }
  function handleNextOrFinish() {
    // clearTimeout(timer.current);
    if (currentQuestion === questions.length) {
      console.log("answers", answers);
    } else {
      const modifiedAnswers = [...answers];
      modifiedAnswers[currentQuestion] = currentAnswer;
      setCurrentAnswer("");
      setAnswers(modifiedAnswers);
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function getCorrectAnswers() {
    const numOfCorrectAns = questions.reduce((acc, value, index) => {
      if (value.correctAnswer === answers[index]) {
        acc++;
      }
      return acc;
    }, 0);
    console.log({ numOfCorrectAns });
    return numOfCorrectAns;
  }

  if (answers.length === questions.length) {
    return (
      <div>
        {getCorrectAnswers()}/{questions.length}
      </div>
    );
  }
  return (
    <div>
      <div>{timer}</div>
      <div>
        <p>{questions[currentQuestion].description}</p>
        <div>
          <input
            type="radio"
            checked={currentAnswer === "A"}
            onChange={() => {
              handleAnswerClick("A");
            }}
          />
          A
          <input
            type="radio"
            checked={currentAnswer === "B"}
            onChange={() => {
              handleAnswerClick("B");
            }}
          />
          B
          <input
            type="radio"
            checked={currentAnswer === "C"}
            onChange={() => {
              handleAnswerClick("C");
            }}
          />
          C
          <input
            type="radio"
            checked={currentAnswer === "D"}
            onChange={() => {
              handleAnswerClick("D");
            }}
          />
          D
        </div>
      </div>
      <button disabled={currentAnswer === ""} onClick={handleNextOrFinish}>
        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default App;
