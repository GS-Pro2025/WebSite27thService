import { Request, Response } from "express";
import * as paymentService from "../services/PaymentService";

export const handleCreatePayment = async (req: Request, res: Response) => {
  try {
    const newPayment = await paymentService.createPayment(req.body);
    res.status(201).json(newPayment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json(payments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetPaymentById = async (req: Request, res: Response) => {
  try {
    const paymentId = parseInt(req.params.id);
    if (isNaN(paymentId))
      return res.status(400).json({ message: "ID de pago inválido." });

    const payment = await paymentService.getPaymentById(paymentId);
    if (!payment)
      return res.status(404).json({ message: "Pago no encontrado." });

    res.status(200).json(payment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdatePayment = async (req: Request, res: Response) => {
  try {
    const paymentId = parseInt(req.params.id);
    if (isNaN(paymentId))
      return res.status(400).json({ message: "ID de pago inválido." });

    const updatedPayment = await paymentService.updatePayment(
      paymentId,
      req.body
    );
    if (!updatedPayment)
      return res.status(404).json({ message: "Pago no encontrado." });

    res.status(200).json(updatedPayment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeletePayment = async (req: Request, res: Response) => {
  try {
    const paymentId = parseInt(req.params.id);
    if (isNaN(paymentId))
      return res.status(400).json({ message: "ID de pago inválido." });

    const success = await paymentService.deletePayment(paymentId);
    if (!success)
      return res.status(404).json({ message: "Pago no encontrado." });

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
