import { Book } from "../models/BookModel.js";

export default async (title, author, publishYear) => {
    if (!title) {
        console.error("Book(title) not present.");
        return {
            status: 400,
            message: "BOOK_TITLE_NOT_FOUND",
        }
    } else if (!author) {
        console.error("Book(author) not present.");
        return {
            status: 400,
            message: "BOOK_AUTHOR_NOT_FOUND",
        }
    } else if (!publishYear) {
        console.error("Book(publishYear) not present.");
        return {
            status: 400,
            message: "BOOK_PUBLISHYEAR_NOT_FOUND",
        }
    } else {
        const newBook = await Book.create({ title, author, publishYear });
        if (newBook) {
            return {
                status: 200,
                message: newBook,
            }
        } else {
            console.error("Book is not added to the collection.");
            return {
                status: 400,
                message: "BOOK_NOT_CREATED",
            }
        }
    }
};
