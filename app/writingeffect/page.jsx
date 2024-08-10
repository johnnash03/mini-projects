"use client";
// what happens if I use simple variable instead of useref outside useeffecr
import React, { useEffect, useState, useRef } from "react";
import styles from "./writingeffect.module.css";
const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur et nisl nec mollis. Morbi quis sapien nec sapien auctor luctus id vel orci. Nam.`;
export default function WritingEffect({ text = TEXT, wordsPerSecond = 10 }) {
  const [runningText, setRunningText] = useState("");
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const speed = 1000 / wordsPerSecond;
    const updateText = () => {
      setRunningText((runningText) => runningText + text[index]);
      setIndex((index) => index + 1);
    };

    if (index < text.length) {
      timeoutRef.current = setTimeout(updateText, speed);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [runningText, index, text, wordsPerSecond]);
  return (
    <div className={styles.typingArea}>
      {runningText}
      <span className={styles.blinkingCursor}></span>
    </div>
  );
}
