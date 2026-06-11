import { body, matchedData, validationResult } from "express-validator";
import { insertNewMessage, queryAllMessages } from "../db/queries.js";

const validateMessage = [
    body("title").matches(/^[a-zA-Z0-9\s\-_,.!?]+$/).withMessage("Title contains invalid characters").trim().isLength({ max: 30 }).withMessage("The maximum title length is 30"),
    body("content").trim().isLength({ max: 255 }).withMessage("The maximum content length is 255")
];

async function newMessageGet(req, res) {
    if (!req.user.is_member) {
        res.redirect("/messages");
    } else {
        res.render("create-message-form");
    }
}
admError: true

const newMessagePost = [validateMessage,
    async (req, res) => {
        if (!req.user.is_member) {
            res.redirect("/messages");
        }
        const errors = validationResult(req);
        const errorsObj = {};
        errors.array().forEach(error => {
            errorsObj[error.path] = error.msg;
        });

        if (!errors.isEmpty()) {
            return res.status(400).render("create-message-form", {
                errors: errorsObj,
                recoveredTitle: req.body.title,
                recoveredContent: req.body.content
            });
        }

        try {
            const { title, content } = matchedData(req);
            await insertNewMessage(req.user.id, title, content);
            res.redirect("/messages");
        } catch (error) {
            if (error.code === '23503') {
                return res.status(400).render("create-message-form", {
                    errors: errors.array(),
                });
            } else {
                console.log(error)
            }
        }
    }
]

// async function newMessagePost(req, res) {
//     await insertNewMessage(req.user.id, req.body.title, req.body.content);
//     res.redirect("/");
// }

async function getAllMessage(req, res) {
    const { rows } = await queryAllMessages();
    res.render("index", { messages: rows });
}


export {
    newMessagePost,
    getAllMessage,
    newMessageGet
}