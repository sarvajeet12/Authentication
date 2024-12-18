const http = require("http");
const { app, connectDb } = require("./app");
const port = process.env.PORT || 3000;

const server = http.createServer(app);


connectDb().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})