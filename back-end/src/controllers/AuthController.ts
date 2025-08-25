import { Request, Response } from "express";
import { loginUser } from "../services/AuthService";
import { loginWithGoogle } from "../services/AuthService";

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password_hash } = req.body;
    if (!email || !password_hash) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos." });
    }

    const { user, token } = await loginUser(email, password_hash);
    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
export const handleGoogleLogin = async (req: Request, res: Response) => {
  try {
    const { token: googleToken } = req.body;
    if (!googleToken) {
      return res.status(400).json({ message: "Token de Google es requerido." });
    }

    const { user, token } = await loginWithGoogle(googleToken);

    res.status(200).json({
      message: "Login con Google exitoso",
      token,
      user: {},
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
