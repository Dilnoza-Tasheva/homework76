export interface Message {
  id: string;
  message: string;
  author: string;
  dateTime: string;
}

export interface MessageMutation {
  message: string;
  author: string;
  dateTime: string;
}