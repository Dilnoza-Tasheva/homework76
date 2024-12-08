import {MessageWithoutID} from "../types";
import fileDb from "../fileDb";
import express from "express";

const messagesRouter = express.Router();

messagesRouter.post('/', async (req, res) => {

    const message = req.body.message;
    const author = req.body.author;

    if (!message || !author) {
        res.status(400).send({ error: "Athor and message cannot be empty" });
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

const parseDateTime = (datetime: string): Date | null => {
    const date = new Date(datetime);
    return isNaN(date.getTime()) ? null : date;
};

messagesRouter.get('/', async (req, res) => {
    const datetime = req.query.datetime as string | undefined;

    const messages = await fileDb.getMessages();

    if (!datetime) {
        const mostRecentMessages = messages.slice(-30);
        res.send(mostRecentMessages);
        return;
    }

    const date = parseDateTime(datetime);

    if (!date) {
        res.status(400).send({ error: 'Incorrect date and time frmat' });
        return;
    }

    const filteredMessages = messages.filter(
        (message) => new Date(message.dateTime) > date
    );
    res.send(filteredMessages);
});
export default messagesRouter;
