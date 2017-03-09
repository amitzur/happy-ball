const createMiddleware = function(name) {
    createQueue.call(this, name);

    const { queues } = this;

    return ({ getState, dispatch }) => next => action => {
        const q = queues[name];
        if (q) {
            q.push(action);
        }
        return next(action);
    };
};

const listen = function(name, onMessage) {
    createQueue.call(this, name).then(q => {
        q.on("message", (message, id) => {
            console.log("got bus message [" + id + "]: ", message);
            onMessage(JSON.parse(message));
        });

        q.consume();
    });
};

const createQueue = function(name) {
    const { queues, bus } = this;
    return new Promise((resolve, reject) => {
        if (queues[name]) {
            resolve(queues[name]);
            return;
        }

        bus.queue(name, (err, q) => {
            if (err) {
                console.log("bus: error " + err);
                reject(err);
            }

            console.log("bus: q ready");
            q.on("attached", () => {
                queues[name] = q;
                resolve(q);
            });

            q.attach();
        });
    });
};

const Reflect = function(url, secret) {
    this.bus = busmq(url, secret);

    this.bus.on("online", () => {
        console.log("bus: online");
    });

    this.queues = {};
};

Reflect.prototype = {
    createMiddleware,
    listen
};

export default Reflect;