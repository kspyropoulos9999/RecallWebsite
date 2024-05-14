import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';

// Register all chart.js components and scales
Chart.register(...registerables);

const FDARecallChart = () => {
  const [deviceRecallData, setDeviceRecallData] = useState(null);
  const [drugRecallData, setDrugRecallData] = useState(null);
  const [foodRecallData, setFoodRecallData] = useState(null);

  useEffect(() => {
    // Function to fetch device recalls data
    const fetchDeviceRecalls = async () => {
      try {
          const response = await fetch(
              "https://api.fda.gov/device/enforcement.json?limit=1000"
          );
          const data = await response.json();
          if (!data.results) {
              throw new Error("No device recall data found.");
          }
          const filteredRecalls = data.results.filter(
              recall => parseInt(recall.recall_initiation_date.substring(0, 4)) >= 2012
          );
          const recallsWithData = filteredRecalls.map((recall) => ({
              ...recall,
              openfda: recall.openfda
          }));
          const sortedRecalls = recallsWithData.sort((a, b) => {
              const dateA = parseInt(a.recall_initiation_date.substring(0, 4), 10);
              const dateB = parseInt(b.recall_initiation_date.substring(0, 4), 10);
              return dateA - dateB;
          });
          const yearlyCounts = {};
          sortedRecalls.forEach((recall) => {
              const year = recall.recall_initiation_date.substring(0, 4);
              if (!yearlyCounts[year]) {
                  yearlyCounts[year] = 1;
              } else {
                  yearlyCounts[year]++;
              }
          });
          const labels = Object.keys(yearlyCounts);
          const counts = Object.values(yearlyCounts);
          setDeviceRecallData({ labels, counts });
      } catch (error) {
          console.error(error.message);
      }
  };

 
    

    // Call both functions to fetch device and drug recalls data when component mounts
    fetchDeviceRecalls();
 
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="graphs-recall-screen">
      <div className="wrapper">
        {/* Title for the device recall chart */}
        <h2>FDA Device Recall Chart</h2>
        {/* Check if deviceRecallData is available before rendering the Line chart */}
        {deviceRecallData && (
          <Line
            data={{
              labels: deviceRecallData.labels,
              datasets: [
                {
                  label: 'Device Recall Counts',
                  data: deviceRecallData.counts,
                  fill: true,
                  backgroundColor: 'rgba(75,192,192,0.2)',
                  borderColor: 'rgba(75,192,192,1)'
                }
              ]
            }}
          />
        )}
       
      </div>
    </div>
  );
};

export default FDARecallChart;
