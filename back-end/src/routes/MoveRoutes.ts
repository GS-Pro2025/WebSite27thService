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

// router.use(authenticateJWT);

/**
 * @route   POST /api/moves
 * @desc    Create a new move
 */
router.post("/", handleCreateMove);

/**
 * @route   GET /api/moves
 * @desc    Get all moves
 */
router.get("/", handleGetAllMoves);

/**
 * @route   GET /api/moves/:id
 * @desc    Get a move by its ID
 */
router.get("/:id", handleGetMoveById);

/**
 * @route   PUT /api/moves/:id
 * @desc    Update a move by its ID
 */
router.put("/:id", handleUpdateMove);

/**
 * @route   DELETE /api/moves/:id
 * @desc    Delete a move by its ID
 */
router.delete("/:id", handleDeleteMove);

export default router;
