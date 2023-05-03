import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import ShowReminders from '../components/ShowReminders';
import '../styles.css';
import { doc, setDoc, collection, addDoc, getDocFromServer } from 'firebase/firestore';
import { Button, TextField, Box, Container, Input, IconButton, Alert, Snackbar, LinearProgress } from '@mui/material';
import { User, userConverter } from '../models/User';
import { Collections, getDocReference, getFirestoreDocument, setFirestoreDocument } from '../utils/firestore';

export default function MainPage(props) {
    const [fullName, setFullName] = useState('');
    const [userData, setUserData] = useState(props.userData);
    const userId = props.userId;
    const mobile = props.mobile;

    function isUserExist() {
        return userData != null || userData != undefined;
    }

    async function updateUserData() {
        const userDocRef = getDocReference(Collections.Users.name, userId, Collections.Users.convertor);
        const newUserData = await getFirestoreDocument(userDocRef);
        setUserData(newUserData);
    }

    function createUserConfirmedHandler() {
        if (/^[A-Za-z]+((\s)?([A-Za-z])+)*$/.test(fullName)) {
            const userDocRef = getDocReference(Collections.Users.name, userId, Collections.Users.convertor);
            const newUserData = new User(mobile, fullName, false, [], false);
            setFirestoreDocument(userDocRef, newUserData);
            updateUserData();
        } else {
            // change to notify user
            console.log('invalid name');
        }
    }

    function renderUserReminders() {
        return <ShowReminders userId={userId} userData={userData} />;
    }

    function createUser() {
        return (
            <Box>
                <div className="center-container">
                    <div className="login-form">
                        <div className="input-container">
                            <label>Enter Full Name</label>
                            <TextField hiddenLabel size="small" onChange={event => setFullName(event.target.value)} />
                            <Button id="sign-in-button" variant="contained" onClick={createUserConfirmedHandler}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }

    return (
        <>
            {userId == '' ? (
                <Navigate to="/signup" replace={true} />
            ) : (
                <Container maxWidth="lg">{isUserExist() ? renderUserReminders() : createUser()}</Container>
            )}
        </>
    );
}
