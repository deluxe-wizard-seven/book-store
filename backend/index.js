import express from "express";
import { PORT } from "./config.js";

const app = express();

const port = process.env.PORT || PORT;

app.listen(port, () => {
    console.log(`Book Store App is listening to port : ${port}`);
});
