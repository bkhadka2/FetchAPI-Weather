import { useState, useRef } from "react";
import "./App.css";
import APIFetch from "./components/APIFetch";

function App() {
  const [click, setClick] = useState(false);
  const [city, setCity] = useState();

  const cityInputRef = useRef(null);

  const onClickHandler = () => {
    setCity(cityInputRef.current.value);
    setClick(true);
    // Not recommended since we are directly manipulating DOM without using react state but fuck it.
    cityInputRef.current.value = "";
  };

  return (
    <div className="App">
      <div className="container__input">
        <input
          type="text"
          placeholder="City Name"
          ref={cityInputRef}
          className="input__box"
        />
      </div>
      <div className="container__button">
        <button
          type="submit"
          onClick={onClickHandler}
          className="button__weather"
        >
          Display Weather
        </button>
      </div>
      {click && <APIFetch click={click} city={city} />}
      {!click && <p>Welcome to Weather App!</p>}
    </div>
  );
}

export default App;
