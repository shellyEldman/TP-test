import React from 'react';
import CurrentWeather from './components/currentWeather/current_weather';
import WeatherStation from './components/weatherStation/weatherStation';
import InfoElement from './components/infoElements/info';
import './App.scss';

function App() {
    return (
        <div className="App">
            <CurrentWeather/>
            <WeatherStation/>
            <InfoElement/>
        </div>
    );
}

export default App;
