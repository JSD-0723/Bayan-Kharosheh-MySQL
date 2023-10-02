import jwt from "jsonwebtoken";
import environment from "../config/environment";

export const createJwt = (id: number) => {
  return jwt.sign({ id }, '1234', {
    expiresIn: '1h',
  });
};
