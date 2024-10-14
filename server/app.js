import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
    
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log("Id", socket.id);
  
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});