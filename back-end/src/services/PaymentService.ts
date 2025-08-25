import Payment, { PaymentAttributes } from "../models/Payment";
import Move from "../models/Move";

/**
 * Crea un nuevo pago.
 * @param data - Los datos del pago a crear.
 * @returns El pago creado.
 */
export const createPayment = async (
  data: PaymentAttributes
): Promise<Payment> => {
  try {
    const newPayment = await Payment.create(data);
    return newPayment;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw new Error("No se pudo crear el pago.");
  }
};

/**
 * Obtiene todos los pagos, incluyendo la información de la mudanza asociada.
 * @returns Un arreglo de pagos.
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
    console.error("Error al obtener los pagos:", error);
    throw new Error("No se pudieron obtener los pagos.");
  }
};

/**
 * Obtiene un pago por su ID.
 * @param paymentId - El ID del pago a obtener.
 * @returns El pago encontrado o null.
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
    console.error("Error al obtener el pago por ID:", error);
    throw new Error("No se pudo obtener el pago.");
  }
};

/**
 * Actualiza los datos de un pago.
 * @param paymentId - El ID del pago a actualizar.
 * @param updatedData - Los nuevos datos para el pago.
 * @returns El pago actualizado o null si no se encontró.
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
    console.error("Error al actualizar el pago:", error);
    throw new Error("No se pudo actualizar el pago.");
  }
};

/**
 * Elimina un pago por su ID.
 * @param paymentId - El ID del pago a eliminar.
 * @returns Verdadero si se eliminó el pago, falso en caso contrario.
 */
export const deletePayment = async (paymentId: number): Promise<boolean> => {
  try {
    const deletedRows = await Payment.destroy({
      where: { payment_id: paymentId },
    });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    throw new Error("No se pudo eliminar el pago.");
  }
};
