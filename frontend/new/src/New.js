import React, { useState } from 'react';

function CSVFileUploader() {
  const [csvData, setCSVData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvText = e.target.result;
      const rows = csvText.split('\n').map(row => row.split(','));
      setCSVData(rows);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <table>
        <thead>
          
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVFileUploader;
