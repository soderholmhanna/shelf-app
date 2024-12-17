import axios from "axios";
import { Book } from "../components/BookshelfPreview";


const instance = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes",
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    params: {
        api_key: import.meta.env.VITE_BOOKS_API_KEY,
        language: "en-US",
    },
});

export const get = async <T>(endpoint: string) => {
    const res = await instance.get<T>(endpoint)
    return res.data;
}

export const getBook = (volumeId: string) => {
    return get<Book>(`${volumeId}/`);
};