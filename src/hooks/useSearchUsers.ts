import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { User } from "../types/User.types";
import { capitaliseWord } from "../assets/helpers/capitaliseWord";

const useSearchUsers = () => {
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchUsers = async (searchQuery: string, currentUserId: string) => {
        if (!searchQuery) return;

        setLoading(true);
        setError("");

        try {
            const capitalizedQuery = capitaliseWord(searchQuery);

            const userCollection = collection(db, "users");

            const userQuery = query(
                userCollection,
                where("firstName", ">=", capitalizedQuery),
                where("firstName", "<=", capitalizedQuery + "\uf8ff")
            );

            const lastNameQuery = query(
                userCollection,
                where("lastName", ">=", capitalizedQuery),
                where("lastName", "<=", capitalizedQuery + "\uf8ff")
            );

            const locationQuery = query(
                userCollection,
                where("location", ">=", capitalizedQuery),
                where("location", "<=", capitalizedQuery + "\uf8ff")
            );

            const firstNameSnapshot = await getDocs(userQuery);
            const lastNameSnapshot = await getDocs(lastNameQuery);
            const locationSnapshot = await getDocs(locationQuery);

            const allResults = [
                ...firstNameSnapshot.docs,
                ...lastNameSnapshot.docs,
                ...locationSnapshot.docs,
            ];

            const users = allResults.map((doc) => ({
                _id: doc.id,
                id: doc.data().id,
                email: doc.data().email,
                dateJoined: doc.data().dateJoined,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                bio: doc.data().bio,
                dob: doc.data().dob,
                location: doc.data().location,
                photoUrls: doc.data().photoUrls,
                books: doc.data().books || {
                    currentlyReading: [],
                    wantToRead: [],
                    read: [],
                },
                following: doc.data().following || [],
            }));

            const filteredResults = users.filter((user) => user.id !== currentUserId);

            setResults(filteredResults);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong, try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, searchUsers };
};

export default useSearchUsers;
