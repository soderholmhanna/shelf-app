import { DateTime } from "luxon";

const calculateAge = (birthday: string) => {
    const birthDate = DateTime.fromISO(birthday);
    const now = DateTime.now();
    const age = now.diff(birthDate, 'years').years;
    return Math.floor(age);
}

export default calculateAge;
