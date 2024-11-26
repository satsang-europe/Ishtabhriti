import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { Family, Member, User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendApprovedEmail,
  sendPasswordResetEmail,
  sendResetPasswordSuccessfulEmail,
  sendVerificationMail,
  sendWelcomeEmail,
} from "../config/emails.js";
import expressAsyncHandler from "express-async-handler";
// ################################################ Sign-Up functionality ################################################
export const signup = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    contactNumber,
    streetAddress,
    province,
    country,
    postcode,
    userStatus,
    ritwikName,
    indianFamilyCode,
  } = req.body;
  try {
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !streetAddress ||
      !province ||
      !country ||
      !postcode ||
      !userStatus
    ) {
      throw new Error("All mandatory fields are required");
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User with same email already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const familyCode = `EU-${Date.now()}`;
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      contactNumber,
      streetAddress,
      province,
      country,
      postcode,
      familyCode,
      indianFamilyCode,
      userStatus,
      ritwikName,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1 * 15 * 60 * 1000,
    });
    await user.save();
    // jwt
    // generateTokenAndSetCookie(res, user._id);

    await sendVerificationMail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error?.message });
  }
};
// ################################################ Sign-Up functionality ends ################################################

// ################################################ Verify email functionality ################################################

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    const family = new Family({
      familyCode: user.familyCode,
    });

    await family.save();

    const memberOfFamily = new Member({
      firstName: user.firstName,
      lastName: user.lastName,
      userStatus: user.userStatus,
      family,
      isOwner: true,
      ritwikName: user.ritwikName,
    });
    await memberOfFamily.save();
    await sendWelcomeEmail(user.email, user.firstName);
    res.status(201).json({
      success: true,
      message: "User verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyMail", error);

    res.status(500).json({ success: false, message: error?.message });
  }
};
// ################################################ Verify email functionality ends ################################################

export const resendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email address is not found",
      });
    }
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 1 * 15 * 60 * 1000;
    await user.save();

    // generateTokenAndSetCookie(res, user._id);

    await sendVerificationMail(user.email, verificationToken);
    res.status(201).json({
      success: true,
      message: "Resend verification code is successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in sending verification mail", error);

    res.status(500).json({ success: false, message: error?.message });
  }
};

// ################################################ Login functionality ################################################
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "This email is not registered" });
    }

    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const loggedInToken = generateTokenAndSetCookie(res, user._id);
    user.lastLogin = Date.now();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
      token: loggedInToken,
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ success: false, message: error?.message });
  }
});
// ################################################ Login functionality ends ################################################

// ################################################ Logout functionality ################################################

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) {
    console.log("You are already logged out");
    res
      .status(204)
      .json({ success: true, message: "You are already logged out" });
  } else {
    console.log("Logging you out");
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "logged out successfully" });
  }
};

// ################################################ Logout functionality ends ################################################

// ################################################ Approve User functionality ################################################

export const approveUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not found, Please provide correct email or signup",
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is not verified yet",
      });
    }
    user.isApproved = true;
    await user.save();
    // mail send to user that he is approved
    await sendApprovedEmail(user.email, user.firstName);
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in approving user", error);
    res.status(400).json({ success: false, message: error?.message });
  }
});

// ################################################ Approve User ends ################################################

// ################################################ Forgot Password functionality ################################################

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not found, Please provide correct email or signup",
      });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in reset password, try again!", error);
    res.status(400).json({ success: false, message: error?.message });
  }
};

// ################################################ Forgot Password functionality ends ################################################

// ################################################ Reset Password functionality ################################################

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your token has expired, please try again",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetPasswordSuccessfulEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset is successful" });
  } catch (error) {
    console.log("Error in resetting the password", error);
    res.status(400).json({ success: false, message: error?.message });
  }
};

// ################################################ Reset Password functionality ends ################################################

// ################################################ Check Authenticated functionality ################################################
export const checkAuth = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});
// ################################################ Check Authenticated functionality ends ################################################

// ################################################ Check Admin functionality ################################################

export const checkAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const email = user.email;
    const permission = user.userStatus;
    if (email !== "admin_europe@satsangeurope.org" || permission !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Permission denied, you are not admin",
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checking Admin ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// ################################################ Check Admin functionality Ends ################################################

export const checkInitiated = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const userStatus = user.userStatus;
    if (userStatus !== "initiated") {
      return res.status(400).json({
        success: false,
        message: "Permission denied, you are not initiated",
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checking user status ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ################################################ List all users functionality ################################################

export const listAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error in getting list of users ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// ################################################ List all users functionality ends ################################################
