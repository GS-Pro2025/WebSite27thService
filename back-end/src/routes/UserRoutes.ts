import { Router } from "express";
import {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
} from "../controllers/UserController";

const router = Router();

/**
 * @route   GET /api/users
 * @desc    Obtener todos los usuarios
 */
router.get("/", handleGetAllUsers);

/**
 * @route   POST /api/users
 * @desc    Crear un nuevo usuario
 */
router.post("/", handleCreateUser);

/**
 * @route   GET /api/users/:id
 * @desc    Obtener un usuario por su ID
 */
router.get("/:id", handleGetUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Actualizar un usuario por su ID
 */
router.put("/:id", handleUpdateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Eliminar un usuario por su ID
 */
router.delete("/:id", handleDeleteUser);

export default router;
