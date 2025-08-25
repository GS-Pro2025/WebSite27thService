import CalendarEvent, {
  CalendarEventAttributes,
} from "../models/CalendarEvent";

/**
 * Creates a new calendar event.
 * @param data - The event data to create.
 * @returns The created calendar event.
 */
export const createCalendarEvent = async (
  data: CalendarEventAttributes
): Promise<CalendarEvent> => {
  try {
    const newEvent = await CalendarEvent.create(data);
    return newEvent;
  } catch (error) {
  console.error("Error creating event:", error);
  throw new Error("Could not create event.");
  }
};

/**
 * Gets all events for a specific move.
 * @param moveId - The move ID.
 * @returns A list of calendar events.
 */
export const getEventsForMove = async (
  moveId: string
): Promise<CalendarEvent[]> => {
  try {
    const events = await CalendarEvent.findAll({ where: { move_id: moveId } });
    return events;
  } catch (error) {
  console.error("Error getting events:", error);
  throw new Error("Could not get events.");
  }
};

/**
 * Gets all events.
 * @returns A list of calendar events.
 */
export const getAllCalendarEvents = async (): Promise<CalendarEvent[]> => {
  try {
    return await CalendarEvent.findAll();
  } catch (error) {
  console.error("Error getting all events:", error);
  throw new Error("Could not get all events.");
  }
};

/**
 * Gets an event by its ID.
 * @param eventId - The event ID.
 * @returns The found calendar event or null.
 */
export const getCalendarEventById = async (
  eventId: number
): Promise<CalendarEvent | null> => {
  try {
    return await CalendarEvent.findByPk(eventId);
  } catch (error) {
  console.error("Error getting event by ID:", error);
  throw new Error("Could not get event.");
  }
};

/**
 * Updates an event.
 * @param eventId - The event ID to update.
 * @param data - The new event data.
 * @returns The updated calendar event or null.
 */
export const updateCalendarEvent = async (
  eventId: number,
  data: Partial<CalendarEventAttributes>
): Promise<CalendarEvent | null> => {
  try {
    const event = await CalendarEvent.findByPk(eventId);
    if (!event) return null;
    await event.update(data);
    return event;
  } catch (error) {
  console.error("Error updating event:", error);
  throw new Error("Could not update event.");
  }
};

/**
 * Deletes an event.
 * @param eventId - The event ID to delete.
 * @returns true if the event was deleted, false otherwise.
 */
export const deleteCalendarEvent = async (
  eventId: number
): Promise<boolean> => {
  try {
    const deletedRows = await CalendarEvent.destroy({
      where: { event_id: eventId },
    });
    return deletedRows > 0;
  } catch (error) {
  console.error("Error deleting event:", error);
  throw new Error("Could not delete event.");
  }
};
