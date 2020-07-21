import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6d1JEjDkx_QPKqfhb538R-BhoQW3bHzE",
    authDomain: "cart-ca376.firebaseapp.com",
    databaseURL: "https://cart-ca376.firebaseio.com",
    projectId: "cart-ca376",
    storageBucket: "cart-ca376.appspot.com",
    messagingSenderId: "284758967167",
    appId: "1:284758967167:web:c161696fdd217f7fe6904a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
