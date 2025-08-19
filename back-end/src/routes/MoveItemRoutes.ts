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
 * @desc    Crear un nuevo artículo
 */
router.post("/", handleCreateMoveItem);

/**
 * @route   GET /api/move-items/:id
 * @desc    Obtener un artículo específico por su ID
 */
router.get("/:id", handleGetMoveItemById);

/**
 * @route   GET /api/move-items/move/:moveId
 * @desc    Obtener TODOS los artículos de una mudanza específica
 */
router.get("/move/:moveId", handleGetAllItemsForMove);

/**
 * @route   PUT /api/move-items/:id
 * @desc    Actualizar un artículo específico
 */
router.put("/:id", handleUpdateMoveItem);

/**
 * @route   DELETE /api/move-items/:id
 * @desc    Eliminar un artículo específico
 */
router.delete("/:id", handleDeleteMoveItem);

export default router;
