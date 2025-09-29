import Comment from "../models/Comment";

export const createComment = async (data: Partial<Comment>): Promise<Comment> => {
  return await Comment.create(data as any);
};

export const getAllComments = async (): Promise<Comment[]> => {
  return await Comment.findAll();
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