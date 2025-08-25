import Payment, { PaymentAttributes } from "../models/Payment";
import Move from "../models/Move";

/**
 * Creates a new payment.
 * @param data - The payment data to create.
 * @returns The created payment.
 */
export const createPayment = async (
  data: PaymentAttributes
): Promise<Payment> => {
  try {
    const newPayment = await Payment.create(data);
    return newPayment;
  } catch (error) {
  console.error("Error creating payment:", error);
  throw new Error("Could not create payment.");
  }
};

/**
 * Gets all payments, including the associated move information.
 * @returns An array of payments.
 */
export const getAllPayments = async (): Promise<Payment[]> => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Move,
          as: "move",
          attributes: ["origin_address", "destination_address"],
        },
      ],
    });
    return payments;
  } catch (error) {
  console.error("Error getting payments:", error);
  throw new Error("Could not get payments.");
  }
};

/**
 * Gets a payment by its ID.
 * @param paymentId - The payment ID to get.
 * @returns The found payment or null.
 */
export const getPaymentById = async (
  paymentId: number
): Promise<Payment | null> => {
  try {
    const payment = await Payment.findByPk(paymentId, {
      include: [{ model: Move, as: "move" }],
    });
    return payment;
  } catch (error) {
  console.error("Error getting payment by ID:", error);
  throw new Error("Could not get payment.");
  }
};

/**
 * Updates a payment's data.
 * @param paymentId - The payment ID to update.
 * @param updatedData - The new data for the payment.
 * @returns The updated payment or null if not found.
 */
export const updatePayment = async (
  paymentId: number,
  updatedData: Partial<PaymentAttributes>
): Promise<Payment | null> => {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) return null;
    await payment.update(updatedData);
    return payment;
  } catch (error) {
  console.error("Error updating payment:", error);
  throw new Error("Could not update payment.");
  }
};

/**
 * Deletes a payment by its ID.
 * @param paymentId - The payment ID to delete.
 * @returns True if the payment was deleted, false otherwise.
 */
export const deletePayment = async (paymentId: number): Promise<boolean> => {
  try {
    const deletedRows = await Payment.destroy({
      where: { payment_id: paymentId },
    });
    return deletedRows > 0;
  } catch (error) {
  console.error("Error deleting payment:", error);
  throw new Error("Could not delete payment.");
  }
};
