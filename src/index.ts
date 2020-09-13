import { Socket } from "socket.io";
import { Application } from "express";
const express = require("express");
const app: Application = express();

app.use(express.static("public"));

const server = app.listen(process.env.PORT || 3000);

const io = require("socket.io").listen(server);

io.on("connect", (socket: Socket) => {
  socket.on("message", (data: string) => {
    io.sockets.send(`${socket.client.id} : ${data}`);
  });
  socket.on("newClient", () => {
    io.sockets.emit("clientConnected",socket.client.id);
  });
});
