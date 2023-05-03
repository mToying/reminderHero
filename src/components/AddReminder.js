import React, { useState } from 'react';
import {
    Collections,
    getDocReference,
    getColReference,
    addFirestoreDocument,
    updateFirestoreDocument,
} from '../utils/firestore';
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
import { Reminder } from '../models/Reminder';
import { Month, Shift } from '../utils/DateTime';

export default function AddReminder(props) {
    const { id, modalOnClose, isModalOpen, initialValue, isUpdate } = props;
    const [description, setDescription] = useState(initialValue.description);
    const [date, setDate] = useState(initialValue.date);
    const [month, setMonth] = useState(initialValue.month);
    const [shift, setShift] = useState(initialValue.shift);

    const onCloseHandler = (event, reason) => {
        if (reason && reason != 'backdropClick') {
            modalOnClose('');
        }
    };

    const onConfirmHandler = async event => {
        if (description == '') {
            // change to notify user
            console.log('invalid description');
        } else if (date == '' || date < 1 || date > month.day) {
            // change to notify user
            console.log('invalid date');
        } else {
            const monthDate = month.index + (date > 9 ? '' : '0') + date;
            const newReminderData = new Reminder(description, monthDate, shift);
            if (isUpdate) {
                const reminderDocRef = getDocReference(Collections.Reminders.name, id, null);
                updateFirestoreDocument(reminderDocRef, { description: description, date: monthDate, shift: shift });
                modalOnClose(id);
            } else {
                const reminderColRef = getColReference(Collections.Reminders.name, Collections.Reminders.convertor);
                const newId = await addFirestoreDocument(reminderColRef, newReminderData);
                modalOnClose(newId);
            }
        }
    };

    const monthSelectHandler = event => {
        setMonth(event.target.value);
    };

    const shiftSelectHandler = event => {
        setShift(event.target.value);
    };

    function renderShift() {
        return (
            <Box sx={{ width: 355 }}>
                <Select sx={{ width: 200 }} value={shift} onChange={shiftSelectHandler}>
                    {Object.values(Shift).map(value => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))}
                </Select>
            </Box>
        );
    }

    function renderMonth() {
        return (
            <Stack sx={{ width: 355 }} direction="row" spacing={2}>
                <Select sx={{ width: 200 }} value={month} onChange={monthSelectHandler}>
                    {Object.values(Month).map(value => (
                        <MenuItem value={value}>{value.month}</MenuItem>
                    ))}
                </Select>
                <TextField
                    sx={{ width: 100 }}
                    type="number"
                    inputProps={{ min: 1, max: month.day }}
                    onChange={event => setDate(event.target.value)}
                    value={date}
                />
            </Stack>
        );
    }

    return (
        <Dialog onClose={onCloseHandler} open={isModalOpen}>
            <DialogTitle m={3}>Add New Reminder</DialogTitle>
            <List sx={{ mr: 2, ml: 2, padding: 1, width: '100%', maxWidth: 500 }}>
                <ListItem>
                    <ListItemText sx={{ pr: 5 }}>Description</ListItemText>
                    <TextField
                        sx={{ width: 500 }}
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </ListItem>
            </List>
            <List sx={{ mr: 2, ml: 2, padding: 1, width: '100%', maxWidth: 500 }}>
                <ListItem>
                    <ListItemText sx={{ pr: 5 }}>Date</ListItemText>
                    {renderMonth()}
                </ListItem>
            </List>
            <List sx={{ mr: 2, ml: 2, padding: 1, width: '100%', maxWidth: 500 }}>
                <ListItem>
                    <ListItemText>Shift</ListItemText>
                    {renderShift()}
                </ListItem>
            </List>
            <Stack sx={{ m: 5 }} justifyContent="flex-end" direction="row" spacing={2}>
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
