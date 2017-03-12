require('dotenv').config();

const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("."));

const options = Object.assign({
    port: 7000,
    lite: false
}, require("minimist")(process.argv.slice(2)));

const server = http.createServer(app);
server.listen(options.port);

// if (options.lite) {
//     console.log("running lite");
    require("./lite")(server);
// } else {
//     require("./bus-client")(server);
// }