import Account from "../models/Account.js";
import bcrypt from "bcrypt";
import sendVerificationLink from "../services/sendVerificationLink.js";
import jwt from "jsonwebtoken";

export async function user(req, res) {
  try {
    const user = jwt.verify(req.cookies.user, process.env.JWT_SECRET);
    return res.status(200).json({});
  } catch (e) {
    return res.status(404).json({});
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const userData = await Account.findOne({ email: email });
  if (userData === null) {
    return res.status(404).json({ msg: "user does not exists" });
  }
  if (userData.password === "") {
    return res.status(404).json({ msg: "login through google" });
  }
  if (
    email !== userData.email ||
    !(await bcrypt.compare(password, userData.password))
  ) {
    return res.status(401).json({ msg: "incorrect credentials" });
  }
  const token = jwt.sign({ user: email }, process.env.JWT_SECRET);
  const isProduction = !(process.env.BACKEND_URL === "http://localhost:8080");
  res.cookie("user", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  return res.status(200).json({ msg: "login success" });
}

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let userData = await Account.findOne({ email: email });
  if (userData !== null && userData.isVerified === true) {
    return res.status(409).json({ msg: "user already exists" });
  }
  if (userData == null) {
    await Account.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
  } else {
    await Account.updateOne(
      { email: email },
      { name: name, password: hashedPassword }
    );
  }
  userData = await Account.findOne({ email: email });
  const timeDiff = parseInt(
    (new Date().getTime() - userData.verificationLinkSendingTime) / 1000
  );
  if (timeDiff <= 30) {
    return res.status(200).json({ msg: "failure", timeLeft: 30 - timeDiff });
  } else {
    await Account.updateOne(
      { email: email },
      { verificationLinkSendingTime: new Date().getTime() }
    );
    sendVerificationLink(email, userData._id);
    return res.status(200).json({ msg: "success" });
  }
}

export async function emailVerification(req, res) {
  const id = req.params.id;
  const userData = await Account.findOne({ _id: id });
  const timeDiff = parseInt(
    (new Date().getTime() - userData.verificationLinkSendingTime) / 1000
  );
  if (userData.isVerified) {
    return res.render("../views/emailVerified.ejs");
  } else {
    if (timeDiff > 600) render("../views/emailVerificationLinkExpired.ejs");
    else {
      await Account.updateOne({ _id: id }, { isVerified: true });
      return res.render("../views/emailVerified.ejs");
    }
  }
}

export async function logout(req, res) {
  try {
    const isProduction = !(process.env.BACKEND_URL === "http://localhost:8080");
    res.clearCookie("user", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax"
    });
    return res.status(200).json({});
  } catch (e) {
    return res.status(404).json({});
  }
}
