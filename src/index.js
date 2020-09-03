import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA62nydNJf-dz12wm-BuQlPPpM2X3qQ1MI",
  authDomain: "when2meet-clone.firebaseapp.com",
  databaseURL: "https://when2meet-clone.firebaseio.com",
  projectId: "when2meet-clone",
  storageBucket: "when2meet-clone.appspot.com",
  messagingSenderId: "383434540084",
  appId: "1:383434540084:web:c8ebbb31819ba5e843f661",
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
