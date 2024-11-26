import jwt from "jsonwebtoken";
export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSIte: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  // res.json({ token });
  return token;
};
