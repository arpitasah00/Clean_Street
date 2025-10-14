import { Router } from "express";
import multer from "multer";
import { authRequired } from "../middleware/auth.js";
import {
  createComplaint,
  listRecent,
  listAll,
  getComplaintById, // 1. Import new controllers
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// --- Existing Routes ---
router.get("/", authRequired, listAll);
router.get("/recent", authRequired, listRecent);
router.post("/", authRequired, upload.array("photos", 6), createComplaint);

// --- New Routes ---
// 2. Add route to get a single complaint by its ID
router.get("/:id", authRequired, getComplaintById);

// 3. Add route to delete a complaint by its ID
router.delete("/:id", authRequired, deleteComplaint);


export default router;