import { Router } from "express";
import multer from "multer";
import { authRequired } from "../middleware/auth.js";
import {
  createComplaint,
  listRecent,
  listAll,
} from "../controllers/complaintController.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.get("/", authRequired, listAll);
router.get("/recent", authRequired, listRecent);
// Accept multiple photos under the 'photos' field (up to 6)
router.post("/", authRequired, upload.array("photos", 6), createComplaint);

export default router;
