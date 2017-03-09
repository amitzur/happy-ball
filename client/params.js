const params = new URL(location).searchParams;

const isMaster = params.has("master");
const isLite = params.has("lite");

console.log(isMaster ? "I'm the master!" : "I'm your slave");

export default {
    isMaster,
    isLite
};