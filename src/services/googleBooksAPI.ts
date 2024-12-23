import axios from "axios";
import { Book, SearchBooks } from "../types/Book.types";


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

export const getBooks = async (ids: string[]) => {
    if (!ids || ids.length === 0) {
        return [];
    }
    const promises = ids.map((id) => {
        return getBook(id)
    });

    const values = await Promise.all(promises)
    return values;
}

export const searchBooks = async (query: string) => {
    const queryString = encodeURIComponent(query);
    const endpoint = `?q=${queryString}`;
    console.log("Requesting endpoint:", endpoint);
    const response = await get<SearchBooks>(endpoint);
    console.log("API Response:", response);
    return response;
};