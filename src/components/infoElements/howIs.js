import React from 'react';

const HowIs = ({temperature}) => {
    return (
        <div className="how-is-element">
            <div className="card">
                <div className="card-header font-weight-bold bg-success">
                    How's the weather
                </div>
                <div className="card-body d-flex justify-content-center align-items-center">
                    {(temperature < 25 && temperature > 16) && <div>
                        <p className="mx-2">It's Nice!</p>
                        <p><i className="fas fa-cloud-sun mx-2 weather-icon"/></p>
                    </div>}
                    {(temperature < 15) && <div>
                        <p className="mx-2">It's Cold!</p>
                        <p><i className="fas fa-snowflake mx-2 weather-icon"/></p>
                    </div>}
                    {(temperature > 25) && <div>
                        <p className="mx-2">It's Hot!</p>
                        <p><i className="fas fa-sun mx-2 weather-icon"/></p>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default HowIs;