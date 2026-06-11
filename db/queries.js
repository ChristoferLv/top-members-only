import { db } from "./pools.js";

async function insertNewMessage(author, title, content) {
    try {
        const added = new Date(Date.now()).toISOString();
        const result = await db.query("INSERT INTO messages (title, content, added, author) VALUES ($1, $2, $3, $4)", [title, content, added, author]);

        if (result.rowCount > 0) {
            console.log('Insert successful!');
        } else {
            console.log('Query finished, but no rows were inserted.');
        }
    } catch (error) {
        console.error('Insert failed due to database error:', error.message);
    }
}

async function queryAllMessages() {
    try {
        const result = await db.query("SELECT messages.*, users.username FROM messages JOIN users ON users.id = messages.author ORDER BY added DESC");
        return result;
    } catch (error) {
        console.error('Query failed due to database error:', error.message);
    }
}

async function deleteMessageById(id) {
    try {
        await db.query("DELETE FROM messages WHERE id=$1",[id]);
    } catch (error) {
        console.error('Query failed due to database error:', error.message);
    }
}

async function updateToMember(id) {
    try {
        await db.query("UPDATE users SET is_member=true  WHERE id=$1", [id]);
    } catch (error) {
        console.error('Query failed due to database error:', error.message);
    }
}

async function updateToAdmin(id) {
    try {
        await db.query("UPDATE users SET is_member=true, is_admin=true WHERE id=$1", [id]);
    } catch (error) {
        console.error('Query failed due to database error:', error.message);
    }
}





export {
    insertNewMessage,
    queryAllMessages,
    updateToMember,
    updateToAdmin,
    deleteMessageById
}

