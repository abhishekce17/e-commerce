"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoubleLineGraphChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Sample data for monthly orders and revenue
    const monthlyOrders = [50, 70, 90, 60, 80, 100, 120, 110, 130, 140];
    const monthlyRevenue = [1000, 1500, 2000, 1800, 2500, 3000, 2800, 3200, 4000, 3800];

    // Ensure the previous chart instance is destroyed
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the chart
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Orders',
            data: monthlyOrders,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            // fill: false,
            yAxisID: 'orders'
          },
          {
            label: 'Revenue',
            data: monthlyRevenue,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            // fill: false,
            yAxisID: 'revenue'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Revenue vs Orders'
          }
        }
      }
    });
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default DoubleLineGraphChart;
