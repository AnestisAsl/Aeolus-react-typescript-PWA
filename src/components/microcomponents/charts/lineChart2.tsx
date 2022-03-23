import * as React from "react";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

interface LineChartWindProps {
  applicableDates: string[];
  windSpeedArray: number[];
}

const LineChartWind: React.FC<LineChartWindProps> = ({
  applicableDates,
  windSpeedArray,
}) => {
  const [fontSize, setfontSize] = useState<number>(0);

  const dataForLineChartWind = (canvas: any) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgb(108, 117, 125)");
    gradient.addColorStop(1, "rgb(40, 175, 176)");
    return {
      labels: [applicableDates[0], applicableDates[1], applicableDates[2]],
      datasets: [
        {
          label: "Wind speed (Beaufort)",
          fill: "start",
          lineTension: 0.1,
          data: [windSpeedArray[0], windSpeedArray[1], windSpeedArray[2]],
          backgroundColor: gradient,
          borderColor: gradient,
          borderDash: [],
          pointHoverRadius: 5,
          pointBorderColor: gradient,
          pointHoverBorderWidth: 2,
          pointBackgroundColor: "2a9d8f",
          pointHoverBorderColor: "#dc2f02",
          hoverBackgroundColor: "#2d6a4f",
          pointHitRadius: 15,
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
      data={dataForLineChartWind}
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
                beginAtZero: true,
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

export default LineChartWind;
