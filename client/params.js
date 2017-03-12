const urlParams = new URL(location).searchParams;

const isMaster = urlParams.has("master");
const isLite = urlParams.has("lite");

const params = {
    isMaster,
    isLite
};

console.log("params: ", params);

export default params;