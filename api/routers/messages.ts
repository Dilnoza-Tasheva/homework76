import {MessageWithoutID} from "../types";
import fileDb from "../fileDb";
import express from "express";

const messagesRouter = express.Router();

messagesRouter.post('/', async (req, res) => {

    const message = req.body.message;
    const author = req.body.author;

    if (!message || !author) {
        res.status(400).send({ error: "Author and message cannot be empty" });
    } else {
        const oneMessage: MessageWithoutID = {
            message: message,
            author: author,
            dateTime: req.body.dateTime || new Date().toISOString(),
        };

        const savedMessage = await fileDb.addMessage(oneMessage);
        res.send(savedMessage);
    }
});

export default messagesRouter;
