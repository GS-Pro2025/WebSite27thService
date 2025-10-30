import { Order } from "sequelize";
import Comment from "../models/Comment";

export const createComment = async (data: Partial<Comment>): Promise<Comment> => {
  return await Comment.create(data as any);
};

// Paginated fetch
export const getAllComments = async (opts?: { page?: number; limit?: number; order?: Order }) => {
  const page = Math.max(1, opts?.page ?? 1);
  const limit = Math.max(1, opts?.limit ?? 10);
  const offset = (page - 1) * limit;
  const order: Order = opts?.order ?? [["date", "DESC"]];

  const result = await Comment.findAndCountAll({
    limit,
    offset,
    order,
  });

  return {
    rows: result.rows,
    count: result.count,
    page,
    perPage: limit,
    totalPages: Math.ceil(result.count / limit),
  };
};

export const getCommentById = async (id: number): Promise<Comment | null> => {
  return await Comment.findByPk(id);
};

export const updateComment = async (
  id: number,
  updatedData: Partial<Comment>
): Promise<Comment | null> => {
  const comment = await Comment.findByPk(id);
  if (!comment) return null;
  await comment.update(updatedData);
  return comment;
};

export const deleteComment = async (id: number): Promise<boolean> => {
  const deletedRows = await Comment.destroy({ where: { id } });
  return deletedRows > 0;
};