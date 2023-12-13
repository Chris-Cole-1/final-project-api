import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import mongoose from "mongoose";
import routes from "./routes/routes";

const username = encodeURIComponent("hartcj2");
const password = encodeURIComponent("Starwars1977!");

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.ymjlhsq.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("failed to connect to database");
  });

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/accounts", routes);

export default app;