export interface Message {
    id: string;
    message: string;
    author: string;
    dateTime: sring;
}

export type MessageWithoutID = Omit<Message, 'id'>