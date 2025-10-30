import { Request, Response } from "express";
import * as CommentService from "../services/CommentService";

export const create = async (req: Request, res: Response) => {
  try {
    // obtener userId desde el token (seteado por el middleware 'protect')
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const payload = {
      userId,
      message: req.body.message,
      date: req.body.date,
      rating: req.body.rating,
    };

    const comment = await CommentService.createComment(payload);
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    console.log("Error creating comment", error);
    res.status(500).json({ error: "Error creating comment", details: error instanceof Error ? error.message : String(error) });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const comments = await CommentService.getAllComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const comment = await CommentService.getCommentById(Number(req.params.id));
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comment" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const comment = await CommentService.updateComment(Number(req.params.id), req.body);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await CommentService.deleteComment(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};