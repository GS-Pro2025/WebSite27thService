import MoveItem, { MoveItemAttributes } from "../models/MoveItem";

/**
 * Crea un nuevo artículo para una mudanza.
 * @param data - Los datos del artículo a crear.
 * @returns El artículo creado.
 */
export const createMoveItem = async (
  data: MoveItemAttributes
): Promise<MoveItem> => {
  try {
    const newItem = await MoveItem.create(data);
    return newItem;
  } catch (error) {
    console.error("Error al crear el artículo:", error);
    throw new Error("No se pudo crear el artículo.");
  }
};

/**
 * Obtiene todos los artículos de una mudanza específica.
 * @returns Un arreglo de artículos de la mudanza.
 */
export const getAllItemsForMove = async (
  moveId: string
): Promise<MoveItem[]> => {
  try {
    const items = await MoveItem.findAll({ where: { move_id: moveId } });
    return items;
  } catch (error) {
    console.error("Error al obtener los artículos de la mudanza:", error);
    throw new Error("No se pudieron obtener los artículos.");
  }
};

/**
 * Obtiene un artículo específico por su ID.
 * @param itemId - El ID del artículo a obtener.
 * @returns El artículo encontrado o null.
 */
export const getMoveItemById = async (
  itemId: number
): Promise<MoveItem | null> => {
  try {
    const item = await MoveItem.findByPk(itemId);
    return item;
  } catch (error) {
    console.error("Error al obtener el artículo por ID:", error);
    throw new Error("No se pudo obtener el artículo.");
  }
};

/**
 * Actualiza un artículo.
 * @param itemId - El ID del artículo a actualizar.
 * @param updatedData - Los nuevos datos para el artículo.
 * @returns El artículo actualizado o null si no se encontró.
 */
export const updateMoveItem = async (
  itemId: number,
  updatedData: Partial<MoveItemAttributes>
): Promise<MoveItem | null> => {
  try {
    const item = await MoveItem.findByPk(itemId);
    if (!item) return null;
    await item.update(updatedData);
    return item;
  } catch (error) {
    console.error("Error al actualizar el artículo:", error);
    throw new Error("No se pudo actualizar el artículo.");
  }
};

/**
 * Elimina un artículo.
 * @param itemId - El ID del artículo a eliminar.
 * @returns Un booleano indicando si la eliminación fue exitosa.
 */
export const deleteMoveItem = async (itemId: number): Promise<boolean> => {
  try {
    const deletedRows = await MoveItem.destroy({ where: { item_id: itemId } });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error al eliminar el artículo:", error);
    throw new Error("No se pudo eliminar el artículo.");
  }
};
