import { Timestamp } from "firebase/firestore";
import { Book } from "./Book.types";

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
    id: string;
    email: string;
    dateJoined: Timestamp;
    firstName?: string;
    lastName?: string;
    bio?: string;
    dob?: string;
    location?: string;
    photoUrls?: string;
    books: {
        currentlyReading: string[] | [];
        wantToRead: string[] | [];
        read: string[] | [];
    }
    following: string[];
};

export type NewUser = Omit<User, "_id">;

export type Post = {
    userId: string;
    type: "Currently reading" | "Want to read" | "Read";
    bookId: string;
}

export type PostWithBook = {
    userId: string;
    type: "Currently reading" | "Want to read" | "Read";
    bookId: string;
    book?: Book;
};