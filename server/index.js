import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import { Server } from "socket.io";
import http from "http";
// Router import
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import chatRoute from "./routes/ChatRoute.js";
import messageRoute from "./routes/message.js";
// controller import
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { singleUpload } from "./middleware/multer.js";

// CONFIGURATIONS //

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE //
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes with files
app.post("/auth/register", singleUpload, register);
app.post("/posts", verifyToken, singleUpload, createPost);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

// Socket Io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:5173`, `https://wondernot.vercel.app`],
    methods: ["*"],
  },
});

// The active users state
let activeUsers = [];

io.on("connection", (socket) => {
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

// Database setup
const PORT = process.env.PORT || 6001;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Socket server connected to ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`❌ Failed to connect: ${err} `);
  });
export default app;
