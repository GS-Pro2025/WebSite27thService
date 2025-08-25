import MoveService, { MoveServiceAttributes } from "../models/MoveService";

/**
 * Crea una relación entre una mudanza y un servicio (o actualiza cantidad si ya existe).
 * @param data - Los datos de la relación move-service.
 * @returns La relación move-service creada o actualizada.
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
    console.error("Error al crear MoveService:", error);
    throw new Error("No se pudo crear la relación.");
  }
};

/**
 * Obtiene todas las relaciones move-services.
 * @return Un arreglo de relaciones move-services.
 */
export const getAllMoveServices = async (): Promise<MoveService[]> => {
  try {
    return await MoveService.findAll();
  } catch (error) {
    console.error("Error al obtener MoveServices:", error);
    throw new Error("No se pudieron obtener las relaciones.");
  }
};

/**
 * Obtiene una relación específica por move_id y service_id.
 * @param moveId - El ID de la mudanza.
 * @param serviceId - El ID del servicio.
 * @return La relación move-service encontrada o null.
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
    console.error("Error al obtener MoveService:", error);
    throw new Error("No se pudo obtener la relación.");
  }
};

/**
 * Actualiza una relación existente.
 * @param moveId - El ID de la mudanza.
 * @param serviceId - El ID del servicio.
 * @param updatedData - Los datos actualizados de la relación move-service.
 * @returns La relación move-service actualizada o null.
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
    console.error("Error al actualizar MoveService:", error);
    throw new Error("No se pudo actualizar la relación.");
  }
};

/**
 * Elimina una relación.
 * @param moveId - El ID de la mudanza.
 * @param serviceId - El ID del servicio.
 * @returns Verdadero si se eliminó, falso si no se encontró.
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
    console.error("Error al eliminar MoveService:", error);
    throw new Error("No se pudo eliminar la relación.");
  }
};
