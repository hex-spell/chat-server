"use strict";
var socket = io();
var messageBox = document.getElementById("message-box");
var messagesList = document.getElementById("messages-list");
var sendMessage = function () {
    var message = messageBox.value;
    if (message) {
        socket.send(message);
    }
    messageBox.value = "";
};
var setMessages = function (data) {
    var newMessage = document.createElement("li");
    var newMessageContent = document.createTextNode(data);
    newMessage.appendChild(newMessageContent);
    messagesList.appendChild(newMessage);
};
var keypressEnter = function (e) {
    if (e.keyCode === 13) {
        sendMessage();
    }
};
messageBox.onkeyup = keypressEnter;
socket.on("connect", function () {
    console.log(socket.connected); // true
    socket.emit("newClient");
});
socket.on("message", function (data) { return setMessages(data); });
socket.on("disconnect", function () {
    console.log(socket.connected); // false
});
