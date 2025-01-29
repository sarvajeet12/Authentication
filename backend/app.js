const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./configs/db-config");
const errorMiddleware = require("./middlewares/error-middleware")
const cookieParser = require("cookie-parser");

// TODO: routers
const userRouter = require("./routers/user-router");
const googleRouter = require("./routers/google-router");


// TODO: tackle cors
const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
}





// TODO: middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



// TODO: connect router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", googleRouter);


// TODO: centralized error
app.use(errorMiddleware);


module.exports = { app, connectDb };