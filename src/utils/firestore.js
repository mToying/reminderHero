import { firestoreDb } from '../index';
import { doc, setDoc, collection, addDoc, getDocFromServer, updateDoc, deleteDoc } from 'firebase/firestore';
import { userConverter } from '../models/User';
import { reminderConverter } from '../models/Reminder';
import { refferalConverter } from '../models/Refferal';

export const Collections = Object.freeze({
    Users: { name: 'users', convertor: userConverter },
    Reminders: { name: 'reminders', convertor: reminderConverter },
    Refferals: { name: 'refferals', convertor: refferalConverter },
});

export function getDocReference(collection, id, dataConverter) {
    return doc(firestoreDb, collection, id).withConverter(dataConverter);
}

export function getColReference(collectionName, dataConverter) {
    return collection(firestoreDb, collectionName).withConverter(dataConverter);
}

export async function getFirestoreDocument(docRef) {
    const result = await getDocFromServer(docRef);
    return result.data();
}

export function setFirestoreDocument(docRef, data) {
    try {
        setDoc(docRef, data);
    } catch (err) {
        console.log(err);
    }
}

export async function addFirestoreDocument(docRef, data) {
    const result = await addDoc(docRef, data);
    return result.id;
}

export function updateFirestoreDocument(docRef, data) {
    updateDoc(docRef, data);
}

export function deleteFirestoreDocument(docRef) {
    deleteDoc(docRef);
}
