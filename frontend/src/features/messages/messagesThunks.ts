import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message, MessageMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchMessages = createAsyncThunk<Message[], void>(
  'messages/fetchMessages',
  async () => {
    const response = await axiosApi.get('/messages');
    return response.data || [];
  }
);

export const sendMessage = createAsyncThunk<Message, MessageMutation>(
  'messages/sendMessage',
  async (newMessage: MessageMutation) => {
    const response = await axiosApi.post('/messages', newMessage);
    return response.data;
  }
);