import express from "express";
import {
  addmember,
  deleteMember,
  getFamily,
  getFamilyMembers,
} from "../controllers/member.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/addmember", verifyToken, addmember);
router.get("/get-members/:familyCode", verifyToken, getFamilyMembers);
router.post("/delete-member", verifyToken, deleteMember);
router.get("/get-family/:familyCode", verifyToken, getFamily);

export default router;
