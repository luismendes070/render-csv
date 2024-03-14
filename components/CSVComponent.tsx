// ChatGPT components/CSVComponent.tsx
// import React from 'react';

// components/CSVComponent.tsx
import React, { useState, useEffect } from 'react';

const CSVComponent: React.FC = () => {
  const [csvData, setCsvData] = useState<string>('');

  useEffect(() => {
    fetch('/data.csv')
      .then((response) => response.text())
      .then((data) => setCsvData(data));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.csv');
      const data = await response.text();
      setCsvData(data);
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



