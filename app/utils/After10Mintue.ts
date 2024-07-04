export function isWithin10Minutes(targetTime: string) {
    const timeParts = targetTime.split(' ');
    const time = timeParts[0].split(':').map(Number);
    const period = timeParts[1];

    let targetHours: any = time[0];
    const targetMinutes: any = time[1];

    // Convert to 24-hour format
    if (period === 'PM' && targetHours !== 12) {
        targetHours += 12;
    } else if (period === 'AM' && targetHours === 12) {
        targetHours = 0;
    }

    const targetDate: any = new Date();
    targetDate.setHours(parseInt(targetHours, 10));
    targetDate.setMinutes(parseInt(targetMinutes, 10));
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);

    const nowDate: any = new Date();
    nowDate.setSeconds(0);
    nowDate.setMilliseconds(0);

    const difference = Math.abs(nowDate - targetDate);
    const tenMinutesInMillis = 10 * 60 * 1000;

    return difference <= tenMinutesInMillis;
}