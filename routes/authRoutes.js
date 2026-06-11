import { Router } from "express";
import { loginGet, loginPost, logout, registerGet, registerPost } from "../controllers/authController.js";
const authRouter = Router();

authRouter.get("/sign-up", registerGet)
authRouter.post("/sign-up", registerPost)
authRouter.get("/log-in", loginGet)
authRouter.post("/log-in", loginPost())
authRouter.get("/log-out", logout)


export default authRouter;
