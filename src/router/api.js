import express from "express";

let router = express();

router.get("/", (req, res) => {
	return res.send({
		status: true,
		message: "api",
	});
});

export default router;
