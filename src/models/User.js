export class User {
    constructor(mobile, fullName, isActivated, reminders, referralGenerated) {
        this.mobile = mobile;
        this.fullName = fullName;
        this.isActivated = isActivated;
        this.reminders = reminders;
        this.referralGenerated = referralGenerated;
    }
}
export const userConverter = {
    toFirestore: user => {
        return {
            mobile: user.mobile,
            fullName: user.fullName,
            isActivated: user.isActivated,
            reminders: user.reminders,
            referralGenerated: user.referralGenerated,
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.mobile, data.fullName, data.isActivated, data.reminders, data.referralGenerated);
    },
};
