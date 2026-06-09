import { body, matchedData, validationResult } from "express-validator";
import { insertNewMessage, queryAllMessages } from "../db/queries.js";

const validateMessage = [
];

async function postNewMessage(req, res) {
    console.log("new messge", req.body)
    await insertNewMessage(req.user.id, req.body.title, req.body.content);
    res.redirect("/");
}

async function getAllMessage(req, res) {
    const { rows } = await queryAllMessages();
    res.render("messages_list", { messages: rows });
}


export {
    postNewMessage,
    getAllMessage
}