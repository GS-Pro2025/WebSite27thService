import { Request, Response } from "express";
import * as eventService from "../services/CalendarEventService";

export const handleCreateEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = await eventService.createCalendarEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllCalendarEvents();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetEventsForMove = async (req: Request, res: Response) => {
  try {
    const { moveId } = req.params;
    const events = await eventService.getEventsForMove(moveId);
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetEventById = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId))
      return res.status(400).json({ message: "Invalid event ID." });

    const event = await eventService.getCalendarEventById(eventId);
    if (!event)
      return res.status(404).json({ message: "Event not found." });

    res.status(200).json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId))
      return res.status(400).json({ message: "Invalid event ID." });

    const updatedEvent = await eventService.updateCalendarEvent(
      eventId,
      req.body
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found." });

    res.status(200).json(updatedEvent);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId))
      return res.status(400).json({ message: "Invalid event ID." });

    const success = await eventService.deleteCalendarEvent(eventId);
    if (!success)
      return res.status(404).json({ message: "Event not found." });

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
