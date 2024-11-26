import mongoose from "mongoose";
import { Family, User, Member } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import expressAsyncHandler from "express-async-handler";
export const addmember = async (req, res) => {
  const { familyCode, firstName, lastName, userStatus, ritwikName } = req.body;

  try {
    if (!familyCode || !firstName || !lastName || !userStatus) {
      throw new Error("All mandatory fields are required");
    }

    const familyCodeExist = await Family.findOne({ familyCode });
    if (!familyCodeExist) {
      return res.status(400).json({
        success: false,
        message: "This family code has not been created yet",
      });
    }

    const newMember = new Member({
      firstName,
      lastName,
      userStatus,
      family: familyCodeExist,
      ritwikName,
    });
    await newMember.save();
    res.status(200).json({ success: true, member: newMember });
  } catch (error) {
    res.status(400).json({ success: false, message: error?.message });
  }
};

export const getFamily = expressAsyncHandler(async (req, res) => {
  try {
    const { familyCode } = req.params;
    const family = await Family.findOne({ familyCode });
    res.status(200).json({ success: true, family: family });
  } catch (error) {
    console.log("Error in getting family", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export const getFamilyMembers = expressAsyncHandler(async (req, res) => {
  try {
    const { familyCode } = req.params;

    const family = await Family.findOne({ familyCode });
    if (!family) {
      return res.status(400).json({
        success: false,
        message: "This family code does not exist",
      });
    }
    const members = await Member.find({ family: family._id });
    if (!members) {
      return res.status(400).json({ message: "No member is found" });
    }
    res.status(200).json({ success: true, members: members });
  } catch (error) {
    console.log("Error in getting family members", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export const deleteMember = expressAsyncHandler(async (req, res) => {
  try {
    const { memberId } = req.body;
    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "No member id is provided",
      });
    }
    const member = await Member.findById(memberId);
    // const member = members.fil
    // const nid = new ObjectId(memberId);
    // const member = await Member.findOne({ _id: nid });

    if (!member) {
      return res.status(400).json({
        success: false,
        message: "This member Id does not exist",
      });
    }

    if (member.isOwner) {
      return res.status(400).json({
        success: false,
        message: "This member is family owner, can not be deleted",
      });
    }
    member.isDeleted = true;
    await member.save();
    res.status(200).json({ success: true, message: "Member is deactivated" });
  } catch (error) {
    console.log("Error in getting family members", error);
    res.status(400).json({ success: false, message: error.message });
  }
});
