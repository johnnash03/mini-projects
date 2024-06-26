"use client";

import useTimer from "./useTimer";
const Timer = () => {
  const { secs, minutes, hours, play, pause, isRunning } = useTimer();
  return (
    <div>
      <div>
        {hours}: {minutes}: {secs}
      </div>
      <div>
        <button disabled={isRunning} onClick={play}>
          Play
        </button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};
export default Timer;
