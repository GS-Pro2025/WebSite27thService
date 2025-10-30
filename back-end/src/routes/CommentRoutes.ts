import { Router } from "express";
import * as CommentController from "../controllers/CommentController";
import { protect } from "../middlewares/AuthMiddleware";

const router = Router();

// proteger creación/edición/eliminación; lectura pública
router.post("/", protect, CommentController.create);
router.get("/", CommentController.getAll);
router.get("/:id", CommentController.getById);
router.put("/:id", protect, CommentController.update);
router.delete("/:id", protect, CommentController.remove);

export default router;