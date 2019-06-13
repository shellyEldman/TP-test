import React, {useState} from 'react';
import firebase from '../../config/fbConfig';

const db = firebase.firestore();

const CurrentWeather = () => {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');

    const [loading, setLoading] = useState(false);
    const [submitPressed, setPressed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!humidity || !temperature || !pressure) {
            setPressed(true);
        } else {
            setPressed(false);
            setLoading(true);
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
                            <input value={temperature} onChange={(e) => setTemperature(e.target.value)} type="number" className={`form-control form-control-sm ml-sm-5 num ${(submitPressed && !temperature) ? 'border-danger' : ''}`} id="temperature"
                                   placeholder="Enter temperature in Celsius"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="humidity" className="col-sm-2 col-form-label">Humidity</label>
                        <div className="col-sm-10">
                            <input value={humidity} onChange={(e) => setHumidity(e.target.value)} type="number" className={`form-control form-control-sm ml-sm-5 num ${(submitPressed && !humidity) ? 'border-danger' : ''}`} id="humidity"
                                   placeholder="Enter humidity"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="pressure" className="col-sm-2 col-form-label">Pressure</label>
                        <div className="col-sm-10">
                            <input value={pressure} onChange={(e) => setPressure(e.target.value)} type="number" className={`form-control form-control-sm ml-sm-5 num ${(submitPressed && !pressure) ? 'border-danger' : ''}`} id="pressure"
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