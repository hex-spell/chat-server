"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.static("public"));
var server = app.listen(3000);
var io = require("socket.io").listen(server);
io.on("connect", function (socket) {
    socket.on("message", function (data) {
        io.sockets.send(socket.client.id + " : " + data);
    });
    socket.on("newClient", function () {
        io.sockets.emit("clientConnected", socket.client.id);
    });
});
