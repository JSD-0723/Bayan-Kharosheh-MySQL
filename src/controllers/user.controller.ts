import { Request, Response } from "express";

import User from "../models/user.models";
import userSchema from "../validators/userValidator";
import { createJwt } from "../utils/createJwt";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    // Validate the request body using the userSchema
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create a new user in the database
    const result = await User.create(value);
    if (!result) {
      return res.status(500).json({ error: "Error creating user" });
    }

    // Generate a JWT token for the newly created user
    const token = createJwt(result.id);
    if (!token) {
      return res.status(500).json({ error: "Error creating token" });
    }

    // Respond with a success message and the token
    res.status(201).json({ status: 201, message: "User created", token });
  } catch (error) {
    // Handle unexpected errors and respond with an internal server error
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login an existing user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate the email and password using the userSchema
    const { error } = userSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Find the user by email in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check if the provided password matches the stored password (assuming it's plain text)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If email and password are valid, generate a JWT token
    const token = createJwt(user.id);
    if (!token) {
      return res.status(500).json({ error: "Error creating token" });
    }

    // Respond with a success message and the token
    res.status(200).json({ status: 200, message: "User logged in", token });
  } catch (error) {
    // Handle unexpected errors and respond with an internal server error
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
