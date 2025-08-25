import { Request, Response } from "express";
import * as moveItemService from "../services/MoveItemService";

export const handleCreateMoveItem = async (req: Request, res: Response) => {
  try {
    const newItem = await moveItemService.createMoveItem(req.body);
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllItemsForMove = async (req: Request, res: Response) => {
  try {
    const { moveId } = req.params;
    const items = await moveItemService.getAllItemsForMove(moveId);
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetMoveItemById = async (req: Request, res: Response) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId))
      return res.status(400).json({ message: "Invalid item ID." });

    const item = await moveItemService.getMoveItemById(itemId);
    if (!item)
      return res.status(404).json({ message: "Item not found." });

    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdateMoveItem = async (req: Request, res: Response) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId))
      return res.status(400).json({ message: "Invalid item ID." });

    const updatedItem = await moveItemService.updateMoveItem(itemId, req.body);
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found." });

    res.status(200).json(updatedItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteMoveItem = async (req: Request, res: Response) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId))
      return res.status(400).json({ message: "Invalid item ID." });

    const success = await moveItemService.deleteMoveItem(itemId);
    if (!success)
      return res.status(404).json({ message: "Item not found." });

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
