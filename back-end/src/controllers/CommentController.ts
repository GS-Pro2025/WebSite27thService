import { Request, Response } from "express";
import * as CommentService from "../services/CommentService";

export const create = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const payload = {
      userId,
      message: req.body.message,
      date: req.body.date,
      rating: req.body.rating,
    };

    const comment = await CommentService.createComment(payload as any);
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment", details: error instanceof Error ? error.message : String(error) });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(String(req.query.page), 10) : 1;
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 10;

    const result = await CommentService.getAllComments({ page, limit });

    res.json({
      data: result.rows,
      meta: {
        total: result.count,
        page: result.page,
        perPage: result.perPage,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
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