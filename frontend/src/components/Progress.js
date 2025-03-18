// Frontend: React Component to fetch and plot test results
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { useSelector } from 'react-redux';

const Progress = () => {
  const [chartData, setChartData] = useState(null);
  const user = useSelector((state) => state.user.user);
  const rollNo = user?.rollNo;

  useEffect(() => {
    axios.get(`http://localhost:8000/app/assignment/results/${rollNo}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const labels = data.map(item => item.assignmentTitle);
          const scores = data.map(item => item.totalScore);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Total Scores by Assignment',
                data: scores,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          });
        }
      })
      .catch(error => console.error("Error fetching test results:", error));
  }, [rollNo]);

  return chartData ? (
    <div style={{ width: '500px', margin: '0 auto', marginTop:'5%' }}>
      <Bar data={chartData} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Progress;
