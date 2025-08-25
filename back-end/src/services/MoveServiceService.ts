import MoveService, { MoveServiceAttributes } from "../models/MoveService";

/**
 * Creates a relation between a move and a service (or updates quantity if it already exists).
 * @param data - The move-service relation data.
 * @returns The created or updated move-service relation.
 */
export const createMoveService = async (
  data: MoveServiceAttributes
): Promise<MoveService> => {
  try {
    const existing = await MoveService.findOne({
      where: { move_id: data.move_id, service_id: data.service_id },
    });

    if (existing) {
      await existing.update({ quantity: data.quantity });
      return existing;
    }

    const newRelation = await MoveService.create(data);
    return newRelation;
  } catch (error) {
  console.error("Error creating MoveService:", error);
  throw new Error("Could not create relation.");
  }
};

/**
 * Gets all move-service relations.
 * @return An array of move-service relations.
 */
export const getAllMoveServices = async (): Promise<MoveService[]> => {
  try {
    return await MoveService.findAll();
  } catch (error) {
  console.error("Error getting MoveServices:", error);
  throw new Error("Could not get relations.");
  }
};

/**
 * Gets a specific relation by move_id and service_id.
 * @param moveId - The move ID.
 * @param serviceId - The service ID.
 * @return The found move-service relation or null.
 */
export const getMoveServiceByIds = async (
  moveId: string,
  serviceId: number
): Promise<MoveService | null> => {
  try {
    return await MoveService.findOne({
      where: { move_id: moveId, service_id: serviceId },
    });
  } catch (error) {
  console.error("Error getting MoveService:", error);
  throw new Error("Could not get relation.");
  }
};

/**
 * Updates an existing relation.
 * @param moveId - The move ID.
 * @param serviceId - The service ID.
 * @param updatedData - The updated move-service relation data.
 * @returns The updated move-service relation or null.
 */
export const updateMoveService = async (
  moveId: string,
  serviceId: number,
  updatedData: Partial<MoveServiceAttributes>
): Promise<MoveService | null> => {
  try {
    const relation = await MoveService.findOne({
      where: { move_id: moveId, service_id: serviceId },
    });
    if (!relation) return null;

    await relation.update(updatedData);
    return relation;
  } catch (error) {
  console.error("Error updating MoveService:", error);
  throw new Error("Could not update relation.");
  }
};

/**
 * Deletes a relation.
 * @param moveId - The move ID.
 * @param serviceId - The service ID.
 * @returns True if deleted, false if not found.
 */
export const deleteMoveService = async (
  moveId: string,
  serviceId: number
): Promise<boolean> => {
  try {
    const deletedRows = await MoveService.destroy({
      where: { move_id: moveId, service_id: serviceId },
    });
    return deletedRows > 0;
  } catch (error) {
  console.error("Error deleting MoveService:", error);
  throw new Error("Could not delete relation.");
  }
};
