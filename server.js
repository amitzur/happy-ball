const http = require("http");
const connect = require("connect");
const serveStatic = require("serve-static");
const app = connect();

app.use(serveStatic("."));

const server = http.createServer(app);
server.listen(7000);

const Bus = require("busmq");
const options = {
    redis: ["redis://localhost:6379"],
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

bus.on("offline", () =>  console.log("offline"));

bus.connect();