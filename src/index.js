import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBj0aiKumoVVtjSqkKmlO2OjBizLjvcSw8',
    authDomain: 'reminder-app-df93f.firebaseapp.com',
    projectId: 'reminder-app-df93f',
    storageBucket: 'reminder-app-df93f.appspot.com',
    messagingSenderId: '161949265733',
    appId: '1:161949265733:web:47526084f990763156d82c',
    measurementId: 'G-54N4RJBHYJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
