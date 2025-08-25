import { Router } from "express";
import {
  handleCreateMoveItem,
  handleGetAllItemsForMove,
  handleGetMoveItemById,
  handleUpdateMoveItem,
  handleDeleteMoveItem,
} from "../controllers/MoveItemController";

const router = Router();

/**
 * @route   POST /api/move-items
 * @desc    Create a new item
 */
router.post("/", handleCreateMoveItem);

/**
 * @route   GET /api/move-items/:id
 * @desc    Get a specific item by its ID
 */
router.get("/:id", handleGetMoveItemById);

/**
 * @route   GET /api/move-items/move/:moveId
 * @desc    Get ALL items for a specific move
 */
router.get("/move/:moveId", handleGetAllItemsForMove);

/**
 * @route   PUT /api/move-items/:id
 * @desc    Update a specific item
 */
router.put("/:id", handleUpdateMoveItem);

/**
 * @route   DELETE /api/move-items/:id
 * @desc    Delete a specific item
 */
router.delete("/:id", handleDeleteMoveItem);

export default router;
