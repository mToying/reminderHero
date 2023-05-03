import React, { useState } from 'react';
import {
    List,
    ListItem,
    IconButton,
    ListItemText,
    Stack,
    Button,
    Container,
    Box,
    CircularProgress,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddReminder from './AddReminder';
import DeleteReminder from './DeleteReminder';
import {
    Collections,
    getDocReference,
    getColReference,
    getFirestoreDocument,
    updateFirestoreDocument,
    addFirestoreDocument,
} from '../utils/firestore';
import { getMonthByIndex, Shift } from '../utils/DateTime';
import { arrayRemove } from 'firebase/firestore';

export default function ShowReminder({ index, reminderId, userId, updateUserData }) {
    const [reminderData, setReminderData] = useState();
    const [initalValue, setInitalValue] = useState();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const getReminderData = () => {
        const reminderDocRef = getDocReference(Collections.Reminders.name, reminderId, Collections.Reminders.convertor);
        getFirestoreDocument(reminderDocRef).then(result => {
            setReminderData(result);
            const month = result.date.slice(0, 2);
            const day = result.date.slice(2, 4);
            const newInitialValue = {
                description: result.description,
                date: parseInt(day),
                month: getMonthByIndex(month),
                shift: result.shift,
            };
            setInitalValue(newInitialValue);
        });
        return (
            <Box display="flex" sx={{ border: 1, m: 1, p: 1, borderRadius: '12px', borderColor: 'primary.main' }}>
                <ListItem key={index} disablePadding>
                    <ListItemText id={`checkbox-list-label-${index}`} primary={'LOADING'} />
                    <CircularProgress sx={{ p: 1 }} />
                </ListItem>
            </Box>
        );
    };

    const updateReminderHandler = () => {
        setIsUpdateModalOpen(true);
    };

    const closeUpdateReminderHandler = async () => {
        await updateUserData();
        setIsUpdateModalOpen(false);
        getReminderData();
    };

    const deleteReminderHandler = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteReminderHandler = async () => {
        await updateUserData();
        getReminderData();
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            {reminderData && initalValue ? (
                <Box display="flex" sx={{ border: 1, m: 1, p: 1, borderRadius: '12px', borderColor: 'primary.main' }}>
                    <ListItem key={index} disablePadding>
                        <ListItemText id={`checkbox-list-label-${index}`} primary={reminderData.description} />
                        <Stack direction="row" spacing={2}>
                            <IconButton edge="end" aria-label="comments" onClick={updateReminderHandler}>
                                <EditNoteIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="comments" onClick={deleteReminderHandler}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </ListItem>
                    <AddReminder
                        id={reminderId}
                        modalOnClose={closeUpdateReminderHandler}
                        isModalOpen={isUpdateModalOpen}
                        initialValue={initalValue}
                        isUpdate={true}
                    />
                    <DeleteReminder
                        reminderId={reminderId}
                        userId={userId}
                        modalOnClose={closeDeleteReminderHandler}
                        isModalOpen={isDeleteModalOpen}
                    />
                </Box>
            ) : (
                getReminderData()
            )}
        </>
    );
}
