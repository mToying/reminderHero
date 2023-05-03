import React, { useState } from 'react';
import {
    Button,
    TextField,
    Box,
    List,
    Dialog,
    DialogTitle,
    ListItem,
    ListItemText,
    Stack,
    Select,
    MenuItem,
} from '@mui/material';
import { Collections, getDocReference, deleteFirestoreDocument, updateFirestoreDocument } from '../utils/firestore';
import { arrayRemove } from 'firebase/firestore';

export default function DeleteReminder(props) {
    const { reminderId, userId, modalOnClose, isModalOpen } = props;

    const onConfirmHandler = () => {
        const reminderDocRef = getDocReference(Collections.Reminders.name, reminderId, Collections.Reminders.convertor);
        deleteFirestoreDocument(reminderDocRef);
        const userDocRef = getDocReference(Collections.Users.name, userId, null);
        updateFirestoreDocument(userDocRef, { reminders: arrayRemove(reminderId) });
        modalOnClose();
    };

    const onCloseHandler = (event, reason) => {
        if (reason && reason != 'backdropClick') {
            modalOnClose();
        }
    };

    return (
        <Dialog onClose={onCloseHandler} open={isModalOpen}>
            <DialogTitle sx={{ m: 3 }} m={1}>
                Delete this reminder ?
            </DialogTitle>
            <Stack sx={{ m: 3, p: 2 }} justifyContent="flex-end" direction="row" spacing={2}>
                <Button variant="contained" onClick={onConfirmHandler}>
                    Confirm
                </Button>
                <Button variant="contained" color="error" onClick={event => onCloseHandler(event, 'cancelClick')}>
                    Cancel
                </Button>
            </Stack>
        </Dialog>
    );
}
