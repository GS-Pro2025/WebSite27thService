import { Router } from "express";
import {
  handleCreateEvent,
  handleGetEventsForMove,
  handleGetEventById,
  handleUpdateEvent,
  handleDeleteEvent,
  handleGetAllEvents,
} from "../controllers/CalendarEventController";

const router = Router();

/**
 * @route   POST /api/events
 * @desc    Crear un nuevo evento de calendario
 */
router.post("/", handleCreateEvent);

/**
 * @route   GET /api/events
 * @desc    Obtener todos los eventos de calendario
 */
router.get("/", handleGetAllEvents);

/**
 * @route   GET /api/events/move/:moveId
 * @desc    Obtener todos los eventos de una mudanza específica
 */
router.get("/move/:moveId", handleGetEventsForMove);

/**
 * @route   GET /api/events/:id
 * @desc    Obtener un evento por su ID
 */
router.get("/:id", handleGetEventById);

/**
 * @route   PUT /api/events/:id
 * @desc    Actualizar un evento por su ID
 */
router.put("/:id", handleUpdateEvent);

/**
 * @route   DELETE /api/events/:id
 * @desc    Eliminar un evento por su ID
 */
router.delete("/:id", handleDeleteEvent);

export default router;
