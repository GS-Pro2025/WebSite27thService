import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { permissions } from "./permissions";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path.startsWith("/api/auth/login") ||
    req.path.startsWith("/api/auth/google") ||
    (req.method === "POST" && req.path === "/api/moves")||
    req.path.startsWith("/api/persons") ||
    req.path.startsWith("/api/move-items") ||
    req.path.startsWith("/api/users")
  ) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;

    const method = req.method;
    const baseUrl = req.baseUrl;
    const path = req.route?.path ?? "";
    const key = `${method} ${baseUrl}${path}`;

    const allowedRoles = permissions[key];

    if (allowedRoles && !allowedRoles.includes((decoded as any).role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
