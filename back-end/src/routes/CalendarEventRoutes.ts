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
 * @desc    Create a new calendar event
 */
router.post("/", handleCreateEvent);

/**
 * @route   GET /api/events
 * @desc    Get all calendar events
 */
router.get("/", handleGetAllEvents);

/**
 * @route   GET /api/events/move/:moveId
 * @desc    Get all events for a specific move
 */
router.get("/move/:moveId", handleGetEventsForMove);

/**
 * @route   GET /api/events/:id
 * @desc    Get an event by its ID
 */
router.get("/:id", handleGetEventById);

/**
 * @route   PUT /api/events/:id
 * @desc    Update an event by its ID
 */
router.put("/:id", handleUpdateEvent);

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete an event by its ID
 */
router.delete("/:id", handleDeleteEvent);

export default router;
