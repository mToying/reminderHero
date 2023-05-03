export const Month = Object.freeze({
    Jan: { index: '01', month: 'January', day: 31 },
    Feb: { index: '02', month: 'February', day: 28 },
    Mar: { index: '03', month: 'March', day: 31 },
    Apr: { index: '04', month: 'April', day: 30 },
    May: { index: '05', month: 'May', day: 31 },
    Jun: { index: '06', month: 'June', day: 30 },
    Jul: { index: '07', month: 'July', day: 31 },
    Aug: { index: '08', month: 'August', day: 31 },
    Sep: { index: '09', month: 'September', day: 30 },
    Oct: { index: '10', month: 'October', day: 31 },
    Nov: { index: '11', month: 'November', day: 30 },
    Dec: { index: '12', month: 'December', day: 31 },
});

export const Shift = {
    Morning: 'Morning',
    Afternoon: 'Afternoon',
    Evening: 'Evening',
    Night: 'Night',
};

export function getMonthByIndex(index) {
    const key = Object.keys(Month).find(val => Month[val].index === index);
    return Month[key];
}
