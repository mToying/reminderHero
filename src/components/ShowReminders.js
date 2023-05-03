import React, { useState, useMemo, useCallback } from 'react';
import { List, ListItem, IconButton, ListItemText, Stack, Button, Container, Box } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddReminder from './AddReminder';
import ShowReminder from './ShowReminder';
import {
    Collections,
    getDocReference,
    getColReference,
    getFirestoreDocument,
    updateFirestoreDocument,
    addFirestoreDocument,
} from '../utils/firestore';
import { arrayUnion } from 'firebase/firestore';
import { Refferal } from '../models/Refferal';
import { Month, Shift } from '../utils/DateTime';

export default function ShowReminders(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userId = props.userId;
    const [userData, setUserData] = useState(props.userData);
    const initialValue = { description: '', date: 1, month: Month.Jan, shift: Shift.Morning };

    const addReminderHandler = () => {
        setIsModalOpen(true);
    };

    const updateRefferal = userData => {
        if (!(userData.reminders.length || userData.isActivated)) {
            const referralColRef = getColReference(Collections.Refferals.name, Collections.Refferals.convertor);
            const newRefferalData = new Refferal(userId, false);
            addFirestoreDocument(referralColRef, newRefferalData);
        }
    };

    const updateUserData = async () => {
        setIsLoading(true);
        const updateUserData = await getFirestoreDocument(
            getDocReference(Collections.Users.name, userId, Collections.Users.convertor)
        );
        setUserData(updateUserData);
        setIsLoading(false);
    };

    const closeAddReminderHandler = async reminderId => {
        if (reminderId != '') {
            const userDocRef = getDocReference(Collections.Users.name, userId, null);
            updateFirestoreDocument(userDocRef, { reminders: arrayUnion(reminderId) });
            updateRefferal(userData);
            await updateUserData();
        }
        setIsModalOpen(false);
    };

    const renderReminder = useCallback(() => {
        return isLoading ? (
            <div>Loading</div>
        ) : (
            userData.reminders.map((value, index) => (
                <ShowReminder index={index} reminderId={value} userId={userId} updateUserData={updateUserData} />
            ))
        );
    }, [userData.reminders, isLoading]);

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="flex-end" mt={4}>
                {userData.fullName}
            </Box>
            <Box display="flex" mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlaylistAddIcon />}
                    onClick={addReminderHandler}>
                    Add Reminder
                </Button>
            </Box>
            <Box display="flex" mt={3}>
                <List sx={{ width: '100%', maxWidth: 500 }}>{renderReminder()}</List>
            </Box>
            <AddReminder
                id={null}
                modalOnClose={closeAddReminderHandler}
                isModalOpen={isModalOpen}
                initialValue={initialValue}
                isUpdate={false}
            />
        </Container>
    );
}
