const app = require("./app");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//  store all users online
global.onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`new connexion ${socket.id}`);

  global.chaTsocket = socket;

  //store a user among online users when connected
  socket.on("add-user", (userId) => {
    onlineUsers[userId] = socket.id;
  });

  //send a message to a specific user
  socket.on("send-message", async (data) => {
    const sendUserSocket = onlineUsers[data.receiver];

    if (sendUserSocket) {
       //receive message
      socket.to(sendUserSocket).emit("receive", {
        sender: data.sender,
        conversation: data.conversation,
        text: data.text,
      });
    }
  });
 

  //send a message when create a groupe
  socket.on("first-time", (data) => {
    socket.broadcast.emit("groupe-created", data);
  });
});
