import { Router } from "express";
import {
  handleCreateMoveService,
  handleGetAllMoveServices,
  handleGetMoveServiceByIds,
  handleUpdateMoveService,
  handleDeleteMoveService,
} from "../controllers/MoveServiceController";

const router = Router();

/**
 * @route   POST /api/move-services
 * @desc    Create or update a move-service relation
 */
router.post("/", handleCreateMoveService);

/**
 * @route   GET /api/move-services
 * @desc    Get all move-service relations
 */
router.get("/", handleGetAllMoveServices);

/**
 * @route   GET /api/move-services/:moveId/:serviceId
 * @desc    Get a specific relation
 */
router.get("/:moveId/:serviceId", handleGetMoveServiceByIds);

/**
 * @route   PUT /api/move-services/:moveId/:serviceId
 * @desc    Update a specific relation
 */
router.put("/:moveId/:serviceId", handleUpdateMoveService);

/**
 * @route   DELETE /api/move-services/:moveId/:serviceId
 * @desc    Delete a specific relation
 */
router.delete("/:moveId/:serviceId", handleDeleteMoveService);

export default router;
