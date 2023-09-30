import { Request, Response } from "express";
import User from "../models/user.models";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Error creating book" });
  }
};
