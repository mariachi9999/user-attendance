import { Router } from "express";
import {
  createAttendance,
  deleteAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
} from "../controllers/attendance.controller";
const router = Router();

router.get("/attendance", getAttendance);
router.get("/attendance/:id", getAttendanceById);
router.post("/attendance", createAttendance);
router.put("/attendance/:id", updateAttendance);
router.delete("/attendance", deleteAttendance);

export default router;
