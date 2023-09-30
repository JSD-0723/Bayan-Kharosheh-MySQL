import express from "express";
import * as userController from "../controllers/user.controller";

const router = express.Router();

// Create a new book
router.post("/users", userController.createUser);

export default router;
