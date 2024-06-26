"use client";

import React, { useEffect, useState } from "react";

export default function Scrollindicator() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    function handleScroll() {
      let width =
        (document.documentElement.scrollTop /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setScrollWidth(width);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div
        style={{
          width: `${scrollWidth}%`,
          height: "4px",
          backgroundColor: "blue",
          position: "fixed",
        }}
      ></div>
      <div>
        {Array.from({ length: 100 }, (v, i) => i).map((i) => {
          return <div key={i}>{i}</div>;
        })}
      </div>
    </div>
  );
}
