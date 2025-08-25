import MoveItem, { MoveItemAttributes } from "../models/MoveItem";

/**
 * Creates a new item for a move.
 * @param data - The item data to create.
 * @returns The created item.
 */
export const createMoveItem = async (
  data: MoveItemAttributes
): Promise<MoveItem> => {
  try {
    const newItem = await MoveItem.create(data);
    return newItem;
  } catch (error) {
  console.error("Error creating item:", error);
  throw new Error("Could not create item.");
  }
};

/**
 * Gets all items for a specific move.
 * @returns An array of items for the move.
 */
export const getAllItemsForMove = async (
  moveId: string
): Promise<MoveItem[]> => {
  try {
    const items = await MoveItem.findAll({ where: { move_id: moveId } });
    return items;
  } catch (error) {
  console.error("Error getting items for move:", error);
  throw new Error("Could not get items.");
  }
};

/**
 * Gets a specific item by its ID.
 * @param itemId - The item ID to get.
 * @returns The found item or null.
 */
export const getMoveItemById = async (
  itemId: number
): Promise<MoveItem | null> => {
  try {
    const item = await MoveItem.findByPk(itemId);
    return item;
  } catch (error) {
  console.error("Error getting item by ID:", error);
  throw new Error("Could not get item.");
  }
};

/**
 * Updates an item.
 * @param itemId - The item ID to update.
 * @param updatedData - The new data for the item.
 * @returns The updated item or null if not found.
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
  console.error("Error updating item:", error);
  throw new Error("Could not update item.");
  }
};

/**
 * Deletes an item.
 * @param itemId - The item ID to delete.
 * @returns A boolean indicating if the deletion was successful.
 */
export const deleteMoveItem = async (itemId: number): Promise<boolean> => {
  try {
    const deletedRows = await MoveItem.destroy({ where: { item_id: itemId } });
    return deletedRows > 0;
  } catch (error) {
  console.error("Error deleting item:", error);
  throw new Error("Could not delete item.");
  }
};
