import express from "express";
import chalk from "chalk";
import process from "process";
import router from "./src/router";

let app = express();
app.use(router);
let server = app.listen(8000, "0.0.0.0", () => {
	console.log(
		`${chalk.green(
			"[app] " + (process.env.APP_NAME || "Restful API") + " ready on " + 8000
		)}`
	);
});
process.on("uncaughtException", (err) => {
	console.log(chalk.bgRed("UNCAUGHT EXCEPTION! Shutting Down..."));
	console.error("uncaughtException Err", err);
	console.error("uncaughtException Stack::", err.stack);
	server.close(() => {
		process.exit(1);
	});
});

process.on("unhandledRejection", (err) => {
	console.log(chalk.bgRed("UNCAUGHT REJECTION! Shutting Down..."));
	console.error(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

process.on("SIGTERM", (err) => {
	console.log("SIGTERM RECEIVED. Shutting down gracefully");
	console.error(err);
	server.close(() => {
		process.exit(1);
	});
});
