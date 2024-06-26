"use client";
import React from "react";
import useStopwatch from "./useStopwatch";

export default function Timer() {
  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  return (
    <div>
      <h2>UseStopwatch Demo</h2>
      <div>{hours}</div>
      <div>{minutes}</div>
      <div>{seconds}</div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
