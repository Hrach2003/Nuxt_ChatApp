const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const User = require("./models/users");
const Room = require("./models/room");

require("dotenv/config");
const m = (name, text, id) => ({ name, text, id });

//connect to DataBase
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("DB connected");
  }
);

io.on("connection", socket => {
  socket.on("userJoined", async (data, callback) => {
    if (!data.name || !data.room) {
      return callback("Something went wrong");
    }
    // add room if we need
    const userRoom = Room.findOne({ name: data.name });
    // console.log(userRoom);
    if (userRoom) {
      socket.join(data.room);
      userRoom.users.push(data.name);
    } else {
      const newRoom = new Room({
        name: data.room,
        users: [...users, data.name],
        messages: []
      });
      await newRoom.save();
    }

    // add new user in DB
    await User.remove({ socketID: socket.id });
    const user = new User({
      socketID: socket.id,
      name: data.name,
      room: data.room
    });
    try {
      callback({ userId: socket.id });
      await user.save();
    } catch (error) {
      console.log(error);
    }

    io.to(data.room).emit("updateUsers", users.getByRoom(data.room));
    socket.emit("newMessage", m("admin", `Welcome ${data.name}!`));
    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `${data.name} joined.`));
    socket.on("createMessage", (data, callback) => {
      if (!data.text) {
        return callback("Text");
      }
      const user = users.get(data.id);
      if (user) {
        io.to(user.room).emit("newMessage", m(user.name, data.text, data.id));
      }
      callback();
    });

    socket.on("userLeft", (id, callback) => {
      const user = users.remove(id);
      if (user) {
        io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
        io.to(user.room).emit(
          "newMessage",
          m("admin", `${user.name} left the room.`)
        );
      }
      callback();
    });

    socket.on("disconnect", () => {
      const user = users.remove(socket.id);
      if (user) {
        io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
        io.to(user.room).emit(
          "newMessage",
          m("admin", `${user.name} left the room.`)
        );
      }
    });
  });
});

module.exports = {
  app,
  server
};
