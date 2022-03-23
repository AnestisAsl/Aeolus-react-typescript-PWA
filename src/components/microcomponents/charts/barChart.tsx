import * as React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

interface barChartProps {
  applicableDates: string[];
  minTemp: number[];
  maxTemp: number[];
}

const BarChart: React.FC<barChartProps> = ({
  applicableDates,
  minTemp,
  maxTemp,
}) => {
  const [fontSize, setfontSize] = useState<number>(0);

  const dataForBarChart = {
    labels: [applicableDates[0], applicableDates[1], applicableDates[2]],
    datasets: [
      {
        label: "min",
        data: [minTemp[0], minTemp[1], minTemp[2]],
        backgroundColor: ["#48cae4", "#48cae4", "#48cae4"],
        borderColor: ["#0096c7", "#0096c7", "#0096c7"],
        borderWidth: 1,
        hoverBackgroundColor: "#83c5be",
        hoverBorderColor: "#006d77",
        maxBarThickness: 40,
      },
      {
        label: "max",
        data: [maxTemp[0], maxTemp[1], maxTemp[2]],
        backgroundColor: ["#e85d04", "#e85d04", "#e85d04"],
        borderColor: ["#9d0208", "#9d0208", "#9d0208"],
        borderWidth: 1,
        hoverBackgroundColor: "#83c5be",
        hoverBorderColor: "#006d77",
        maxBarThickness: 40,
      },
    ],
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
    <Bar
      data={dataForBarChart}
      options={{
        title: {
          display: true,
          text: "Temperature (Celcius)",
          fontSize: fontSize,
        },
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

export default BarChart;
