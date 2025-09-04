import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Person from "../models/Person";
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

  const { email, sub: google_id } = payload;

  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({
      google_id,
      email,
      role: UserRole.USER,
      password_hash: null,
    });
  } else if (!user.google_id) {
    user.google_id = google_id;
    await user.save();
  }

  const person = await Person.findOne({ where: { email } });
  if (person && !person.user_id) {
    person.user_id = user.user_id ?? null;
    await person.save();
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
