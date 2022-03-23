import * as React from "react";
import { Component } from "react";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

interface LineChartProps {
  applicableDates: string[];
  humidityArray: number[];
}

const LineChart: React.FC<LineChartProps> = ({
  applicableDates,
  humidityArray,
}) => {
  const [fontSize, setfontSize] = useState<number>(0);

  const dataForLineChart = (canvas: any) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgb(0, 180, 216)");
    gradient.addColorStop(1, "rgb(232, 93, 4)");
    return {
      labels: [applicableDates[0], applicableDates[1], applicableDates[2]],
      datasets: [
        {
          label: "Humidity by %",
          fill: false,
          lineTension: 0.1,
          data: [humidityArray[0], humidityArray[1], humidityArray[2]],
          backgroundColor: gradient,
          borderColor: gradient,
          borderDash: [],
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointBackgroundColor: gradient,
          pointHoverBorderColor: "#dc2f02",
          hoverBackgroundColor: "#2d6a4f",
          pointHitRadius: 15,
          pointBorderColor: gradient,
          pointRadius: 10,
        },
      ],
    };
  };
  useEffect(() => {
    const container = document.getElementsByClassName(
      "chartContainer"
    ) as HTMLCollectionOf<HTMLElement>;
    var fontSizeTemp = 0;
    const width = container[0].offsetWidth;
    if (width < 400) {
      fontSizeTemp = width / 28;
    } else {
      fontSizeTemp = width / 20;
    }
    setfontSize(fontSizeTemp);
  }, []);

  return (
    <Line
      data={dataForLineChart}
      options={{
        maintainAspectRatio: true,
        legend: {
          labels: {
            fontSize: fontSize,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: fontSize - 5,
                stepSize: 1,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: fontSize - 5,
              },
            },
          ],
        },
      }}
    />
  );
};

export default LineChart;
