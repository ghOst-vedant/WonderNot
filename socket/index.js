import http from "http";
import { Server as socketIoServer } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
const server = http.createServer();

const io = new socketIoServer(server, {
  cors: {
    origin: "https://wondernot.vercel.app/",
    methods: ["*"],
    // allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  //Add new User
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);

    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});
const SOCKET_SERVER = process.env.SOCKET_SERVER;

server.listen(SOCKET_SERVER, () => {
  console.log(`✅ ${SOCKET_SERVER} Socket Working.....`);
});
