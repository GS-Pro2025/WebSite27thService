import { nanoid } from "nanoid";
import Move, { MoveAttributes } from "../models/Move";
import Person from "../models/Person";
import MoveItem from "../models/MoveItem";
import Payment from "../models/Payment";

/**
 * Creates a new move, generating a unique ID.
 * @param moveData - The move data.
 * @returns The created move.
 */
export const createMove = async (moveData: MoveAttributes): Promise<Move> => {
  try {
    const newId = nanoid(12);
    moveData.move_id = newId;
    const newMove = await Move.create(moveData);
    return newMove;
  } catch (error) {
    console.error("Error creating move:", error);
    throw new Error("Could not create move.");
  }
};

/**
 * Gets all moves, including the associated person's data.
 * @returns An array of moves with person information.
 */
export const getAllMoves = async (): Promise<Move[]> => {
  try {
    const moves = await Move.findAll({
      include: [
        {
          model: Person,
          as: "client",
          attributes: ["person_id", "full_name", "email", "phone_number"],
        },
        {
          model: MoveItem,
          as: "items",
          attributes: ["description", "quantity"],
        },
        {
          model: Payment,
          as: "payment",
          attributes: ["payment_id", "amount", "payment_status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return moves;
  } catch (error) {
    console.error("Error getting moves:", error);
    throw new Error("Could not get moves.");
  }
  
};

/**
 * Gets a move by its ID, including the person's data.
 * @param moveId - The move ID (string).
 * @returns The found move or null.
 */
export const getMoveById = async (moveId: string): Promise<Move | null> => {
  try {
    const move = await Move.findByPk(moveId, {
      include: [
        {
          model: Person,
          as: "client",
          attributes: ["person_id", "full_name", "email", "phone_number"],
        },
        {
          model: MoveItem,
          as: "items",
          attributes: ["description", "quantity"],
        },
        {
          model: Payment,
          as: "payment",
          attributes: ["payment_id", "amount", "payment_status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return move;
  } catch (error) {
    console.error("Error getting move by ID:", error);
    throw new Error("Could not get move.");
  }
};

/**
 * Updates a move's data.
 * @param moveId - The move ID.
 * @param updatedData - The new data.
 * @returns The updated move or null.
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
    console.error("Error updating move:", error);
    throw new Error("Could not update move.");
  }
};

/**
 * Deletes a move by its ID.
 * @param moveId - The move ID.
 * @returns A boolean indicating if the deletion was successful.
 */
export const deleteMove = async (moveId: string): Promise<boolean> => {
  try {
    const deletedRows = await Move.destroy({
      where: { move_id: moveId },
    });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error deleting move:", error);
    throw new Error("Could not delete move.");
  }
};

/**
 * Gets all moves for a specific user.
 * @param userId - The ID of the logged user.
 * @returns An array of moves for that user.
 */
export const getMovesByUserId = async (userId: number): Promise<Move[]> => {
  try {
    const person = await Person.findOne({ where: { user_id: userId } });
    if (!person) {
      return [];
    }

    const moves = await Move.findAll({
      where: { person_id: person.person_id },
      include: [
        {
          model: Person,
          as: "client",
          attributes: ["person_id", "full_name", "email", "phone_number"],
        },
        {
          model: MoveItem,
          as: "items",
          attributes: ["description", "quantity"],
        },
        {
          model: Payment,
          as: "payment",
          attributes: ["payment_id", "amount", "payment_status"],
        },
      ],
    });

    return moves;
  } catch (error) {
    console.error("Error getting moves by user ID:", error);
    throw new Error("Could not get user moves.");
  }
};
