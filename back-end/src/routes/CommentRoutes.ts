import { Router } from "express";
import * as CommentController from "../controllers/CommentController";

const router = Router();

router.post("/", CommentController.create);
router.get("/", CommentController.getAll);
router.get("/:id", CommentController.getById);
router.put("/:id", CommentController.update);
router.delete("/:id", CommentController.remove);

export default router;