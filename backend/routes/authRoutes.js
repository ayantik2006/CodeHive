import express from "express";
import {
  login,
  signup,
  emailVerification,
  user,
  logout,
  userInfo
} from "../controllers/authControllers.js";
const router = express.Router();

router.post("/user", user);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/user-info", userInfo);
router.post("/verification/:id", emailVerification);

export default router;
