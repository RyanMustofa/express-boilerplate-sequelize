import path from "path";
import cluster from "cluster";
import os from "os";
import chalk from "chalk";
import process from "process";
import fs from "fs";
import util from "util";

let access = fs.createWriteStream(
		path.join(__dirname, "./src/storage/logs/node.access.log"),
		{ flags: "a" }
	),
	error = fs.createWriteStream(
		path.join(__dirname, "./src/storage/logs/node.error.log"),
		{ flags: "a" }
	);

let originalLog = console.log;
let errorLog = console.error;

console.error = function (str) {
	errorLog(str);
	error.write(util.format(str) + "\n");
	process.stderr.write(util.format(str) + "\n");
};

console.log = function (str) {
	originalLog(str);
	access.write(util.format(str) + "\n");
	process.stdout.write(util.format(str) + "\n");
};

let workers = [];
if (cluster.isPrimary) {
	console.log(`${chalk.green("[server] activated")}`);
	var cpuCount = os.cpus().length;
	console.log(`${chalk.yellow(`[cluster] forking ${cpuCount} workers now`)}`);
	for (var i = 0; i < cpuCount; i++) {
		workers.push(cluster.fork());
		workers[i].on("message", (message) => {
			console.log("[worker]", message);
		});
	}

	cluster.on("online", (worker) => {
		console.log(
			`${chalk.yellow(`[worker] listening pid : ${worker.process.pid}`)}`
		);
	});

	cluster.on("exit", (worker, code, signal) => {
		console.log(
			`${chalk.bgRed(
				`[worker] PID: ${worker.process.pid} died with code ${code} and signal: ${signal}`
			)}`
		);
		console.log(`${chalk.yellow("[worker] starting new...")}`);
		workers.push(cluster.fork());
		// Receive messages from worker process
		workers[workers.length - 1].on("message", (message) => {
			console.error(message);
		});
	});
} else {
	import("./server");
}
