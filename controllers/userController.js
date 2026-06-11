import { updateToAdmin, updateToMember } from '../db/queries.js';
import { body, matchedData, validationResult } from "express-validator";

const MEMBER_SECRET_CODE = "123";
const ADMIN_SECRET_CODE = "321";

const validateMemberCode = [
    body("code").trim().equals(MEMBER_SECRET_CODE).withMessage("Member code is incorrect")
];

const validateAdminCode = [
    body("code").trim().equals(ADMIN_SECRET_CODE).withMessage("Admin code is incorrect!")
];

function turnIntoMemberGet(req, res) {
    if (!req.user) {
        res.redirect("/");
    } else {
        res.render("upgrade-user")
    }
}

const turnIntoMemberPost = [validateMemberCode,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("upgrade-user", {
                errors: errors.array()[0]
            });
        }

        try {
            updateToMember(req.user.id);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
];

function turnIntoAdminGet(req, res) {
    if (!req.user)
        res.redirect("/messages");
    else
        res.render("become-admin");
}

const turnIntoAdminPost = [validateAdminCode,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("become-admin", {
                errors: errors.array()[0]
            });
        }

        try {
            updateToAdmin(req.user.id);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
];

export {
    turnIntoMemberGet,
    turnIntoMemberPost,
    turnIntoAdminGet,
    turnIntoAdminPost
}