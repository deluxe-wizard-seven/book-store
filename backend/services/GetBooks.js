import { Book } from "../models/BookModel.js";

export default async (params, getBookById) => {
    if (getBookById) {
        const book = await Book.findById(params.id);
        if (!book) {
            console.error(`Book(id=${params.id}) is not present.`);
            return {
                status: 404,
                message: "BOOK_NOT_FOUND",
                book: {},
            }
        } else {
            return {
                status: 200,
                message: "BOOK_FOUND",
                book: book,
            }
        }
    } else {
        const books = await Book.find(params);
        return books;
    }
};
