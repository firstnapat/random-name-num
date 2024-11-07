// src/app/page.tsx

"use client";

import { useState } from 'react';
import { fetchData } from './api/fetchData';
import { shuffleArray } from '../utils/shuffleArray';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<{ name: string; number: number }[]>([]);
  const [showFinalNumbers, setShowFinalNumbers] = useState(false);

  const generateRandomNames = async () => {
    setIsLoading(true);
    setShowFinalNumbers(false);

    const sampleNames = await fetchData();
    if (sampleNames.length < 250) {
      alert("Not enough data in the sheet. Please add more rows.");
      setIsLoading(false);
      return;
    }

    const shuffledNumbers = shuffleArray(Array.from({ length: 250 }, (_, i) => i + 1));
    const initialItems = sampleNames.slice(0, 250).map((name) => ({
      name,
      number: Math.floor(Math.random() * 250) + 1,
    }));

    setItems(initialItems);

    const interval = setInterval(() => {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          number: Math.floor(Math.random() * 250) + 1,
        }))
      );
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalItems = sampleNames.slice(0, 250).map((name, index) => ({
        name,
        number: shuffledNumbers[index],
      }));
      setItems(finalItems);
      setShowFinalNumbers(true);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-4 bg-white/90 overflow-y-auto">
      <button
        onClick={generateRandomNames}
        className={`bg-purple-600 text-white py-2 px-4 rounded-md mb-5 transition-colors ${
          isLoading ? "cursor-not-allowed bg-purple-300" : "hover:bg-purple-700"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Randomize"}
      </button>
      <div className="grid w-full px-2 gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-purple-600 text-white w-full h-24 flex flex-col items-center justify-center rounded-md shadow-md text-center"
          >
            <span className="text-sm font-semibold">{item.name}</span>
            <span className="text-lg font-bold">{item.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;