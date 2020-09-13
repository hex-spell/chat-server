const socket = io();
const messageBox = document.getElementById("message-box");
const messagesList = document.getElementById("messages-list");

const sendMessage = () => {
  const message = messageBox.value;
  if (message){
    socket.send(message);
  }
  messageBox.value = "";
};

const setMessages = (data) => {
  const newMessage = document.createElement("li");
  const newMessageContent = document.createTextNode(data);
  newMessage.appendChild(newMessageContent);
  messagesList.appendChild(newMessage);
};

const keypressEnter = (e) => {
  if (e.keyCode === 13) {
    sendMessage();
  }
};

messageBox.onkeyup = keypressEnter;

socket.on("connect", () => {
  console.log(socket.connected); // true
  socket.emit("newClient");
});
socket.on("message", (data) => setMessages(data));
socket.on("disconnect", () => {
  console.log(socket.connected); // false
});
