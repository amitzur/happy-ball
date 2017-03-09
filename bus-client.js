function start(server) {
    const Bus = require("busmq");

    const options = {
        redis: [process.env.REDIS_URL],
        federate: {
            server,
            secret: "nosecret",
            path: "/bus"
        }
    };

    const bus = Bus.create(options);

    bus.on("error", err => console.error(String(err)));

    bus.on("online", () => {
        console.log("online");

        const q = bus.queue("happy-ball");
        q.on("attached", () => {
            console.log("attached to queue");
        });

        q.attach();
    });

    bus.on("offline", () => console.log("offline"));

    bus.connect();
}

module.exports = start;