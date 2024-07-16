const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    const global = new Map();

    io.on("connection", (socket) => {
        socket.on('add-user', (userId) => {
            global.set(userId, socket.id);
        });

        socket.on('send-msg', (data) => {
            const { message, chat, receiverId } = data;
            const online = global.get(receiverId);

            if (online) {
                if (chat) {
                    socket.to(online).emit('receive-msg', { message, chat })
                } else {
                    socket.to(online).emit('receive-msg', { message })
                    socket.to(online).emit('notfiy', { count: 1, chatId: message.chatId })
                }
            }
        })
        socket.on('disconnect', () => {
            for (let [userId, socketId] of global.entries()) {
                if (socketId === socket.id) {
                    global.delete(userId);
                    break;
                }
            }
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});