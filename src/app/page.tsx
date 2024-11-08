// src/app/page.tsx

"use client";

import { useState } from 'react';
import { fetchData } from './api/fetchData';
import { shuffleArray } from '../utils/shuffleArray';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<{ name: string; number: number }[]>([]);
  const [, setShowFinalNumbers] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);  // State to hold warning message

  const generateRandomNames = async () => {
    setIsLoading(true);
    setShowFinalNumbers(false);
    setWarning(null);  // Reset warning message on each click

    // Fetch data from the Google Sheet
    const sampleNames = await fetchData();

    // If no data, show warning and log to console
    if (sampleNames.length < 1) {
      console.warn("No data available: Please ensure the Google Sheet contains at least 1 row of data.");
      setWarning("No data available. Please ensure the data source contains at least 1 row.");
      setIsLoading(false);
      return;
    }

    // Ensure at least 1 row of data is available, even if less than 250
    const effectiveData = sampleNames.length < 250 ? sampleNames : sampleNames.slice(0, 250);
    const shuffledNumbers = shuffleArray(Array.from({ length: effectiveData.length }, (_, i) => i + 1));

    const initialItems = effectiveData.map((name) => ({
      name,
      number: Math.floor(Math.random() * 250) + 1,
    }));

    setItems(initialItems);

    // Rolling Effect: Change numbers every 100ms for shuffling animation
    const interval = setInterval(() => {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          number: Math.floor(Math.random() * 250) + 1,
        }))
      );
    }, 100);

    // Stop rolling effect after 3 seconds and show final numbers
    setTimeout(() => {
      clearInterval(interval);
      const finalItems = effectiveData.map((name, index) => ({
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
      {warning && <div className="text-red-600 font-semibold mb-4">{warning}</div>} {/* Display warning if set */}
      <div className="grid w-full px-2 gap-2 sm:px-4 sm:gap-3 grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-purple-600 text-white w-full h-24 flex flex-col items-center justify-center rounded-md shadow-md text-center"
          >
            <span className="text-xs sm:text-sm md:text-base font-semibold">{item.name}</span>
            <span className="text-sm sm:text-lg font-bold">{item.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;