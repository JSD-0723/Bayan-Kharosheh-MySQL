import express from "express";
import * as userController from "../controllers/user.controller";

const router = express.Router();

// register
router.post("/register", userController.register);

// login
router.post("/login", userController.login);

export default router;
