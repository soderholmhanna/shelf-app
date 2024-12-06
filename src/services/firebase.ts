import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
    CollectionReference,
    DocumentData,
    collection,
    getFirestore,
} from "firebase/firestore";
import { NewUser, User } from "../types/User.types";

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth Instance
export const auth = getAuth(app);

// Firestore Instance
export const db = getFirestore(app);

// Storage Instance
export const storage = getStorage(app);

// Helper to add type to collection references
const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>;
};

export const establishmentCol =
    createCollection<Establishment>("establishments");
export const newEstablishmentCol =
    createCollection<NewEstablishment>("establishments");

export const suggestionsCol = createCollection<Establishment>("suggestions");
export const newSuggestionsCol =
    createCollection<NewEstablishment>("suggestions");

export const usersCol = createCollection<User>("users");
export const newUsersCol = createCollection<NewUser>("users");

export default app;
