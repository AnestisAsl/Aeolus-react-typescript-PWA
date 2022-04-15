import * as React from "react";
import { FC, useEffect } from "react";
import { IoRainyOutline, IoSnowSharp } from "react-icons/io5";
import { WiSleet, WiCelsius } from "react-icons/wi";
import { RiHailLine, RiCloudFill, RiSunCloudyLine } from "react-icons/ri";
import { IoIosThunderstorm } from "react-icons/io";
import { FaCloudRain, FaCloudSunRain } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import bwipjs from "bwip-js";

import {
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUpLeft,
  BsArrowUpRight,
  BsArrowUp,
} from "react-icons/bs";

interface WeatherDataProps {
  weather_state_name: string;
  temperature: {
    minTemp: number;
    maxTemp: number;
  };
  wind: {
    speed: number;
    direction: number;
    compass: string;
  };
  humidity: number;
  visibility: number;
}

const WeatherData: FC<WeatherDataProps> = ({
  weather_state_name,
  temperature,
  wind,
  humidity,
  visibility,
}) => {
  const matchWeatherStatesWithIcons = () => {
    switch (weather_state_name) {
      case "Light Rain":
        return <IoRainyOutline fontSize={64}></IoRainyOutline>;
      case "Snow":
        return <IoSnowSharp fontSize={64}></IoSnowSharp>;
      case "Sleet":
        return <WiSleet fontSize={64}></WiSleet>;
      case "Hail":
        return <RiHailLine fontSize={64}></RiHailLine>;
      case "Thunderstorm":
        return <IoIosThunderstorm fontSize={64}></IoIosThunderstorm>;
      case "Heavy Rain":
        return <FaCloudRain fontSize={64}></FaCloudRain>;
      case "Showers":
        return <FaCloudSunRain fontSize={64}></FaCloudSunRain>;
      case "Heavy Cloud":
        return <RiCloudFill fontSize={64}></RiCloudFill>;
      case "Light Cloud":
        return <RiSunCloudyLine fontSize={64}></RiSunCloudyLine>;
      case "Clear":
        return <FiSun fontSize={64}></FiSun>;
    }
  };
  const matchWindDirectionCompassPointsToText = () => {
    switch (wind.compass) {
      case "NNE":
        return (
          <p>
            North-Northeast <BsArrowUp fontSize={32} />{" "}
            <BsArrowUpRight fontSize={32} />
          </p>
        );

      case "ENE":
        return (
          <p>
            East-Northeast <BsArrowUpRight fontSize={32} />{" "}
            <BsArrowRight fontSize={32} />
          </p>
        );
      case "ESE":
        return (
          <p>
            East-Southeast <BsArrowUpRight fontSize={32} />{" "}
            <BsArrowDownRight fontSize={32} />
          </p>
        );
      case "SSE":
        return (
          <p>
            South-Southeast <BsArrowDownRight fontSize={32} />{" "}
            <BsArrowDown fontSize={32} />
          </p>
        );
      case "SSW":
        return (
          <p>
            South-Southwest <BsArrowDown fontSize={32} />{" "}
            <BsArrowDownLeft fontSize={32} />
          </p>
        );
      case "WSW":
        return (
          <p>
            West-Southwest <BsArrowDownLeft fontSize={32} />{" "}
            <BsArrowLeft fontSize={32} />
          </p>
        );
      case "WNW":
        return (
          <p>
            West-Northwest <BsArrowLeft fontSize={32} />{" "}
            <BsArrowUpLeft fontSize={32} />
          </p>
        );
      case "NNW":
        return (
          <p>
            North-Northwest <BsArrowUpLeft fontSize={32} />{" "}
            <BsArrowUp fontSize={32} />
          </p>
        );
      case "NE":
        return (
          <p>
            Northeast <BsArrowUpRight fontSize={32} />{" "}
          </p>
        );
      case "SE":
        return (
          <p>
            Southeast <BsArrowDownRight fontSize={32} />{" "}
          </p>
        );
      case "SW":
        return (
          <p>
            Southwest <BsArrowDownLeft fontSize={32} />{" "}
          </p>
        );
      case "NW":
        return (
          <p>
            Southwest <BsArrowUpLeft fontSize={32} />{" "}
          </p>
        );
      case "N":
        return (
          <p>
            North <BsArrowUp fontSize={32} />{" "}
          </p>
        );
      case "E":
        return (
          <p>
            North <BsArrowRight fontSize={32} />{" "}
          </p>
        );
      case "S":
        return (
          <p>
            South <BsArrowDown fontSize={32} />{" "}
          </p>
        );
      case "W":
        return (
          <p>
            West <BsArrowLeft fontSize={32} />{" "}
          </p>
        );
    }
  };
  const convertMPHtoBeaufortNumbers = () => {
    var beaufortNumber = 0;
    var description = "";
    if (wind.speed < 1) {
      beaufortNumber = 0;
      description = "calm";
    } else if (wind.speed <= 3) {
      beaufortNumber = 1;
      description = "Light air";
    } else if (wind.speed <= 7) {
      beaufortNumber = 2;
      description = "Light breeze";
    } else if (wind.speed <= 12) {
      beaufortNumber = 3;
      description = "Gentle breeze";
    } else if (wind.speed <= 18) {
      beaufortNumber = 4;
      description = "Moderate breeze";
    } else if (wind.speed <= 24) {
      beaufortNumber = 5;
      description = "Fresh breeze";
    } else if (wind.speed <= 31) {
      beaufortNumber = 6;
      description = "Strong breeze";
    } else if (wind.speed <= 38) {
      beaufortNumber = 7;
      description = "High wind,moderate gale,near gale";
    } else if (wind.speed <= 46) {
      beaufortNumber = 8;
      description = "Gale,fresh gale";
    } else if (wind.speed <= 54) {
      beaufortNumber = 9;
      description = "strong/severe gale";
    } else if (wind.speed <= 63) {
      beaufortNumber = 10;
      description = "storm,whole gale";
    } else if (wind.speed <= 72) {
      beaufortNumber = 11;
      description = "Violent storm";
    } else if (wind.speed > 72) {
      beaufortNumber = 12;
      description = "Hurricane force";
    }
    return beaufortNumber + " Beaufort, " + description;
  };
  const matchVisibilityValuesWithText = () => {
    var typeOfVisibilityState = "";
    if (visibility < 0.62) {
      typeOfVisibilityState = "fog";
    } else if (visibility < 1.2) {
      typeOfVisibilityState = "mist";
    } else if (visibility < 3.1) {
      typeOfVisibilityState = "haze";
    }
    if (typeOfVisibilityState !== "") {
      return typeOfVisibilityState + ", probability";
    } else {
      return typeOfVisibilityState;
    }
  };
  const createBarcode = () => {
    try {
      let canvas = bwipjs.toCanvas("barcode", {
        bcid: "datamatrix",
        text:
          weather_state_name +
          " " +
          JSON.stringify(temperature) +
          " " +
          JSON.stringify(wind) +
          " " +
          humidity +
          " " +
          visibility,
        scale: 4,
        height: 15,
        includetext: false,
        textxalign: "center",
      });
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    createBarcode();
  }, []);
  return (
    <div className="containerWeatherData">
      <div className="rowContainer">
        <h3>WEATHER STATE:</h3>
        {matchWeatherStatesWithIcons()}
        <p>{weather_state_name}</p>
      </div>
      <div className="rowContainer">
        <h3>TEMPERATURE:</h3>
        <p>From {temperature.minTemp.toFixed(2)}</p>
        <WiCelsius fontSize={40} />
        <p>To {temperature.maxTemp.toFixed(2)}</p>
        <WiCelsius fontSize={40} />
      </div>
      <div className="rowContainer">
        <h3>WIND:</h3>

        <table>
          <tbody>
            <tr>
              <th>Direction</th>
              <th>Speed</th>
            </tr>
            <tr>
              <td>
                <p>{wind.compass}</p>
                {matchWindDirectionCompassPointsToText()}
                <p>{wind.direction.toFixed(2)} degrees</p>
              </td>
              <td>
                <p>{wind.speed.toFixed(2)} mph</p>
                <p>{convertMPHtoBeaufortNumbers()} </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rowContainer">
        <h3>HUMIDITY:</h3>
        <p>{humidity}%</p>
      </div>
      <div className="rowContainer">
        <h3>VISIBILITY:</h3>
        <p>
          {visibility.toFixed(2)} mph {matchVisibilityValuesWithText()}{" "}
        </p>
      </div>
      <canvas id="barcode"></canvas>
    </div>
  );
};

export default WeatherData;
