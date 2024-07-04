type DayOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
const daysTranslate: Record<DayOfWeek, string> = {
    SUNDAY: "الاحد",
    MONDAY: "الاثنين",
    TUESDAY: "الثلاثاء",
    WEDNESDAY: "الاربعاء",
    THURSDAY: "الخميس",
    FRIDAY: "الجمعه",
    SATURDAY: "السبت"
};

export const translateDays = (day: DayOfWeek): string => {
    return daysTranslate[day];
}