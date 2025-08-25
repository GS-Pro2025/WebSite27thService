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
 * @desc    Crear o actualizar una relación move-service
 */
router.post("/", handleCreateMoveService);

/**
 * @route   GET /api/move-services
 * @desc    Obtener todas las relaciones move-service
 */
router.get("/", handleGetAllMoveServices);

/**
 * @route   GET /api/move-services/:moveId/:serviceId
 * @desc    Obtener una relación específica
 */
router.get("/:moveId/:serviceId", handleGetMoveServiceByIds);

/**
 * @route   PUT /api/move-services/:moveId/:serviceId
 * @desc    Actualizar una relación específica
 */
router.put("/:moveId/:serviceId", handleUpdateMoveService);

/**
 * @route   DELETE /api/move-services/:moveId/:serviceId
 * @desc    Eliminar una relación específica
 */
router.delete("/:moveId/:serviceId", handleDeleteMoveService);

export default router;
