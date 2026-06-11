import bcrypt from 'bcryptjs';
import { db } from "../db/pools.js";
import { passport } from "../authUtils.js"
import { updateToAdmin, updateToMember } from '../db/queries.js';
import { body, matchedData, validationResult } from "express-validator";

const MEMBER_SECRET_CODE = 123;
const ADMIN_SECRET_CODE = 321;


const validateNewUser = [
    body("username").matches(/^[a-zA-Z0-9\s\-.]+$/).withMessage("Username can only contain letters, numbers, space, - and .").trim().isLength({ min: 3 }).withMessage("Username must have at leats 3 characteres").isLength({ max: 30 }).withMessage("The maximum username length is 30"),
    body("password").trim().isLength({ min: 3 }).withMessage("Password must have at leats 3 characteres").isLength({ max: 50 }).withMessage("The maximum password length is 50")
];


function loginGet(req, res) {
    const errors = req.session.messages || [];
    req.session.messages = [];
    res.render('log-in-form', { errors });
}

function loginPost() {
    return function (req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) next(err);

            if (!user) {
                return res.render("log-in-form", { errors: "Wrong credentials, try again", recoveredUsername: req.body.username });
            }

            req.login(user, (err) => {
                if (err) return next(err);
                return res.redirect("/messages")
            });
        })(req, res, next);
    };
}

// function loginPost(req, res) {
//     return passport.authenticate("local", {
//         successRedirect: "/messages",
//         failureRedirect: "/auth/log-in",
//         failureMessage: "Incorrect credentials, try again",
//     });
// }

function registerGet(req, res) {
    res.render("sign-up-form")
}

const registerPost = [validateNewUser,
    async (req, res) => {
        const errors = validationResult(req);
        const errorsObj = {};
        errors.array().forEach(error => {
            if (error.path in errorsObj)
                errorsObj[error.path] = `• ${errorsObj[error.path]} <br> • ${error.msg}`;
            else
                errorsObj[error.path] = error.msg;
        });

        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up-form", {
                errors: errorsObj,
                recoveredUsername: req.body.username,
            });
        }

        try {
            const { username, password } = matchedData(req);
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            next(error);
        }
    }]

function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

export {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout,
}