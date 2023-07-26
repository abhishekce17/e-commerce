"use client"
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [categories, setCategories] = useState(['Electronics %', 'Clothing %', 'Books %', 'Home Goods %', 'Mobiles %', "Sports %", "kitchen %"]);
  const [sales, setSales] = useState([40, 30, 20, 10, 70, 50, 80]);

  useEffect(() => {
    // Calculate total sales
    const totalSales = sales.reduce((acc, value) => acc + value, 0);

    // Calculate sales percentages
    const salesPercentages = sales.map(value => (value / totalSales) * 100);

    // Generate colors for categories
    const colors = generateColors(categories.length);

    // Create the chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the chart
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [
          {
            data: salesPercentages,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start',
            labels: {
              padding: 7,
              usePointStyle: true,
            },
          },
          title: {
            display: true,
            text: `Total Sales: ${totalSales}`,
          },
        },
      },
    });
  }, [categories, sales]);


  // Generate colors for categories
  const generateColors = (count) => {
    const existingColors = chartRef.current?.__chart?.config?.data?.datasets[0]?.backgroundColor || [];
    const availableColors = getAvailableColors(existingColors);
    const colors = [];
    for (let i = 0; i < count; i++) {
      if (i < availableColors.length) {
        colors.push(availableColors[i]);
      } else {
        colors.push(getRandomColor());
      }
    }
    return colors;
  };

  // Get available colors that are not already used
  const getAvailableColors = (usedColors) => {
    const allColors = generateAllColors();
    return allColors.filter(color => !usedColors.includes(color));
  };

  // Generate all possible colors
  const generateAllColors = () => {
    const letters = '0123456789ABCDEF';
    const colors = [];
    for (let i = 0; i < 256; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
  };

  // Generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas ref={chartRef} width={200} height={200}></canvas>;
};

export default PieChart;
