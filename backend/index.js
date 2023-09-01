import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Book Store App is listening to port : ${process.env.PORT}`);
});
