import Service, { ServiceAttributes } from "../models/Services";

/**
 * Creates a new service.
 * @param serviceData - The service data to create.
 * @returns The created service.
 */
export const createService = async (
  serviceData: ServiceAttributes
): Promise<Service> => {
  try {
    const newService = await Service.create(serviceData);
    return newService;
  } catch (error) {
  console.error("Error creating service:", error);
  throw new Error("Could not create service.");
  }
};

/**
 * Gets all services.
 * @returns An array of services.
 */
export const getAllServices = async (): Promise<Service[]> => {
  try {
    const services = await Service.findAll();
    return services;
  } catch (error) {
  console.error("Error getting services:", error);
  throw new Error("Could not get services.");
  }
};

/**
 * Gets a service by its ID.
 * @param serviceId - The service ID.
 * @returns The found service or null.
 */
export const getServiceById = async (
  serviceId: number
): Promise<Service | null> => {
  try {
    const service = await Service.findByPk(serviceId);
    return service;
  } catch (error) {
  console.error("Error getting service by ID:", error);
  throw new Error("Could not get service.");
  }
};

/**
 * Updates a service's data.
 * @param serviceId - The service ID to update.
 * @param updatedData - The new data for the service.
 * @returns The updated service or null if not found.
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
  console.error("Error updating service:", error);
  throw new Error("Could not update service.");
  }
};

/**
 * Deletes a service by its ID.
 * @param serviceId - The service ID to delete.
 * @returns A boolean indicating if the deletion was successful.
 */
export const deleteService = async (serviceId: number): Promise<boolean> => {
  try {
    const deletedRows = await Service.destroy({
      where: { service_id: serviceId },
    });
    return deletedRows > 0;
  } catch (error) {
  console.error("Error deleting service:", error);
  throw new Error("Could not delete service.");
  }
};
