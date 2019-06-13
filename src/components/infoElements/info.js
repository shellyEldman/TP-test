import React from 'react';
import StatisticsElement from './statisticsElement';
import AmericanElement from './americanElement';
import HowIs from './howIs';

import firebase from '../../config/fbConfig';

const db = firebase.firestore();


class InfoElement extends React.Component {
    state = {
        temperature: [],
        humidity: [],
        pressure: [],
        tempObj: {},
    };

    componentDidMount() {
        this.unsubscribe = db.collection("new_forecast").orderBy('date', "desc")
            .onSnapshot((snapshot) => {
                const changes = snapshot.docChanges();
                changes.forEach((change) => {
                    if (change.type === "added") {
                        const data = change.doc.data();

                        const temper = [Number(data.temperature), ...this.state.temperature];
                        this.setState({temperature: temper});

                        const humi = [Number(data.humidity), ...this.state.humidity];
                        this.setState({humidity: humi});

                        const press = [Number(data.pressure), ...this.state.pressure];
                        this.setState({pressure: press});
                    }
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        if (this.state.temperature.length && this.state.humidity.length && this.state.pressure.length) {
            return (
                <div className="info-element bg-light p-3">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-sm mt-4">
                                <AmericanElement temperature={this.state.temperature}/>
                            </div>
                            <div className="col-sm mt-4">
                                <StatisticsElement temperature={this.state.temperature} humidity={this.state.humidity}
                                                   pressure={this.state.pressure}/>
                            </div>
                            <div className="col-sm mt-4">
                                <HowIs temperature={this.state.temperature[0]}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default InfoElement;


