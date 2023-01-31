const fs = require("fs");
const path = require("path");

if (fs.existsSync(path.join(__dirname, "./src/storage/logs/node.access.log"))) {
	fs.unlinkSync(path.join(__dirname, "./src/storage/logs/node.access.log"));
}
if (fs.existsSync(path.join(__dirname, "./src/storage/logs/node.error.log"))) {
	fs.unlinkSync(path.join(__dirname, "./src/storage/logs/node.error.log"));
}
