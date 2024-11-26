import mongoose from "mongoose";
const donationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const transactionSchema = new mongoose.Schema(
  {
    donationCode: {
      type: String,
      required: true,
    },
    donationAmount: {
      type: Number,
      required: true,
    },
    donationCurrency: {
      type: String,
      required: true,
    },
    familyCode: {
      type: String,
      required: true,
    },
    donorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const paymentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    familyCode: {
      type: String,
      required: true,
    },
    stripeSessionId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
export const Donation = mongoose.model("Donation", donationSchema);
export const Transaction = mongoose.model("Transaction", transactionSchema);
export const Payment = mongoose.model("Payment", paymentSchema);
