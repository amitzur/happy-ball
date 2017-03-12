function start(server) {

    const redis = require("redis");
    const client = redis.createClient(process.env.REDIS_URL);

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    const io = require("socket.io")(server);

    io.adapter(require("socket.io-redis")({ host: 'redis-16270.c11.us-east-1-3.ec2.cloud.redislabs.com', port: 16270 }));

    io.on("connection", socket => {
        console.log("client connected");

        socket.emit("aaa", "bbb");

        socket.on("action", action => {
            socket.broadcast.emit("action", action);
        });
    });
}

module.exports = start;

