import mongoose from "mongoose";
import { Donation, Transaction } from "../models/donation.model.js";
import expressAsyncHandler from "express-async-handler";
import { Family, Member } from "../models/user.model.js";
import { stripe } from "../utils/stripe.js";
export const createDonationCode = async (req, res) => {
  const { code, desc } = req.body;
  try {
    if (!code || !desc) {
      throw new Error("All mandatory fields are required");
    }
    const codeExist = await Donation.findOne({ code });

    if (codeExist) {
      return res.status(400).json({
        success: false,
        message: "This donation code already exists",
      });
    }

    const newDonationCode = new Donation({
      code,
      desc,
    });
    await newDonationCode.save();
    res.status(200).json({ success: true, donation: newDonationCode });
  } catch (error) {
    res.status(400).json({ success: false, message: error?.message });
  }
};

export const getAllDonationCodes = expressAsyncHandler(async (req, res) => {
  try {
    const donations = await Donation.find();
    if (!donations) {
      return res.status(400).json({ message: "No Donation code is found" });
    }
    res.status(200).json({ success: true, donations });
  } catch (error) {
    console.log("Error in getting list of donation codes ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// export const makeDonation = expressAsyncHandler(async (req, res) => {
//   try {
//     const { donationCode, donationAmount, donationCurrency, memberId } =
//       req.body;
//     if (!donationCode || !donationAmount || !donationCurrency || !memberId) {
//       throw new Error("All mandatory fields are required");
//     }
//     const donation = await Donation.findOne({ code: donationCode });
//     if (!donation) {
//       return res.status(400).json({
//         success: false,
//         message: "This donation code does not exist",
//       });
//     }
//     const donatedBy = await Member.findById(memberId);
//     if (!donatedBy) {
//       return res.status(400).json({
//         success: false,
//         message: "This member does not exist",
//       });
//     }
//     const { family } = await Member.findOne(donatedBy).select("family");

//     // const family = await Family.findById(familyOfMember);
//     const newDonation = new Transaction({
//       donationCode: donation,
//       donationAmount,
//       donationCurrency,
//       member: donatedBy,
//       family: family,
//     });

//     await newDonation.save();
//     res.status(200).json({ success: true, transaction: newDonation });
//   } catch (error) {
//     console.log("Error in making payment");
//     res.status(400).json({ success: false, message: error.message });
//   }
// });

export const createCheckoutSession = expressAsyncHandler(async (req, res) => {
  try {
    const {
      donationCode,
      donationAmount,
      donationCurrency,
      donorName,
      familyCode,
    } = req.body;
    if (
      !donationCode ||
      !donationAmount ||
      !donationCurrency ||
      !donorName ||
      !familyCode
    ) {
      throw new Error("All mandatory fields are required");
    }
    const lineItems = [
      {
        price_data: {
          currency: donationCurrency,
          product_data: {
            name: donorName,
            description: donationCode,
          },
          unit_amount: donationAmount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/home/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel-payment`,
      metadata: {
        donationCode,
        familyCode,
        donationAmount,
        donationCurrency,
        donorName,
      },
    });
    res.status(200).json({ success: true, id: session.id });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({
      success: false,
      message: "Error processing checkout",
      error: error.message,
    });
  }
});

export const checkoutSuccess = expressAsyncHandler(async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const newTransaction = new Transaction({
        donationCode: session.metadata.donationCode,
        familyCode: session.metadata.familyCode,
        donationAmount: session.metadata.donationAmount,
        donationCurrency: session.metadata.donationCurrency,
        donorName: session.metadata.donorName,
      });
      await newTransaction.save();
      res.status(200).json({
        success: true,
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        orderId: newTransaction._id,
      });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
});

export const getTotalDonationsOfACode = expressAsyncHandler(
  async (req, res) => {
    try {
      const { memberId } = req.params;
      console.log(memberId);
      const member = await Member.findById(memberId);
      const transaction = await Transaction.find({ member: memberId });

      const transactionResponse = transaction.map((x) => {
        const code = getDonationCode();
        const familyCode = getFamilyCode();
        return {
          Donation_Code: code,
          Amount: x.donationAmount,
          Family_Code: familyCode,
          Date: x.createdAt,
        };
      });

      const getDonationCode = async (x) => {
        return await Donation.findById(x.donationCode).select("code");
      };
      const getFamilyCode = async (x) => {
        await Family.findById(x.family).select("familyCode");
      };
      console.log(transactionResponse);

      res.status(200).json({
        donatedBy: member.firstName,
        transactionResponse,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
