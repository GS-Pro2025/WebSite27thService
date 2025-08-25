import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { setupAssociations } from "./config/associations";
import userRoutes from "./routes/UserRoutes";
import serviceRoutes from "./routes/ServiceRoutes";
import moveRoutes from "./routes/MoveRoutes";
import paymentRoutes from "./routes/PaymentRoutes";
import moveItemRoutes from "./routes/MoveItemRoutes";
import calendarEventRoutes from "./routes/CalendarEventRoutes";
import moveServiceRoutes from "./routes/MoveServiceRoutes";
import authRoutes from "./routes/AuthRoutes";
import personRoutes from "./routes/PersonRoutes";
import { authenticateJWT } from "./config/securityConfig";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();
setupAssociations();
// app.use(authenticateJWT);

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/moves", moveRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/move-items", moveItemRoutes);
app.use("/api/events", calendarEventRoutes);
app.use("/api/move-services", moveServiceRoutes);
app.use("/api/persons", personRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
