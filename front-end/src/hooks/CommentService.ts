/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/axiosInstance";

export interface CommentPayload {
  message: string;
  rating?: number;
  date?: string;
  userId?: number;
}

export interface CommentResponse {
  id: number;
  message: string;
  rating?: number;
  date?: string;
  userId?: number;
}

/**
 * Obtiene todos los comentarios
 */
export const getComments = async (page = 1, limit = 100): Promise<CommentResponse[]> => {
  try {
    // usar la instancia `api` para respetar baseURL y Authorization
    const res = await api.get(`/comments?page=${page}&limit=${limit}`);
    console.log("getComments response status:", res.status);
    console.log("getComments response data:", res.data);
    // formato nuevo: { data: [...], meta: {...} }
    const payload = res.data;
    if (!payload) return [];

    if (Array.isArray(payload)) {
      // backend antiguo: devolvía directamente un array
      return payload as CommentResponse[];
    }

    if (Array.isArray(payload.data)) {
      // backend paginado: { data: [...], meta: {...} }
      return payload.data as CommentResponse[];
    }

    if (Array.isArray(payload.rows)) {
      // alternativa: { rows: [...], count: ... }
      return payload.rows as CommentResponse[];
    }

    return [];
  } catch (error: any) {
    console.error("getComments error:", error?.response?.data || error.message);
    return [];
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