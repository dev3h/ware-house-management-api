import express from "express";
import UserAuthController from "http/controllers/AuthController/UserAuthController";
import UserAuthRequest from "http/requests/UserAuthRequest";

const router = express.Router();
// VERIFY REGISTER
router.put("/final-register/:token", UserAuthController.verifyRegister);
router.get("/forgot-password", UserAuthController.forgotPassword);
router.put("/reset-password", UserAuthController.resetPassword);

router.use(UserAuthRequest);
router.post("/register", UserAuthController.register);
router.post("/login", UserAuthController.login);
router.post("/refresh-token", UserAuthController.refreshAccessToken);
router.get("/logout", UserAuthController.logout);

export default router;