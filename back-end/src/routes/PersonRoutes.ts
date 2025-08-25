import { Router } from "express";
import {
  handleCreatePerson,
  handleGetAllPersons,
  handleGetPersonById,
  handleUpdatePerson,
  handleDeletePerson,
} from "../controllers/PersonController";

const router = Router();

/**
 * @route   POST /api/persons
 * @desc    Create a new person
 */
router.post("/", handleCreatePerson);

/**
 * @route   GET /api/persons
 * @desc    Get all persons
 */
router.get("/", handleGetAllPersons);

/**
 * @route   GET /api/persons/:id
 * @desc    Get person by ID
 */
router.get("/:id", handleGetPersonById);

/**
 * @route   PUT /api/persons/:id
 * @desc    Update person
 */
router.put("/:id", handleUpdatePerson);

/**
 * @route   DELETE /api/persons/:id
 * @desc    Delete person
 */
router.delete("/:id", handleDeletePerson);

export default router;
