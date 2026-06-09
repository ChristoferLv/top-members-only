import { Router } from "express";
import { getAllMessage, postNewMessage } from "../controllers/messagesController.js";
const messageRouter = Router();

messageRouter.get("/", getAllMessage)
messageRouter.post("/new", postNewMessage)


export default messageRouter;
