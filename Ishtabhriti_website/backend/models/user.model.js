import mongoose from "mongoose";
// import { customAlphabet } from "nanoid";
// const alphabet =
//   "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// const nanoid = customAlphabet(alphabet, 13);
const newFamilyCode = `EU-${Date.now()}`;
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    familyCode: {
      type: String,
      required: true,
    },
    indianFamilyCode: {
      type: String,
      default: null,
    },
    userStatus: {
      type: String,
      required: true,
    },
    ritwikName: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);
const memberSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userStatus: {
    type: String,
    required: true,
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
    required: true,
  },
  isOwner: {
    type: Boolean,
    default: false,
    required: true,
  },
  ritwikName: {
    type: String,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const familySchema = mongoose.Schema(
  {
    familyCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export const Family = mongoose.model("Family", familySchema);
export const Member = mongoose.model("Member", memberSchema);
