import React, {useState, useEffect} from 'react';
import firebase from '../../config/fbConfig';

const db = firebase.firestore();

const CurrentWeather = () => {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');

    const [info_temp, setInfoTemp] = useState('');
    const [info_humi, setInfoHumi] = useState('');
    const [info_pressure, setInfoPressure] = useState('');

    const [loading, setLoading] = useState(false);
    const [submitPressed, setPressed] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection("info").doc('temperature_info')
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setInfoTemp({...doc.data()});
                }
            });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = db.collection("info").doc('humidity_info')
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setInfoHumi({...doc.data()});
                }
            });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = db.collection("info").doc('pressure_info')
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setInfoPressure({...doc.data()});
                }
            });
        return () => unsubscribe();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (humidity === '' || temperature === '' || pressure === '') {
            setPressed(true);
        } else {
            setPressed(false);
            setLoading(true);
            update_info();
            db.collection('new_forecast').add({
                temperature,
                humidity,
                pressure,
                date: new Date()
            }).then(() => {
                setHumidity('');
                setTemperature('');
                setPressure('');
                setLoading(false);
            }).catch((err) => {
                setLoading(true);
                console.log('Cannot add new forecast', err);
            });
        }
    };

    const update_temp = () => {
        let new_info_temp = {};
        if (!info_temp) {
            new_info_temp = {
                min: temperature,
                max: temperature,
                length: 1,
                avg: temperature,
                sum: temperature
            }
        } else {
            let min = info_temp.min;
            let max = info_temp.max;
            let avg;
            let sum = info_temp.sum + temperature;
            let length = info_temp.length + 1;
            avg = sum / length;
            if (temperature < info_temp.min) {
                min = temperature;
            }
            if (temperature > info_temp.max) {
                max = temperature;
            }
            new_info_temp = {
                min,
                max,
                avg,
                length,
                sum
            };
        }

        db.collection('info').doc('temperature_info').set({
            ...new_info_temp
        }).then(() => {
            console.log('temperature info updated!');
        }).catch(err => {
            console.log('error adding temperature_info', err);
        });
    };

    const update_humidity = () => {
        let new_info_humi = {};
        if (!info_humi) {
            new_info_humi = {
                min: humidity,
                max: humidity,
                length: 1,
                avg: humidity,
                sum: humidity
            }
        } else {
            let min = info_humi.min;
            let max = info_humi.max;
            let avg;
            let sum = info_humi.sum + humidity;
            let length = info_humi.length + 1;
            avg = sum / length;
            if (humidity < info_humi.min) {
                min = humidity;
            }
            if (humidity > info_humi.max) {
                max = humidity;
            }
            new_info_humi = {
                min,
                max,
                avg,
                length,
                sum
            };
        }

        db.collection('info').doc('humidity_info').set({
            ...new_info_humi
        }).then(() => {
            console.log('humidity info updated!');
        }).catch(err => {
            console.log('error adding humidity_info', err);
        });
    };

    const update_pressure = () => {
        let new_info_pressure = {};
        if (!info_pressure) {
            new_info_pressure = {
                min: pressure,
                max: pressure,
                length: 1,
                avg: pressure,
                sum: pressure
            }
        } else {
            let min = info_pressure.min;
            let max = info_pressure.max;
            let avg;
            let sum = info_pressure.sum + pressure;
            let length = info_pressure.length + 1;
            avg = sum / length;
            if (pressure < info_pressure.min) {
                min = pressure;
            }
            if (pressure > info_pressure.max) {
                max = pressure;
            }
            new_info_pressure = {
                min,
                max,
                avg,
                length,
                sum
            };
        }

        db.collection('info').doc('pressure_info').set({
            ...new_info_pressure
        }).then(() => {
            console.log('pressure info updated!');
        }).catch(err => {
            console.log('error adding pressure_info', err);
        });
    };

    const update_info = () => {
        update_temp();
        update_humidity();
        update_pressure();
    };

    return (
        <div className="current-weather py-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-3">Current Weather</h2>

                <form onSubmit={handleSubmit} className="m-3">
                    <div className="form-group row">
                        <h5 className="mx-3 my-2">Enter the current forecast</h5>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="temperature" className="col-sm-2 col-form-label">Temperature</label>
                        <div className="col-sm-10">
                            <input value={temperature} onChange={(e) => setTemperature(Number(e.target.value))}
                                   type="number"
                                   className={`form-control form-control-sm ml-sm-5 num ${(submitPressed && !temperature) ? 'border-danger' : ''}`}
                                   id="temperature"
                                   placeholder="Enter temperature in Celsius"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="humidity" className="col-sm-2 col-form-label">Humidity</label>
                        <div className="col-sm-10">
                            <input value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} type="number"
                                   className={`form-control form-control-sm ml-sm-5 num ${(submitPressed && !humidity) ? 'border-danger' : ''}`}
                                   id="humidity"
                                   placeholder="Enter humidity"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="pressure" className="col-sm-2 col-form-label">Pressure</label>
                        <div className="col-sm-10">
                            <input value={pressure} onChange={(e) => setPressure(Number(e.target.value))} type="number"
                                   className={`form-control form-control-sm ml-sm-5 num ${(submitPressed && !pressure) ? 'border-danger' : ''}`}
                                   id="pressure"
                                   placeholder="Enter pressure"/>
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="btn btn-sm btn-info btn-block mt-4">
                        {loading ? (<div className="spinner-border text-light spinner-border-sm"/>) : (
                            <span>Submit</span>)}
                    </button>

                    {submitPressed && (!humidity || !temperature || !pressure) &&
                    <div className="alert alert-danger py-0 text-center my-3" role="alert">
                        Please, fill in all fields
                    </div>}

                </form>
            </div>
        </div>
    );
};

export default CurrentWeather;