import { Request, Response } from "express";
import * as moveService from "../services/MoveService";

export const handleCreateMove = async (req: Request, res: Response) => {
  try {
    const newMove = await moveService.createMove(req.body);
    res.status(201).json(newMove);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllMoves = async (req: Request, res: Response) => {
  try {
    const moves = await moveService.getAllMoves();
    res.status(200).json(moves);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetMoveById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const move = await moveService.getMoveById(id);
    if (!move) {
      return res.status(404).json({ message: "Move not found." });
    }
    res.status(200).json(move);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdateMove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMove = await moveService.updateMove(id, req.body);
    if (!updatedMove) {
      return res.status(404).json({ message: "Move not found." });
    }
    res.status(200).json(updatedMove);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteMove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await moveService.deleteMove(id);
    if (!success) {
      return res.status(404).json({ message: "Move not found." });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetUserMoves = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const moves = await moveService.getMovesByUserId(userId);
    res.status(200).json(moves);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

