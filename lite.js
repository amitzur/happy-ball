function start(server) {

    const redis = require("redis");
    const client = redis.createClient(process.env.REDIS_URL);

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    const io = require("socket.io")(server);

    io.on("connection", socket => {
        console.log("client connected");

        socket.on("action", action => {
            socket.broadcast.emit("action", action);
        });
    });
}

module.exports = start;

