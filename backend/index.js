import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import booksRouter from "./routes/BooksRouter.js";

// Configuring the environment variables
dotenv.config();

const app = express();

// Adding middlewares
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Connecting to database
mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log("Book Store App connected to the database.");
        })
        .catch((err) => {
            console.error(err);
        });

// Handling routes using Express Routers
app.use("/books", booksRouter);

// Listening at PORT
app.listen(process.env.PORT, () => {
    console.log(`Book Store App is listening to port : ${process.env.PORT}`);
});
