import * as React from "react";
import { Bubble } from "react-chartjs-2";
import { useEffect, useState } from "react";
interface bubbleChartProps {
  applicableDates: string[];
  visibilityArray: number[];
}
const BubbleChart: React.FC<bubbleChartProps> = ({
  applicableDates,
  visibilityArray,
}) => {
  const [fontSize, setfontSize] = useState<number>(0);
  const [splitArray, setSplitArray] = useState<string[]>([]);
  const [monthSplitArray, setMonthSplitArray] = useState<string[]>([]);

  const [r, setR] = useState<number[]>([]);

  const dateSplit = () => {
    for (var i = 0; i < 3; i++) {
      let day = applicableDates[i].split("-");
      splitArray.push(day[2]);
      monthSplitArray.push(day[1]);
    }
  };

  const dataForBubble = {
    datasets: [
      {
        label: "Visibility(mph)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#1f7a8c",
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        data: [
          { x: splitArray[0], y: monthSplitArray[0], r: visibilityArray[0] },
          { x: splitArray[1], y: monthSplitArray[1], r: visibilityArray[1] },
          { x: splitArray[2], y: monthSplitArray[2], r: visibilityArray[2] },
        ],
      },
    ],
  };
  useEffect(() => {
    dateSplit();
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
    <Bubble
      data={dataForBubble}
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
                stepSize: 1,
                min: 1,
                max: 12,
                fontSize: fontSize - 5,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                stepSize: 1,
                fontSize: fontSize - 5,
              },
            },
          ],
        },
      }}
    />
  );
};

export default BubbleChart;
