const isMaster = new URL(location).searchParams.has("master");
console.log(isMaster ? "I'm the master!" : "I'm your slave");
export default isMaster;