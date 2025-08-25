import { Router } from "express";
import {
  handleCreateMove,
  handleGetAllMoves,
  handleGetMoveById,
  handleUpdateMove,
  handleDeleteMove,
} from "../controllers/MoveController";
import { authenticateJWT } from "../config/securityConfig";

const router = Router();

router.use(authenticateJWT);

/**
 * @route   POST /api/moves
 * @desc    Crear una nueva mudanza
 */
router.post("/", handleCreateMove);

/**
 * @route   GET /api/moves
 * @desc    Obtener todas las mudanzas
 */
router.get("/", handleGetAllMoves);

/**
 * @route   GET /api/moves/:id
 * @desc    Obtener una mudanza por su ID
 */
router.get("/:id", handleGetMoveById);

/**
 * @route   PUT /api/moves/:id
 * @desc    Actualizar una mudanza por su ID
 */
router.put("/:id", handleUpdateMove);

/**
 * @route   DELETE /api/moves/:id
 * @desc    Eliminar una mudanza por su ID
 */
router.delete("/:id", handleDeleteMove);

export default router;
