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
 * @desc    Get all payments
 */
router.get("/", handleGetAllPayments);

/**
 * @route   POST /api/payments
 * @desc    Create a new payment
 */
router.post("/", handleCreatePayment);

/**
 * @route   GET /api/payments/:id
 * @desc    Get a payment by its ID
 */
router.get("/:id", handleGetPaymentById);

/**
 * @route   PUT /api/payments/:id
 * @desc    Update a payment by its ID
 */
router.put("/:id", handleUpdatePayment);

/**
 * @route   DELETE /api/payments/:id
 * @desc    Delete a payment by its ID
 */
router.delete("/:id", handleDeletePayment);

export default router;
