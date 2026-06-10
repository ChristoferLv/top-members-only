import bcrypt from 'bcryptjs';
import { db } from "../db/pools.js";

import { passport } from "../authUtils.js"

function loginGet(req, res) {
    res.render("log-in-form")
}

function loginPost(req, res) {
    return passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureMessage: true,
    });
}

function registerGet(req, res) {
    res.render("sign-up-form")
}

async function registerPost(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
}

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