import express from "express";

import AuthController from "../controllers/authController.mjs";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

export default router;
