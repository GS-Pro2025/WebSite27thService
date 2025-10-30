/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/axiosInstance";

export interface CommentPayload {
  message: string;
  date: string; // ISO string
  rating?: number;
}

export interface CommentResponse {
  id: number;
  userId: number;
  message: string;
  date: string;
  rating?: number;
}

/**
 * Obtiene todos los comentarios
 */
export const getComments = async (): Promise<CommentResponse[]> => {
  try {
    const res = await api.get<CommentResponse[]>("/comments");
    return res.data;
  } catch (err: any) {
    console.error("Error fetching comments:", err?.response?.data || err.message);
    throw new Error(err?.response?.data?.error || "Could not fetch comments");
  }
};

/**
 * Crea un comentario
 */
export const createComment = async (
  payload: CommentPayload
): Promise<CommentResponse> => {
  try {
    // axiosInstance debe incluir Authorization: `Bearer <token>` si es petición autenticada
    const res = await api.post<CommentResponse>("/comments", payload);
    return res.data;
  } catch (err: any) {
    console.error("Error creating comment:", err?.response?.data || err.message);
    throw new Error(err?.response?.data?.error || "Could not create comment");
  }
};

export default {
  getComments,
  createComment,
};