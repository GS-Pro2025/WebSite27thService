import Service, { ServiceAttributes } from "../models/Services";

/**
 * Crea un nuevo servicio.
 * @param serviceData - Los datos del servicio a crear.
 * @returns El servicio creado.
 */
export const createService = async (
  serviceData: ServiceAttributes
): Promise<Service> => {
  try {
    const newService = await Service.create(serviceData);
    return newService;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw new Error("No se pudo crear el servicio.");
  }
};

/**
 * Obtiene todos los servicios.
 * @returns Un arreglo de servicios.
 */
export const getAllServices = async (): Promise<Service[]> => {
  try {
    const services = await Service.findAll();
    return services;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    throw new Error("No se pudieron obtener los servicios.");
  }
};

/**
 * Obtiene un servicio por su ID.
 * @param serviceId - El ID del servicio.
 * @returns El servicio encontrado o null.
 */
export const getServiceById = async (
  serviceId: number
): Promise<Service | null> => {
  try {
    const service = await Service.findByPk(serviceId);
    return service;
  } catch (error) {
    console.error("Error al obtener el servicio por ID:", error);
    throw new Error("No se pudo obtener el servicio.");
  }
};

/**
 * Actualiza los datos de un servicio.
 * @param serviceId - El ID del servicio a actualizar.
 * @param updatedData - Los nuevos datos para el servicio.
 * @returns El servicio actualizado o null si no se encontró.
 */
export const updateService = async (
  serviceId: number,
  updatedData: Partial<ServiceAttributes>
): Promise<Service | null> => {
  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return null;
    }
    await service.update(updatedData);
    return service;
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    throw new Error("No se pudo actualizar el servicio.");
  }
};

/**
 * Elimina un servicio por su ID.
 * @param serviceId - El ID del servicio a eliminar.
 * @returns Un booleano indicando si la eliminación fue exitosa.
 */
export const deleteService = async (serviceId: number): Promise<boolean> => {
  try {
    const deletedRows = await Service.destroy({
      where: { service_id: serviceId },
    });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    throw new Error("No se pudo eliminar el servicio.");
  }
};
