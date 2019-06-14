import React, {useEffect, useState} from 'react';
import firebase from '../../config/fbConfig';

const db = firebase.firestore();

const StatisticsElement = () => {
    const [temp_info, setTemp] = useState('');
    const [humi_info, setHumi] = useState('');
    const [pressure_info, setPressure] = useState('');

    useEffect(() => {
        const unsubscribe = db.collection("info").doc('temperature_info')
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setTemp({...doc.data()});
                }
            });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = db.collection("info").doc('humidity_info')
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setHumi({...doc.data()});
                }
            });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = db.collection("info").doc('pressure_info')
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setPressure({...doc.data()});
                }
            });
        return () => unsubscribe();
    }, []);

    if (temp_info !== '' && humi_info !== '' && pressure_info !== '') {
        return (
            <div className="statistics-element">
                <div className="card">
                    <div className="card-header font-weight-bold bg-info">
                        Statistics
                    </div>
                    <div className="card-body d-flex flex-column flex-sm-row justify-content-center">
                        <div className="mx-2 text-left">
                            <p className="font-weight-bolder mb-0 mt-2 mt-sm-0">Temperature</p>
                            <p className="my-1">Avg: <span className="num">{temp_info.avg.toFixed(2)}</span></p>
                            <p className="my-1">Min: <span className="num">{temp_info.min}</span></p>
                            <p className="my-1">Max: <span className="num">{temp_info.max}</span></p>
                        </div>
                        <div className="mx-2 text-left">
                            <p className="font-weight-bolder mb-0 mt-2 mt-sm-0">Humidity</p>
                            <p className="my-1">Avg: <span className="num">{humi_info.avg.toFixed(2)}</span></p>
                            <p className="my-1">Min: <span className="num">{humi_info.min}</span></p>
                            <p className="my-1">Max: <span className="num">{humi_info.max}</span></p>
                        </div>
                        <div className="mx-2 text-left">
                            <p className="font-weight-bolder mb-0 mt-2 mt-sm-0">Pressure</p>
                            <p className="my-1">Avg: <span className="num">{pressure_info.avg.toFixed(2)}</span></p>
                            <p className="my-1">Min: <span className="num">{pressure_info.min}</span></p>
                            <p className="my-1">Max: <span className="num">{pressure_info.max}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default StatisticsElement;