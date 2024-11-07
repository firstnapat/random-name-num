// src/app/api/fetchData.ts

export async function fetchData(): Promise<string[]> {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
  const SHEET_NAME = process.env.NEXT_PUBLIC_SHEET_NAME;

  const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:A?key=${API_KEY}`
  );
  const data = await response.json();
  return data.values ? data.values.slice(1).map((row: string[]) => row[0]) : [];
}