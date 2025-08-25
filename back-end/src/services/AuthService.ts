import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { OAuth2Client } from "google-auth-library";
import { UserRole } from "../enums/enums";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginUser = async (email: string, password_hash: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password_hash,
    user.password_hash!
  );
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    userId: user.user_id,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { user, token };
};

export const loginWithGoogle = async (googleToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload || !payload.email) {
    throw new Error("Invalid Google token");
  }

  const { email, name, sub: google_id } = payload;

  let user = await User.findOne({ where: { google_id } });

  if (!user) {
    [user] = await User.findOrCreate({
      where: { email },
      defaults: {
        google_id: google_id,
        email: email,
        role: UserRole.USER,
      },
    });
  }

  const appPayload = {
    userId: user.user_id,
    role: user.role,
  };
  const token = jwt.sign(appPayload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { user, token };
};
