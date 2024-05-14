import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';

// Register all chart.js components and scales
Chart.register(...registerables);

const FDARecallChart = () => {
  const [foodRecallData, setFoodRecallData] = useState(null);

  useEffect(() => {
    const fetchFoodRecalls = async () => {
      try {
        const response = await fetch(
          "https://api.fda.gov/food/enforcement.json?limit=1000"
        );
        const data = await response.json();
        if (!data.results) {
          throw new Error("No food recall data found.");
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
        setFoodRecallData({ labels, counts });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFoodRecalls();
  }, []);

  return (
    <div className="graphs-recall-screen">
      <div className="wrapper">
        <h2>FDA Food Recall Chart</h2>
        {foodRecallData && (
          <div style={{ opacity: foodRecallData ? 1 : 0, transition: 'opacity 2s' }}>
            <Line
              data={{
                labels: foodRecallData.labels,
                datasets: [
                  {
                    label: 'Food Recall Counts',
                    data: foodRecallData.counts,
                    fill: true,
                    backgroundColor: 'rgba(0,0,255,0.2)',
                    borderColor: 'rgba(0,0,255,1)',
                  }
                ]
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FDARecallChart;
