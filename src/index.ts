import { Socket } from "socket.io";

const io = require("socket.io")(3000);

io.on("connect", (socket: Socket) => {
  socket.on("message", (data: string) => {
    socket.broadcast.send(`${socket.client.id} : ${data}`);
  });
});
