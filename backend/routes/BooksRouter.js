import express from "express";
import addBook from "../services/AddBook.js";
import getBooks from "../services/GetBooks.js";
import updateBook from "../services/UpdateBook.js";
import deleteBook from "../services/DeleteBook.js";

const router = express.Router();

// Adding a book to the collection
router.post("/", async (req, res) => {
    try {
        const { status, message } = await addBook(req.body.title, req.body.author, req.body.publishYear);
        res.status(status).send(message);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Getting the books based on the parameters provided from the user
router.get("/", async (req, res) => {
    try {
        var params = {};
        if (req.query.name) params.name = req.query.name;
        if (req.query.author) params.author = req.query.author;
        if (req.query.publishYear) params.publishYear = req.query.publishYear;
        const books = await getBooks(params, false);
        res.status(200).json({
            count: (books) ? books.length : 0,
            books: books,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Getting a book by its id
router.get("/:id", async (req, res) => {
    try {
        var params = { id: req.params.id }
        if (!params.id) {
            console.error("Book Id not passed.");
            res.status(400).send("BOOK_ID_NOT_FOUND");
        } else {
            const { status, message, book } = await getBooks(params, true);
            res.status(status).json({
                message: message,
                book: book || {}
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Completely updating a book - requires all the parameters irrespective of whether they are updated or not
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            console.error("Book Id not passed.");
            res.status(400).send("BOOK_ID_NOT_FOUND");
        } else {
            const { status, message } = await updateBook(id, req.body.title, req.body.author, req.body.publishYear, true);
            res.status(status).send(message);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Partially updating a book - requires all the parameters irrespective of whether they are updated or not
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            console.error("Book Id not passed.");
            res.status(400).send("BOOK_ID_NOT_FOUND");
        } else {
            const { status, message } = await updateBook(id, req.body.title, req.body.author, req.body.publishYear, false);
            res.status(status).send(message);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Deleting the book with the specified id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            console.error("Book Id not passed.");
            res.status(400).send("BOOK_ID_NOT_FOUND");
        } else {
            const { status, message } = await deleteBook(id);
            res.status(status).send(message);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

export default router;
