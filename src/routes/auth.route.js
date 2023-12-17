import express from "express";
import trimRequest from "trim-request";
import {
  login,
  logout,
  refereshToken,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshToken").post(trimRequest.all, refereshToken);

export default router;
