// src/InfiniteScrollComponent.js
"use client";
import React, { useState, useEffect } from "react";

const mockAPI = (page, limit, totalItems) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      const items = Array.from(
        { length: totalItems },
        (_, i) => `Item ${i + 1}`
      ).slice(start, end);
      resolve(items);
    }, 1000);
  });
};

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const totalItems = 1000;

  useEffect(() => {
    const loadMoreItems = async () => {
      const newItems = await mockAPI(page, limit, totalItems);
      setItems((prevItems) => [...prevItems, ...newItems]);
    };

    loadMoreItems();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight; // viewport height
      const scrollTop = document.documentElement.scrollTop; //
      const scrollHeight = document.documentElement.scrollHeight; // total height

      if (windowHeight + scrollTop >= scrollHeight - 1) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          style={{ padding: "10px", border: "1px solid #ccc", margin: "10px" }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default InfiniteScrollComponent;
