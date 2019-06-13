import React from 'react';

const StatisticsElement = ({temperature, humidity, pressure}) => {
    let sumT = 0;
    let minT = '';
    let maxT = '';

    let sumH = 0;
    let minH = '';
    let maxH = '';

    let sumP = 0;
    let minP = '';
    let maxP = '';

    temperature.forEach(i => {
        sumT += i;
        if (i < minT || minT === '') {
            minT = i;
        }
        if (i > maxT || maxT === '') {
            maxT = i;
        }
    });
    const avgT = (sumT / temperature.length).toFixed(2);

    humidity.forEach(i => {
        sumH += i;
        if (i < minH || minH === '') {
            minH = i;
        }
        if (i > maxH || maxH === '') {
            maxH = i;
        }
    });
    const avgH = (sumH / humidity.length).toFixed(2);

    pressure.forEach(i => {
        sumP += i;
        if (i < minP || minP === '') {
            minP = i;
        }
        if (i > maxP || maxP === '') {
            maxP = i;
        }
    });
    const avgP = (sumP / pressure.length).toFixed(2);


    return (
        <div className="statistics-element">
            <div className="card">
                <div className="card-header font-weight-bold bg-info">
                    Statistics
                </div>
                <div className="card-body d-flex flex-column flex-sm-row justify-content-center">
                    <div className="mx-2 text-left">
                        <p className="font-weight-bolder mb-0 mt-2 mt-sm-0">Temperature</p>
                        <p className="my-1">Avg: <span className="num">{avgT}</span></p>
                        <p className="my-1">Min: <span className="num">{minT}</span></p>
                        <p className="my-1">Max: <span className="num">{maxT}</span></p>
                    </div>
                    <div className="mx-2 text-left">
                        <p className="font-weight-bolder mb-0 mt-2 mt-sm-0">Humidity</p>
                        <p className="my-1">Avg: <span className="num">{avgH}</span></p>
                        <p className="my-1">Min: <span className="num">{minH}</span></p>
                        <p className="my-1">Max: <span className="num">{maxH}</span></p>
                    </div>
                    <div className="mx-2 text-left">
                        <p className="font-weight-bolder mb-0 mt-2 mt-sm-0">Pressure</p>
                        <p className="my-1">Avg: <span className="num">{avgP}</span></p>
                        <p className="my-1">Min: <span className="num">{minP}</span></p>
                        <p className="my-1">Max: <span className="num">{maxP}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsElement;