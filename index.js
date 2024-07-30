// Importing the required modules
const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");

// Creating the express app
const app = express();

// Using the required middlewares
app.use(cors());
app.use(express.json());

// Creating the server and the socket
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

// Routes
app.get("/", (req, res) => {
    res.send({ message: "Hello from server!" });
});

// Creating the socket connection

io.on("connection", (socket) => {
    console.log(socket.id);

    // socket.emit("send_msg", "Hello from socket server , halo!");

    socket.on("send_msg", (data) => {
        io.emit("send_msg", data);
    });

    // socket.on("disconnect", () => {
    //     console.log("User disconnected");
    // });
});

// Listening to the server
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
