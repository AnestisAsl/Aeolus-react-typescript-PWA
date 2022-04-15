import * as React from "react";
import { FC, useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { InputContext } from "../../context/inputContext";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import WeatherData from "./weatherData";
import SlideShow from "./slideshow";
import MessageNotifications from "../messageNotifications";
import Axios from "axios";

const SearchBar: FC = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { inputData, setInputData } = useContext(InputContext);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showCharts, setShowCharts] = useState<boolean>(false);
  const [showBarcode, setShowBarcode] = useState<boolean>(false);
  const [displaySearchBar, setDisplaySearchBar] = useState<boolean>(true);
  const [day, setDay] = useState<number>(0);
  const [weatherData, setWeatherData] = useState<any>("none");
  const [locationParameter, setLocationParameter] = useState();
  const [weatherState, setWeatherState] = useState<any>();
  const [minMaxTemp, setMinMaxTemp] = useState({
    minTemp: 100,
    maxTemp: -100,
  });
  const [windData, setWindData] = useState({
    speed: 0,
    direction: 0,
    compass: "",
  });
  const [humidity, setHumidity] = useState<any>();
  const [visibility, setVisibility] = useState<any>();
  const [date, setDate] = useState<string>();
  //props for slideshow
  const [dates, setDates] = useState<string[]>([]);
  const [mins, setMins] = useState<number[]>([]);
  const [maxs, setMaxs] = useState<number[]>([]);
  const [humidityArray, setHumidityArray] = useState<number[]>([]);
  const [windSpeedArray, setWindSpeedArray] = useState<number[]>([]);
  const [windCompassArray, setWindCompassArray] = useState<string[]>([]);
  const [visibilityArray, setVisibilityArray] = useState<number[]>([]);

  const setBooleanValues = () => {
    setLoading(true);
    setDisplaySearchBar(true);
  };
  const setBooleanValuesCharts = (chartsBoolean: boolean) => {
    setShowCharts(chartsBoolean);
  };
  const setBooleanValuesBarCode = (barcodeBoolean: boolean) => {
    setShowBarcode(showBarcode);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    getWeatherData(locationParameter, day);
  };
  const changeDay = (newDay: number) => {
    setDay(newDay);
    getWeatherData(locationParameter, newDay);
  };

  const getWeatherData = async (locationParameter: any, day: number) => {
    const locationWoeidRes = await Axios.post(
      "http://localhost:5000/users/fetchLocationData",
      {
        locationParameter,
      }
    );
    console.log(locationWoeidRes.data.locationData[0]);
    const woeid = locationWoeidRes.data.locationData[0].woeid;
    const weatherRes = await Axios.post(
      "http://localhost:5000/users/fetchWeatherData",
      {
        woeid,
      }
    );
    console.log(weatherRes.data.weatherData.consolidated_weather);
    setWeatherData(weatherRes.data.weatherData.consolidated_weather);
    // * offline data
    if (!weatherData.consolidated_weather) {
      console.log("offline");
      setMessage(
        "Couldn't fetch data from the server.Here is your last search."
      );
      let offlineWeatherData: any = localStorage.getItem("weatherData");
      setWeatherData(JSON.parse(offlineWeatherData));
    } else {
      // * if already exist delete the old one
      if (localStorage.getItem("weatherData"))
        localStorage.removeItem("weatherData");
    }
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
    setWeatherData(weatherData.consolidated_weather);
    setDate(weatherData.consolidated_weather[day].applicable_date);
    setWeatherState(weatherData.consolidated_weather[day].weather_state_name);
    var minTemp = weatherData.consolidated_weather[day].min_temp;
    var maxTemp = weatherData.consolidated_weather[day].max_temp;
    setMinMaxTemp({ minTemp, maxTemp });
    setHumidity(weatherData.consolidated_weather[day].humidity);
    setVisibility(weatherData.consolidated_weather[day].visibility);
    var speed = weatherData.consolidated_weather[day].wind_speed;
    var direction = weatherData.consolidated_weather[day].wind_direction;
    var compass = weatherData.consolidated_weather[day].wind_direction_compass;
    setWindData({ speed, direction, compass });
    setProps(weatherData.consolidated_weather);

    setLoading(false);
    setDisplaySearchBar(false);
  };

  useEffect(() => {
    setLocationParameter(inputData.inputValue);
  }, [inputData.inputValue]);

  const setProps = (weatherweatherData: any) => {
    for (var i = 0; i < 3; i++) {
      dates.push(weatherweatherData[i].applicable_date);
      mins.push(weatherweatherData[i].min_temp.toFixed(2));
      maxs.push(weatherweatherData[i].max_temp.toFixed(2));
      humidityArray.push(weatherweatherData[i].humidity.toFixed(2));
      windSpeedArray.push(weatherweatherData[i].wind_speed.toFixed(2));
      windCompassArray.push(weatherweatherData[i].wind_direction_compass);
      visibilityArray.push(weatherweatherData[i].visibility.toFixed(2));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="searchBar">
      {message && (
        <MessageNotifications
          message={message}
          eraseError={() => setMessage(undefined)}
        />
      )}
      {showCharts && (
        <div>
          <SlideShow
            applicableDates={dates!}
            minTemp={mins}
            maxTemp={maxs}
            humidityArray={humidityArray}
            windSpeedArray={windSpeedArray}
            windCompassArray={windCompassArray}
            visibilityArray={visibilityArray}
          />
          <button
            className="clearButton"
            onClick={() => setBooleanValuesCharts(false)}
          >
            CLEAR
          </button>
        </div>
      )}
      {!showCharts && (
        <div className="apiAnswer">
          {loading ? (
            <div>Waiting for next request...</div>
          ) : (
            weatherState && (
              <div className="weatherDataContainer">
                <div className="weatherDateDisplayContainer">
                  {day > 0 && (
                    <MdKeyboardArrowLeft
                      className="prev"
                      onClick={() => changeDay(day - 1)}
                    />
                  )}
                  <h1>{date}</h1>

                  {day < 3 && (
                    <MdKeyboardArrowRight
                      className="next"
                      onClick={() => changeDay(day + 1)}
                    />
                  )}
                </div>

                <WeatherData
                  weather_state_name={weatherState}
                  temperature={minMaxTemp}
                  wind={windData}
                  humidity={humidity}
                  visibility={visibility}
                ></WeatherData>
                <div className="rowContainer">
                  <button
                    className="saveToMyListButton"
                    onClick={() => setBooleanValuesCharts(true)}
                  >
                    SHOW CHARTS
                  </button>

                  <button
                    onClick={() => setBooleanValues()}
                    className="clearButton"
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {displaySearchBar && (
        <div className="displaySearchBar">
          <input
            type="search"
            value={inputData.inputValue}
            placeholder="type your location here..."
            className="input"
            required
            onChange={(e) => setInputData({ inputValue: e.target.value })}
          />
          <div className="flexColumn">
            <button type="submit" className="searchButton">
              SEARCH
            </button>
            {userData.user && (
              <button
                className="saveToMyListButton"
                type="button"
                onClick={async () => {
                  const userId = userData.user.id;
                  const location = inputData.inputValue;
                  const userLocation = { userId, location };
                  console.log(location);
                  try {
                    const addRes = await Axios.post(
                      "http://localhost:5000/users/addToMyList",
                      userLocation
                    );
                    if (addRes) {
                      setInputData({
                        isAdded: !inputData.isAdded,
                      });
                      setMessage(addRes.data.msg);
                    }
                  } catch (err: any) {
                    setMessage(err.response.data.msg);
                  }
                }}
              >
                SAVE TO MY LIST
              </button>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
