const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");


// *Tackle cors
// TODO: tackle cors

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
}

// middleware
app.use(cors(corsOption));


app.get("/", (req, resp) => {
    resp.json("hello world");
});

module.exports = app;