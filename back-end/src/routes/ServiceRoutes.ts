import { Router } from "express";
import {
  handleCreateService,
  handleGetAllServices,
  handleGetServiceById,
  handleUpdateService,
  handleDeleteService,
} from "../controllers/ServiceController";

const router = Router();

/**
 * @route   GET /api/services
 * @desc    Get all services
 */
router.get("/", handleGetAllServices);

/**
 * @route   POST /api/services
 * @desc    Create a new service
 */
router.post("/", handleCreateService);

/**
 * @route   GET /api/services/:id
 * @desc    Get a service by its ID
 */
router.get("/:id", handleGetServiceById);

/**
 * @route   PUT /api/services/:id
 * @desc    Update a service by its ID
 */
router.put("/:id", handleUpdateService);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete a service by its ID
 */
router.delete("/:id", handleDeleteService);

export default router;
