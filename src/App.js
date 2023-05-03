import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import MainPage from './pages/MainPage';
import { Collections, getDocReference, getFirestoreDocument, setFirestoreDocument } from './utils/firestore';

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [mobile, setMobile] = useState('');
    const [userData, setUserData] = useState();

    async function onCloseSigninPage(userId, mobile) {
        const docRef = getDocReference(Collections.Users.name, userId, Collections.Users.convertor);
        const userData = await getFirestoreDocument(docRef);

        setUserId(userId);
        setMobile(mobile);
        setUserData(userData);
        localStorage.setItem('userId', userId);
        localStorage.setItem('mobile', mobile);
        localStorage.setItem('userData', JSON.stringify(userData));

        setIsSignedIn(true);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        !isSignedIn ? <Navigate to="/signup" replace={true} /> : <Navigate to="/main" replace={true} />
                    }
                />
                <Route
                    path="signup"
                    element={
                        !isSignedIn ? (
                            <SigninPage onCloseSigninPage={onCloseSigninPage} />
                        ) : (
                            <Navigate to="/main" replace={true} />
                        )
                    }
                />
                <Route path="main" element={<MainPage userId={userId} mobile={mobile} userData={userData} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
