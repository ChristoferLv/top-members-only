import { body, matchedData, validationResult } from "express-validator";
import { insertNewMessage, queryAllMessages } from "../db/queries.js";

const validateMessage = [
];

async function newMessageGet(req, res) {
    res.render("create-message-form");
}

async function newMessagePost(req, res) {
    await insertNewMessage(req.user.id, req.body.title, req.body.content);
    res.redirect("/");
}

async function getAllMessage(req, res) {
    const { rows } = await queryAllMessages();
    res.render("index", { messages: rows });
}


export {
    newMessagePost,
    getAllMessage,
    newMessageGet
}