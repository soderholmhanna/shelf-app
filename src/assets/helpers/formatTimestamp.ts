import { Timestamp } from "@firebase/firestore";

export const formatTimestamp = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
    const formatter = new Intl.DateTimeFormat("en-UK", {
        month: "long",
        year: "numeric",
    });
    return formatter.format(date);
};