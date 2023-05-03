import React, { useState } from 'react';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../styles.css';
import { Button, TextField, Box, Container, Input, IconButton } from '@mui/material';
import Loading from '../components/Loading';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

export default function SigninPage({ onCloseSigninPage }) {
    const [phoneNumber, setPhoneNumber] = useState();
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function signInHandler() {
        const auth = getAuth();
        auth.settings.appVerificationDisabledForTesting = true;
        const recaptchaVerifier = new RecaptchaVerifier(
            'sign-in-button',
            {
                size: 'invisible',
            },
            auth
        );
        setIsLoading(true);
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
            .then(confirmationResult => {
                toast.success('sent verification code to the given phone number', {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
                setIsMessageSent(true);
                window.confirmationResult = confirmationResult;
            })
            .catch(error =>
                toast.error('unable to send verification code to the given phone number', {
                    position: toast.POSITION.BOTTOM_LEFT,
                })
            )
            .finally(() => setIsLoading(false));
    }

    function codeConfirmedHandler() {
        setIsLoading(true);
        window.confirmationResult
            .confirm(verificationCode)
            .then(result => {
                const userId = result.user.uid;
                toast.success('login succesful', {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
                onCloseSigninPage(userId, phoneNumber);
            })
            .catch(error =>
                toast.error('unable to login', {
                    position: toast.POSITION.BOTTOM_LEFT,
                })
            )
            .finally(() => setIsLoading(false));
    }

    function getLoginOrSignUpPage() {
        return (
            <Box>
                <div className="center-container">
                    <div className="login-form">
                        <div className="input-container">
                            <label>Login or Sign Up</label>
                            <label>Phone Number</label>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                            />
                            <Button id="sign-in-button" variant="contained" onClick={signInHandler}>
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }

    function getCodeVerificationPage() {
        return (
            <Box>
                <div className="center-container">
                    <div className="login-form">
                        <div className="input-container">
                            <label>Enter Verification Code</label>
                            <TextField
                                hiddenLabel
                                size="small"
                                onChange={event => setVerificationCode(event.target.value)}
                            />
                            <Button id="sign-in-button" variant="contained" onClick={codeConfirmedHandler}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="flex-end" mt={4}>
                <Input placeholder="Enter code" inputProps={{ 'aria-label': 'search google maps' }} />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SendIcon />
                </IconButton>
            </Box>
            {isMessageSent ? getCodeVerificationPage() : getLoginOrSignUpPage()}
            <ToastContainer />
            <Loading isModalOpen={isLoading} />
        </Container>
    );
}
