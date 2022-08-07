import { useEffect, useState } from "react";
import classes from "./APIFetch.module.css";

const APIFetch = (props) => {
  const [error, setError] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    cityname: "",
    sky: "",
    skyDescription: "",
    originalTemp: "",
    temp: "",
    country: "",
    humidity: "",
    symbol: "",
  });
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=944b8293da5cadbdfd317b406c822233`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data?.cod !== 200) {
          setError(true);
          throw new Error("error error");
        }
        const cityname = data.name;
        const sky = data.weather[0].main;
        const temp = data.main.temp;
        const country = data.sys.country;
        const humidity = data.main.humidity;
        const skyDescription = data.weather[0].description;
        setWeatherInfo({
          cityname: cityname,
          sky: sky,
          humidity: humidity,
          originalTemp: temp,
          temp: temp,
          country: country,
          skyDescription: skyDescription,
          symbol: "ºK",
        });
        setError(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.city]);



  const kelvinToCelcius = (kelvin) => kelvin - 273.15;

  const kelvinToFahrenheit = (kelvin) => 1.8 * (kelvin - 273) + 32;

  const celciusClickHandler = () => {
    const celcius = kelvinToCelcius(weatherInfo.originalTemp);
    // setCelcius(celcius);
    setWeatherInfo({
      ...weatherInfo,
      temp: Math.round(celcius),
      symbol: "ºC",
    });
  };

  const fahrenClickHandler = () => {
    const fahrenheit = kelvinToFahrenheit(weatherInfo.originalTemp);
    // setFahrenheit(fahrenheit);
    setWeatherInfo({
      ...weatherInfo,
      temp: Math.round(fahrenheit),
      symbol: "ºF",
    });
  };

  const kelvinClickHandler = () => {
    setWeatherInfo({
      ...weatherInfo,
      temp: weatherInfo.originalTemp,
      symbol: "ºK"
    })
  }

  let display;

  if (props.click && !error) {
    display = (
      <div className={classes.container__info}>
        <div className={classes.left}>
          <h1>City, Country</h1>
          <h1>Temperature</h1>
          <h1>Sky</h1>
          <h1>Humidity</h1>
        </div>
        <div className={classes.right}>
          <h1>
            {weatherInfo.cityname}, {weatherInfo.country}
          </h1>
          <div className={classes.sec}>
            <h1>
              {Math.round(weatherInfo.temp)} {weatherInfo.symbol}
            </h1>
            <button
              className={classes.sec__button}
              onClick={celciusClickHandler}
            >
              ºC
            </button>
            <button
              className={classes.sec__button}
              onClick={fahrenClickHandler}
            >
              ºF
            </button>
            <button
              className={classes.sec__button}
              onClick={kelvinClickHandler}
            >
              ºK
            </button>
          </div>
          <h1>
            {weatherInfo.sky}: {weatherInfo.skyDescription}
          </h1>
          <h1>{weatherInfo.humidity}%</h1>
        </div>
      </div>
    );
  }
  if (props.click && error) {
    display = <h1>City Not Found!</h1>;
  }

  return <>{display}</>;
};

export default APIFetch;
