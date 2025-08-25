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
 * @desc    Get all users
 */
router.get("/", handleGetAllUsers);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 */
router.post("/", handleCreateUser);

/**
 * @route   GET /api/users/:id
 * @desc    Get a user by its ID
 */
router.get("/:id", handleGetUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update a user by its ID
 */
router.put("/:id", handleUpdateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user by its ID
 */
router.delete("/:id", handleDeleteUser);

export default router;
