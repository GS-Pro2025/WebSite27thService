import CalendarEvent, {
  CalendarEventAttributes,
} from "../models/CalendarEvent";

/**
 * Crea un nuevo evento de calendario.
 * @param data - Los datos del evento a crear.
 * @returns El evento de calendario creado.
 */
export const createCalendarEvent = async (
  data: CalendarEventAttributes
): Promise<CalendarEvent> => {
  try {
    const newEvent = await CalendarEvent.create(data);
    return newEvent;
  } catch (error) {
    console.error("Error al crear el evento:", error);
    throw new Error("No se pudo crear el evento.");
  }
};

/**
 * Obtiene todos los eventos de una mudanza específica.
 * @param moveId - El ID de la mudanza.
 * @returns Una lista de eventos de calendario.
 */
export const getEventsForMove = async (
  moveId: string
): Promise<CalendarEvent[]> => {
  try {
    const events = await CalendarEvent.findAll({ where: { move_id: moveId } });
    return events;
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    throw new Error("No se pudieron obtener los eventos.");
  }
};

/**
 * Obtiene todos los eventos.
 * @returns Una lista de eventos de calendario.
 */
export const getAllCalendarEvents = async (): Promise<CalendarEvent[]> => {
  try {
    return await CalendarEvent.findAll();
  } catch (error) {
    console.error("Error al obtener todos los eventos:", error);
    throw new Error("No se pudieron obtener todos los eventos.");
  }
};

/**
 * Obtiene un evento por su ID.
 * @param eventId - El ID del evento.
 * @returns El evento de calendario encontrado o null.
 */
export const getCalendarEventById = async (
  eventId: number
): Promise<CalendarEvent | null> => {
  try {
    return await CalendarEvent.findByPk(eventId);
  } catch (error) {
    console.error("Error al obtener el evento por ID:", error);
    throw new Error("No se pudo obtener el evento.");
  }
};

/**
 * Actualiza un evento.
 * @param eventId - El ID del evento a actualizar.
 * @param data - Los nuevos datos del evento.
 * @returns El evento de calendario actualizado o null.
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
    console.error("Error al actualizar el evento:", error);
    throw new Error("No se pudo actualizar el evento.");
  }
};

/**
 * Elimina un evento.
 * @param eventId - El ID del evento a eliminar.
 * @returns true si se eliminó el evento, false en caso contrario.
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
    console.error("Error al eliminar el evento:", error);
    throw new Error("No se pudo eliminar el evento.");
  }
};
