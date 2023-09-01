import { Book } from "../models/BookModel.js";

export default async (id, title, author, publishYear, completeUpdation) => {

    var params = {};

    if (title) {
        params.title = title;
    } else if (completeUpdation) {
        console.error("Book(title) not present.");
        return {
            status: 400,
            message: "BOOK_TITLE_NOT_FOUND",
        }
    }

    if (author) {
        params.author = author;
    } else if (completeUpdation) {
        console.error("Book(author) not present.");
        return {
            status: 400,
            message: "BOOK_AUTHOR_NOT_FOUND",
        }
    }

    if (publishYear) {
        params.publishYear = publishYear;
    } else if (completeUpdation) {
        console.error("Book(publishYear) not present.");
        return {
            status: 400,
            message: "BOOK_PUBLISHYEAR_NOT_FOUND",
        }
    }

    const updatedBook = await Book.findByIdAndUpdate(id, params);

    if (updatedBook) {
        return {
            status: 200,
            message: "BOOK_UPDATED",
        }
    } else {
        return {
            status: 404,
            message: "BOOK_NOT_FOUND",
        }
    }
};
