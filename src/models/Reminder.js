export class Reminder {
    constructor(description, date, shift) {
        this.description = description;
        this.date = date;
        this.shift = shift;
    }
}

export const reminderConverter = {
    toFirestore: reminder => {
        return { description: reminder.description, date: reminder.date, shift: reminder.shift };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Reminder(data.description, data.date, data.shift);
    },
};
