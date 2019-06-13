import React from 'react';

const AmericanElement = ({temperature}) => {
    let sum = 0;
    let min = '';
    let max = '';

    temperature.forEach(i => {
        sum += i;
        if (i < min || min === '') {
            min = i;
        }
        if (i > max || max === '') {
            max = i;
        }
    });
    min = min * 1.8 + 32;
    max = max * 1.8 + 32;
    const avg = (sum / temperature.length * 1.8 + 32).toFixed(2);

    return (
        <div className="american-element">
            <div className="card">
                <div className="card-header font-weight-bold bg-warning">
                    American Temperature
                </div>
                <div className="card-body d-flex justify-content-center align-items-center">
                    <p className="mx-2">Avg: <span className="num">{avg}</span></p>
                    <p className="mx-2">Min: <span className="num">{min}</span></p>
                    <p className="mx-2">Max: <span className="num">{max}</span></p>
                </div>
            </div>
        </div>
    );
};

export default AmericanElement