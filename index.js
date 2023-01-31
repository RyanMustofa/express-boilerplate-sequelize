import process from "process";

let NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "development") {
	import("./server");
}
if (NODE_ENV === "production") {
	import("./production");
}
