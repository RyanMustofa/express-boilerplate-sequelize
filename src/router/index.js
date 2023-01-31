import express from "express";
import api from "./api";
import publics from "./public";

let router = express.Router();

router.use("/api", api);
router.use("/public", publics);

export default router;
