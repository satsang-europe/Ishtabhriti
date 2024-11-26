import express from "express";
import {
  checkoutSuccess,
  createCheckoutSession,
  createDonationCode,
  getAllDonationCodes,
  getTotalDonationsOfACode,
  // makeDonation,
} from "../controllers/donation.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/create-donation", verifyToken, createDonationCode);
// router.post("/make-donation", verifyToken, makeDonation);
router.post("/create-checkout-session", verifyToken, createCheckoutSession);
router.post("/checkout-success", verifyToken, checkoutSuccess);
router.get("/donation-codes", verifyToken, getAllDonationCodes);
router.get("/get-donation/:memberId", getTotalDonationsOfACode);
export default router;
