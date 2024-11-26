import { response } from "express";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationMail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Satsang Europe - verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Satsang Europe Donation Portal - Reset your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    });
    console.log("Reset password email sent successfully", response);
  } catch (error) {
    console.error(`Error sending reset password email: ${error}`);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendResetPasswordSuccessfulEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Satsang Europe - Successfully reset your password",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });
    console.log(
      "Completion of reset password email sent successfully",
      response
    );
  } catch (error) {
    console.error(`Error sending password reset completion email: ${error}`);
    throw new Error(`Error sending password reset completion email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "eb268ef0-56b0-4d16-ae51-6589104cece2",
      template_variables: {
        company_info_name: "Satsang Europe Donation Portal",
        name: name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending Welcome email: ${error}`);
    throw new Error(`Error sending Welcome email: ${error}`);
  }
};

export const sendApprovedEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "e1f7bee2-caf3-46fe-812b-7822a9a17c35",
      template_variables: {
        company_info_name: "Satsang Europe Donation Portal",
        name: name,
      },
    });
    console.log("Approved email sent successfully", response);
  } catch (error) {
    console.error(`Error sending Approved email: ${error}`);
    throw new Error(`Error sending Approved email: ${error}`);
  }
};
