export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        imageLinks: {
            thumbnail: string;
            medium: string;
            large: string;
        };
        authors: string[];
        categories: string[];
        description: string;
        language: string;
        pageCount: number;
        publisher: string;
        subtitle: string;
        averageRating: number;
    };
}