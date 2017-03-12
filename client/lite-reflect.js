const LiteReflect = function() {
    console.log("lite reflect");
    this.socket = io();
};

LiteReflect.prototype = {
    createMiddleware(name) {
        return ({ getState, dispatch }) => next => action => {
            this.socket.emit("action", action);

            return next(action);
        };
    },

    listen(name, onMessage) {
        this.socket.on("action", action => {
            console.log("got action from server:", action);
            onMessage(action);
        });
    }
};

export default LiteReflect;