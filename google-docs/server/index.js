import { Server } from "socket.io";

const PORT = process.env.PORT || 8000;

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("Connected");
});
