const  cookie = require("cookie");
const  jwt = require("jsonwebtoken");
const   User  = require("../Model/userModel.js");
const AppError = require("../Utils/appError");


const mountJoinChatEvent = (socket) => {
  socket.on("join-User", (chatId) => {
    console.log(`User joined the chat 🤝. chatId: `, chatId);
    socket.join(chatId);
  });
};



const initializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
      let token = cookies.jwt;

      if (!token) {
        token = socket.handshake.auth?.token;
      }

      if (!token) {
        throw new AppError("Un-authorized handshake. Token is missing",401);
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken?.id).select("-password  -passwordChangedAt  -passwordRestExpries -passwordRestToken");

      if (!user) {
        throw new AppError("Un-authorized handshake. Token is invalid",403);
      }

      socket.user = user;
      socket.join(user._id.toString());
      socket.emit("connectedUser");
      console.log("User connected 🗼. userId: ", user._id.toString());

      mountJoinChatEvent(socket);

      socket.on("Disconnect", () => {
        console.log("user has disconnected 🚫. userId: " + socket.user?._id);
        if (socket.user?._id) {
          socket.leave(socket.user._id);
        }
      });
    } catch (error) {
      socket.emit(
        "Error event",
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};


const emitSocketEvent = (req, roomId, event, payload) => {
  console.log(roomId)
    req.app.get("io").in(roomId).emit(event, payload);
    // io.to(room).emit('room-messages', roomMessages);
    // socket.broadcast.emit('notifications', room)
};
module.exports= {
    initializeSocketIO,
    emitSocketEvent
  };
  