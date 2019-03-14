const socketio = require("socket.io");
const socketAuth = require("../middleware/socketAuth");
const io = socketio();

const socketApi = {
    io: io
};

io.use(socketAuth);

const redisAdapter = require("socket.io-redis");
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));

io.on("connection", socket => {
    console.log("user connected: " + socket.request.user.name);
});


module.exports = socketApi;