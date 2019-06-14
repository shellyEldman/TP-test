import React, {useState, useEffect} from 'react';
import firebase from '../../config/fbConfig';

const db = firebase.firestore();

const AmericanElement = () => {
    const [temp_info, setTemp] = useState('');

    useEffect(() => {
        const unsubscribe = db.collection("info").doc('temperature_info')
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setTemp({...doc.data()});
                }
            });
        return () => unsubscribe();
    }, []);

    if (temp_info !== '') {
        return (
            <div className="american-element">
                <div className="card">
                    <div className="card-header font-weight-bold bg-warning">
                        American Temperature
                    </div>
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <p className="mx-2">Avg: <span className="num">{(temp_info.avg * 1.8 + 32).toFixed(2)}</span>
                        </p>
                        <p className="mx-2">Min: <span className="num">{temp_info.min * 1.8 + 32}</span></p>
                        <p className="mx-2">Max: <span className="num">{temp_info.max * 1.8 + 32}</span></p>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default AmericanElement