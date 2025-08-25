import { Router } from "express";
import {
  handleCreatePayment,
  handleGetAllPayments,
  handleGetPaymentById,
  handleUpdatePayment,
  handleDeletePayment,
} from "../controllers/PaymentController";

const router = Router();

/**
 * @route   GET /api/payments
 * @desc    Obtener todos los pagos
 */
router.get("/", handleGetAllPayments);

/**
 * @route   POST /api/payments
 * @desc    Crear un nuevo pago
 */
router.post("/", handleCreatePayment);

/**
 * @route   GET /api/payments/:id
 * @desc    Obtener un pago por su ID
 */
router.get("/:id", handleGetPaymentById);

/**
 * @route   PUT /api/payments/:id
 * @desc    Actualizar un pago por su ID
 */
router.put("/:id", handleUpdatePayment);

/**
 * @route   DELETE /api/payments/:id
 * @desc    Eliminar un pago por su ID
 */
router.delete("/:id", handleDeletePayment);

export default router;
