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
  let obj = {
    consolidated_weather: [
      {
        id: 6242237370335232,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "NW",
        created: "2021-03-20T12:20:02.998294Z",
        applicable_date: "2021-03-20",
        min_temp: 3.01,
        max_temp: 11.024999999999999,
        the_temp: 9.425,
        wind_speed: 3.5622311979055645,
        wind_direction: 318.6424106168347,
        air_pressure: 1032.0,
        humidity: 74,
        visibility: 9.024795196055038,
        predictability: 71,
      },
      {
        id: 5210101834055680,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "NNE",
        created: "2021-03-20T12:20:04.111956Z",
        applicable_date: "2021-03-21",
        min_temp: 6.859999999999999,
        max_temp: 12.425,
        the_temp: 11.275,
        wind_speed: 5.973580831824809,
        wind_direction: 15.75,
        air_pressure: 1029.0,
        humidity: 57,
        visibility: 12.38517060367454,
        predictability: 71,
      },
      {
        id: 5342652846309376,
        weather_state_name: "Light Cloud",
        weather_state_abbr: "lc",
        wind_direction_compass: "W",
        created: "2021-03-20T12:20:04.109366Z",
        applicable_date: "2021-03-22",
        min_temp: 4.619999999999999,
        max_temp: 13.780000000000001,
        the_temp: 12.129999999999999,
        wind_speed: 4.030802214942072,
        wind_direction: 263.0064297614647,
        air_pressure: 1026.5,
        humidity: 59,
        visibility: 12.239148373498768,
        predictability: 70,
      },
      {
        id: 6713512186347520,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "SW",
        created: "2021-03-20T12:20:04.206922Z",
        applicable_date: "2021-03-23",
        min_temp: 6.525,
        max_temp: 12.395,
        the_temp: 11.129999999999999,
        wind_speed: 6.4269830028659305,
        wind_direction: 235.99322989193024,
        air_pressure: 1023.5,
        humidity: 63,
        visibility: 13.344878410085103,
        predictability: 71,
      },
      {
        id: 6290133100789760,
        weather_state_name: "Showers",
        weather_state_abbr: "s",
        wind_direction_compass: "SW",
        created: "2021-03-20T12:20:05.422148Z",
        applicable_date: "2021-03-24",
        min_temp: 7.74,
        max_temp: 12.92,
        the_temp: 11.765,
        wind_speed: 6.637718125817227,
        wind_direction: 227.39634839864567,
        air_pressure: 1021.5,
        humidity: 64,
        visibility: 12.455696233993478,
        predictability: 73,
      },
      {
        id: 5212163418357760,
        weather_state_name: "Showers",
        weather_state_abbr: "s",
        wind_direction_compass: "WSW",
        created: "2021-03-20T12:20:05.909741Z",
        applicable_date: "2021-03-25",
        min_temp: 5.4750000000000005,
        max_temp: 13.934999999999999,
        the_temp: 11.25,
        wind_speed: 5.259536705639068,
        wind_direction: 248.0,
        air_pressure: 1017.0,
        humidity: 61,
        visibility: 9.999726596675416,
        predictability: 73,
      },
    ],
    time: "2021-03-20T15:04:17.396560Z",
    sun_rise: "2021-03-20T06:02:55.425702Z",
    sun_set: "2021-03-20T18:13:54.426726Z",
    timezone_name: "LMT",
    parent: {
      title: "England",
      location_type: "Region / State / Province",
      woeid: 24554868,
      latt_long: "52.883560,-1.974060",
    },
    sources: [
      {
        title: "BBC",
        slug: "bbc",
        url: "http://www.bbc.co.uk/weather/",
        crawl_rate: 360,
      },
      {
        title: "Forecast.io",
        slug: "forecast-io",
        url: "http://forecast.io/",
        crawl_rate: 480,
      },
      {
        title: "HAMweather",
        slug: "hamweather",
        url: "http://www.hamweather.com/",
        crawl_rate: 360,
      },
      {
        title: "Met Office",
        slug: "met-office",
        url: "http://www.metoffice.gov.uk/",
        crawl_rate: 180,
      },
      {
        title: "OpenWeatherMap",
        slug: "openweathermap",
        url: "http://openweathermap.org/",
        crawl_rate: 360,
      },
      {
        title: "Weather Underground",
        slug: "wunderground",
        url: "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
        crawl_rate: 720,
      },
      {
        title: "World Weather Online",
        slug: "world-weather-online",
        url: "http://www.worldweatheronline.com/",
        crawl_rate: 360,
      },
    ],
    title: "London",
    location_type: "City",
    woeid: 44418,
    latt_long: "51.506321,-0.12714",
    timezone: "Europe/London",
  };

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
    // * offline data
    if (!obj.consolidated_weather) {
      console.log("offline");
      setMessage(
        "Couldn't fetch data from the server.Here is your last search."
      );
      let offlineWeatherData: any = localStorage.getItem("weatherData");
      obj = JSON.parse(offlineWeatherData);
    } else {
      // * if already exist delete the old one
      if (localStorage.getItem("weatherData"))
        localStorage.removeItem("weatherData");
    }
    localStorage.setItem("weatherData", JSON.stringify(obj));
    setWeatherData(obj.consolidated_weather);
    setDate(obj.consolidated_weather[day].applicable_date);
    setWeatherState(obj.consolidated_weather[day].weather_state_name);
    var minTemp = obj.consolidated_weather[day].min_temp;
    var maxTemp = obj.consolidated_weather[day].max_temp;
    setMinMaxTemp({ minTemp, maxTemp });
    //HUMIDITY
    setHumidity(obj.consolidated_weather[day].humidity);
    // VISIBILITY
    setVisibility(obj.consolidated_weather[day].visibility);
    // WIND DATA
    var speed = obj.consolidated_weather[day].wind_speed;
    var direction = obj.consolidated_weather[day].wind_direction;
    var compass = obj.consolidated_weather[day].wind_direction_compass;
    setWindData({ speed, direction, compass });
    setProps(obj.consolidated_weather);

    setLoading(false);
    setDisplaySearchBar(false);
  };

  useEffect(() => {
    setLocationParameter(inputData.inputValue);
  }, [inputData.inputValue]);

  const setProps = (weatherObj: any) => {
    for (var i = 0; i < 3; i++) {
      dates.push(weatherObj[i].applicable_date);
      mins.push(weatherObj[i].min_temp.toFixed(2));
      maxs.push(weatherObj[i].max_temp.toFixed(2));
      humidityArray.push(weatherObj[i].humidity.toFixed(2));
      windSpeedArray.push(weatherObj[i].wind_speed.toFixed(2));
      windCompassArray.push(weatherObj[i].wind_direction_compass);
      visibilityArray.push(weatherObj[i].visibility.toFixed(2));
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
