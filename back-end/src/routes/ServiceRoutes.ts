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
 * @desc    Obtener todos los servicios
 */
router.get("/", handleGetAllServices);

/**
 * @route   POST /api/services
 * @desc    Crear un nuevo servicio
 */
router.post("/", handleCreateService);

/**
 * @route   GET /api/services/:id
 * @desc    Obtener un servicio por su ID
 */
router.get("/:id", handleGetServiceById);

/**
 * @route   PUT /api/services/:id
 * @desc    Actualizar un servicio por su ID
 */
router.put("/:id", handleUpdateService);

/**
 * @route   DELETE /api/services/:id
 * @desc    Eliminar un servicio por su ID
 */
router.delete("/:id", handleDeleteService);

export default router;
