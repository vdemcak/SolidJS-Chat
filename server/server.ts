const httpServer = require("http").createServer();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket: any) => {
  socket.emit("message-history", await prisma.message.findMany());

  socket.on("message", async ({ message, user }: { message: string; user: string }) => {
    await prisma.message.create({
      data: {
        message,
        user,
      },
    });
    io.emit("new-message", { message, user });
  });
});

httpServer.listen(8000, () => {
  console.log("Message server listening on *:8000");
});
