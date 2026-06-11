import { updateToAdmin, updateToMember } from '../db/queries.js';

const MEMBER_SECRET_CODE = 123;
const ADMIN_SECRET_CODE = 321;


function turnIntoMemberGet(req, res) {
    if (!req.user) {
        res.redirect("/");
    } else {
        res.render("upgrade-user")
    }
}

function turnIntoMemberPost(req, res) {
    if (!req.user)
        res.redirect("/messages");

    try {
        if (req.body.code == MEMBER_SECRET_CODE) {
            updateToMember(req.user.id);
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

function turnIntoAdminGet(req, res) {
    if (!req.user)
        res.redirect("/messages");
    else
        res.render("become-admin");
}

function turnIntoAdminPost(req, res) {
    if (!req.user)
        res.redirect("/messages");
    try {
        if (req.body.code == ADMIN_SECRET_CODE) {
            updateToAdmin(req.user.id);
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export {
    turnIntoMemberGet,
    turnIntoMemberPost,
    turnIntoAdminGet,
    turnIntoAdminPost
}