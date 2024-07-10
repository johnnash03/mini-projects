"use client";
/* 
State Closure Problem: 
In the original code, the setSeconds(seconds + 1) inside the setInterval callback 
references the seconds state value from the initial render.
This is due to how closures work in JavaScript.

Empty Dependency Array: 
The useEffect has an empty dependency array [], 
which means the effect only runs once when the component mounts.
This causes the seconds variable inside the effect to be "stuck" with its initial value.
*/
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{seconds}</div>;
}

export default Timer;
