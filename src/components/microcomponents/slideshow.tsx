import * as React from "react";
import { Component } from "react";
import BarChart from "./charts/barChart";
import LineChart from "./charts/lineChart";
import RadarChart from "./charts/radarChart";
import LineChartWind from "./charts/lineChart2";
import BubbleChart from "./charts/bubbleChart";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import { useEffect, useState } from "react";
interface slideShowProps {
  applicableDates: string[];
  minTemp: number[];
  maxTemp: number[];
  humidityArray: number[];
  windSpeedArray: number[];
  windCompassArray: string[];
  visibilityArray: number[];
}

const SlideShow: React.FC<slideShowProps> = ({
  applicableDates,
  minTemp,
  maxTemp,
  humidityArray,
  windSpeedArray,
  windCompassArray,
  visibilityArray,
}) => {
  const [chartIndex, setChartIndex] = useState<number>(1);
  var charts = document.getElementsByClassName(
    "chart"
  ) as HTMLCollectionOf<HTMLElement>;
  var dots = document.getElementsByClassName(
    "dot"
  ) as HTMLCollectionOf<HTMLElement>;
  const changeChart = (n: number) => {
    setChartIndex(chartIndex + n);
    if (chartIndex + n > charts.length) {
      setChartIndex(1);
    }
    if (chartIndex + n < 1) {
      setChartIndex(charts.length);
    }
  };
  const moveToChart = (n: number) => {
    setChartIndex(n);
  };
  useEffect(() => {
    for (var i = 0; i < charts.length; i++) {
      charts[i].style.display = "none";
    }
    charts[chartIndex - 1].style.display = "block";
    for (var i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[chartIndex - 1].className += " active";
  }, [setChartIndex, chartIndex]);

  return (
    <div>
      <div className="chartContainer">
        <div className="chart fade">
          <BarChart
            applicableDates={applicableDates}
            minTemp={minTemp}
            maxTemp={maxTemp}
          />
        </div>
        <div className="chart fade">
          <LineChart
            applicableDates={applicableDates}
            humidityArray={humidityArray}
          />
        </div>
        <div className="chart fade">
          <RadarChart
            applicableDates={applicableDates}
            windSpeedArray={windSpeedArray}
            windCompassArray={windCompassArray}
          />
        </div>
        <div className="chart fade">
          <LineChartWind
            applicableDates={applicableDates}
            windSpeedArray={windSpeedArray}
          />
        </div>
        <div className="chart fade">
          <BubbleChart
            applicableDates={applicableDates}
            visibilityArray={visibilityArray}
          />
        </div>
        <MdKeyboardArrowLeft className="prev" onClick={() => changeChart(-1)} />
        <MdKeyboardArrowRight className="next" onClick={() => changeChart(1)} />
      </div>
      <div className="dotContainer">
        <span className="dot" onClick={() => moveToChart(1)}></span>
        <span className="dot" onClick={() => moveToChart(2)}></span>
        <span className="dot" onClick={() => moveToChart(3)}></span>
        <span className="dot" onClick={() => moveToChart(4)}></span>
        <span className="dot" onClick={() => moveToChart(5)}></span>
      </div>
    </div>
  );
};

export default SlideShow;
