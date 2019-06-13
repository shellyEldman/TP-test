import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDTdU0cTjhD3HfRbagho6OJj7VBAPnvsZ8",
    authDomain: "trendy-pal.firebaseapp.com",
    databaseURL: "https://trendy-pal.firebaseio.com",
    projectId: "trendy-pal",
    storageBucket: "trendy-pal.appspot.com",
    messagingSenderId: "599086277142",
    appId: "1:599086277142:web:a222801e19867f2e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;