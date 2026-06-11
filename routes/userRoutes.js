import { Router } from "express";
import { turnIntoAdminGet, turnIntoAdminPost, turnIntoMemberGet, turnIntoMemberPost } from "../controllers/userController.js";
const userRouter = Router();

userRouter.get("/upgrade-to-member", turnIntoMemberGet);
userRouter.post("/upgrade-to-member", turnIntoMemberPost);
userRouter.get("/upgrade-to-admin", turnIntoAdminGet);
userRouter.post("/upgrade-to-admin", turnIntoAdminPost);


export default userRouter;
