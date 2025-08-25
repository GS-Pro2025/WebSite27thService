import { Request, Response } from "express";
import * as serviceService from "../services/ServiceService";

export const handleCreateService = async (req: Request, res: Response) => {
  try {
    const newService = await serviceService.createService(req.body);
    res.status(201).json(newService);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetServiceById = async (req: Request, res: Response) => {
  try {
    const serviceId = parseInt(req.params.id);
    if (isNaN(serviceId)) {
      return res.status(400).json({ message: "Invalid service ID." });
    }
    const service = await serviceService.getServiceById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }
    res.status(200).json(service);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdateService = async (req: Request, res: Response) => {
  try {
    const serviceId = parseInt(req.params.id);
    if (isNaN(serviceId)) {
      return res.status(400).json({ message: "Invalid service ID." });
    }
    const updatedService = await serviceService.updateService(
      serviceId,
      req.body
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found." });
    }
    res.status(200).json(updatedService);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteService = async (req: Request, res: Response) => {
  try {
    const serviceId = parseInt(req.params.id);
    if (isNaN(serviceId)) {
      return res.status(400).json({ message: "Invalid service ID." });
    }
    const success = await serviceService.deleteService(serviceId);
    if (!success) {
      return res.status(404).json({ message: "Service not found." });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
