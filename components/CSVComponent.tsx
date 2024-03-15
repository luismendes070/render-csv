// Vercel 
import { SpeedInsights } from "@vercel/speed-insights/next"
// ChatGPT components/CSVComponent.tsx
// import React from 'react';

// components/CSVComponent.tsx
import React, { useState, useEffect } from 'react';

// ChatGPT catch promise
const CSVComponent: React.FC = () => {
  const [csvData, setCsvData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch CSV data');
        }
        const data = await response.text();
        setCsvData(data);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <pre>{csvData}</pre>
      <a href="/data.csv" download>Download CSV</a>
    </div>
  );
};

export default CSVComponent;




