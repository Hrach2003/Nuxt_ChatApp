const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./users")();

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  socket.on("userJoined", (data, callback) => {
    if (!data.name || !data.room) {
      return callback("Something went wrong");
    }

    socket.join(data.room);

    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });

    callback({ userId: socket.id });

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
