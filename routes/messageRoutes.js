import { Router } from "express";
import { getAllMessage, newMessageGet, newMessagePost } from "../controllers/messagesController.js";
const messageRouter = Router();

messageRouter.get("/", getAllMessage)
messageRouter.get("/new", newMessageGet)
messageRouter.post("/new", newMessagePost)


export default messageRouter;
