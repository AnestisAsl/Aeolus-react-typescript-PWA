import * as React from "react";
import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";

interface radarChartProps {
  applicableDates: string[];
  windSpeedArray: number[];
  windCompassArray: string[];
}

const RadarChart: React.FC<radarChartProps> = ({
  applicableDates,
  windSpeedArray,
  windCompassArray,
}) => {
  const [fontSize, setfontSize] = useState<number>(0);

  const dataForRadarChart = {
    labels: [windCompassArray[0], windCompassArray[1], windCompassArray[2]],
    datasets: [
      {
        label: applicableDates[0],
        backgroundColor: "#1f7a8c",
        borderColor: "#1f7a8c",
        pointBackgroundColor: "#1f7a8c",
        pointBorderColor: "#495057",
        pointHoverBackgroundColor: "#1f7a8c",
        pointHoverBorderColor: "#022b3a",
        pointRadius: 10,
        fill: false,
        data: [windSpeedArray[0], windSpeedArray[1], windSpeedArray[2]],
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
    <Radar
      data={dataForRadarChart}
      options={{
        title: {
          display: true,
          text: "Wind speed(Beaufort),direction ",
          fontSize: fontSize,
        },
        legend: {
          labels: {
            fontSize: fontSize,
          },
        },
        scale: {
          pointLabels: {
            fontSize: fontSize - 20,
          },
        },

        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 2,
                fontSize: fontSize - 10,
                max: 10,
                min: 0,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: fontSize - 10,
              },
            },
          ],
        },
      }}
    />
  );
};

export default RadarChart;
