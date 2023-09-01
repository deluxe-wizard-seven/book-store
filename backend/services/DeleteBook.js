import { Book } from "../models/BookModel.js";

export default async (id) => {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (deletedBook) {
        return {
            status: 200,
            message: "BOOK_DELETED",
        }
    } else {
        return {
            status: 404,
            message: "BOOK_NOT_FOUND",
        }
    }
};
