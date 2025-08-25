import { Request, Response } from "express";
import * as moveServiceService from "../services/MoveServiceService";

export const handleCreateMoveService = async (req: Request, res: Response) => {
  try {
    const newRelation = await moveServiceService.createMoveService(req.body);
    res.status(201).json(newRelation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllMoveServices = async (req: Request, res: Response) => {
  try {
    const relations = await moveServiceService.getAllMoveServices();
    res.status(200).json(relations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetMoveServiceByIds = async (
  req: Request,
  res: Response
) => {
  try {
    const { moveId, serviceId } = req.params;
    const relation = await moveServiceService.getMoveServiceByIds(
      moveId,
      parseInt(serviceId)
    );
    if (!relation) {
      return res.status(404).json({ message: "Relación no encontrada." });
    }
    res.status(200).json(relation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdateMoveService = async (req: Request, res: Response) => {
  try {
    const { moveId, serviceId } = req.params;
    const updatedRelation = await moveServiceService.updateMoveService(
      moveId,
      parseInt(serviceId),
      req.body
    );
    if (!updatedRelation) {
      return res.status(404).json({ message: "Relación no encontrada." });
    }
    res.status(200).json(updatedRelation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteMoveService = async (req: Request, res: Response) => {
  try {
    const { moveId, serviceId } = req.params;
    const success = await moveServiceService.deleteMoveService(
      moveId,
      parseInt(serviceId)
    );
    if (!success) {
      return res.status(404).json({ message: "Relación no encontrada." });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
