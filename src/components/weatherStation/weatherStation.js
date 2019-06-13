import React, {useEffect, useState} from 'react';
import firebase from '../../config/fbConfig';

const db = firebase.firestore();

const WeatherStation = () => {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');


    useEffect(() => {
        const unsubscribe = db.collection("new_forecast").orderBy('date', "desc")
            .onSnapshot((snap) => {
                const changes = snap.docChanges();
                if (changes.length > 0) {
                    const data = changes[0].doc.data();
                    setTemperature(data.temperature);
                    setPressure(data.pressure);
                    setHumidity(data.humidity);
                }
            });
        return () => unsubscribe();
    },[]);

    if (temperature && humidity && pressure) {
        return (<div className="weather-station bg-dark text-light py-2">
            <h2 className="my-3 text-center">Weather Station</h2>
            <p className="text-center">The most updated weather data</p>

            <div className="container text-center mt-4">
                <div className="row">
                    <div className="col-sm">
                        <p className="num mb-0">{temperature}</p>
                        <p className="mt-1">Temperature</p>
                    </div>
                    <div className="col-sm">
                        <p className="num mb-0">{humidity}</p>
                        <p className="mt-1">Humidity</p>
                    </div>
                    <div className="col-sm">
                        <p className="num mb-0">{pressure}</p>
                        <p className="mt-1">Pressure</p>
                    </div>
                </div>
            </div>
        </div>);
    } else {
        return null
    }
};

export default WeatherStation;