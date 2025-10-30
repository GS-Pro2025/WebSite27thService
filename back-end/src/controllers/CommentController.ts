import { Request, Response } from "express";
import * as CommentService from "../services/CommentService";

export const create = async (req: Request, res: Response) => {
  try {
    const comment = await CommentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
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