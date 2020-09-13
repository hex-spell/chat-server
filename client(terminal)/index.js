let io = require("socket.io-client");
const socket = io("ws://localhost:3000");

const readline = require("readline");

socket.on("connect", () => {
  const rl = readline.createInterface(process.stdin);
  rl.on("line", (input) => socket.send(input));
});

socket.on("message", (data) => {
  console.log(data);
});
