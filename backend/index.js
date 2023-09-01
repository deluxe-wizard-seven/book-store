import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Book Store App is listening to port : ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log("Book Store App connected to the database.");
        })
        .catch((err) => {
            console.error(err);
        });
