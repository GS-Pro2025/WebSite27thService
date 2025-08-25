import { nanoid } from "nanoid";
import Move, { MoveAttributes } from "../models/Move";
import User from "../models/User";

/**
 * Crea una nueva mudanza, generando un ID único.
 * @param moveData - Los datos de la mudanza.
 * @returns La mudanza creada.
 */
export const createMove = async (moveData: MoveAttributes): Promise<Move> => {
  try {
    const newId = nanoid(12);
    moveData.move_id = newId;
    const newMove = await Move.create(moveData);
    return newMove;
  } catch (error) {
    console.error("Error al crear la mudanza:", error);
    throw new Error("No se pudo crear la mudanza.");
  }
};

/**
 * Obtiene todas las mudanzas, incluyendo los datos del cliente asociado.
 * @returns Un arreglo de mudanzas con la información del cliente.
 */
export const getAllMoves = async (): Promise<Move[]> => {
  try {
    const moves = await Move.findAll({
      include: [
        {
          model: User,
          as: "client",
          attributes: ["user_id", "full_name", "email"],
        },
      ],
    });
    return moves;
  } catch (error) {
    console.error("Error al obtener las mudanzas:", error);
    throw new Error("No se pudieron obtener las mudanzas.");
  }
};

/**
 * Obtiene una mudanza por su ID, incluyendo los datos del cliente.
 * @param moveId - El ID de la mudanza (string).
 * @returns La mudanza encontrada o null.
 */
export const getMoveById = async (moveId: string): Promise<Move | null> => {
  try {
    const move = await Move.findByPk(moveId, {
      include: [
        {
          model: User,
          as: "client",
          attributes: ["user_id", "full_name", "email"],
        },
      ],
    });
    return move;
  } catch (error) {
    console.error("Error al obtener la mudanza por ID:", error);
    throw new Error("No se pudo obtener la mudanza.");
  }
};

/**
 * Actualiza los datos de una mudanza.
 * @param moveId - El ID de la mudanza.
 * @param updatedData - Los nuevos datos.
 * @returns La mudanza actualizada o null.
 */
export const updateMove = async (
  moveId: string,
  updatedData: Partial<MoveAttributes>
): Promise<Move | null> => {
  try {
    const move = await Move.findByPk(moveId);
    if (!move) {
      return null;
    }
    await move.update(updatedData);
    return move;
  } catch (error) {
    console.error("Error al actualizar la mudanza:", error);
    throw new Error("No se pudo actualizar la mudanza.");
  }
};

/**
 * Elimina una mudanza por su ID.
 * @param moveId - El ID de la mudanza.
 * @returns Un booleano indicando si la eliminación fue exitosa.
 */
export const deleteMove = async (moveId: string): Promise<boolean> => {
  try {
    const deletedRows = await Move.destroy({
      where: { move_id: moveId },
    });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error al eliminar la mudanza:", error);
    throw new Error("No se pudo eliminar la mudanza.");
  }
};
