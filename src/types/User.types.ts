import { Timestamp } from "firebase/firestore";

export type SignUpType = {
    firstName: string;
    lastName: string;
    dateJoined: Timestamp;
    email: string;
    bio: string;
    dob: string;
    photos: FileList;
    location: string;
    password: string;
    confirmPassword: string;
};

export type LoginType = {
    email: string;
    password: string;
};

export type UpdateProfileType = {
    firstName: string;
    lastName: string;
    dateJoined: Timestamp;
    photos: FileList;
    bio: string;
    dob: string;
    email: string;
    location: string;
    password: string;
    confirmPassword: string;
};

export type User = {
    _id: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    dob?: string;
    location?: string;
    dateJoined: Timestamp;
    photoUrls?: string;
    email: string;
};

export type NewUser = Omit<User, "_id">;
