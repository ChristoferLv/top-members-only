import { Router } from "express";
import { getAllMessage, newMessageGet, newMessagePost, removeMessageById } from "../controllers/messagesController.js";
const messageRouter = Router();

messageRouter.get("/", getAllMessage)
messageRouter.get("/new", newMessageGet)
messageRouter.post("/new", newMessagePost)
messageRouter.post("/delete/:id", removeMessageById)


export default messageRouter;
