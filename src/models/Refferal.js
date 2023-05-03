export class Refferal {
    constructor(userId, isRefferalSent) {
        this.userId = userId;
        this.isRefferalSent = isRefferalSent;
    }
}

export const refferalConverter = {
    toFirestore: refferal => {
        return {
            userId: refferal.userId,
            isRefferalSent: refferal.isRefferalSent,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Refferal(data.userId, data.isRefferalSent)
    },
};
