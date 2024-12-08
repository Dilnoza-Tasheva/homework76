import { Message } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchMessages, sendMessage } from './messagesThunks.ts';

interface MessagesState {
  messages: Message[];
  fetchLoading: boolean;
  sendLoading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  fetchLoading: false,
  sendLoading: false,
};

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectFetchLoading = (state: RootState) => state.messages.fetchLoading;
export const selectSendLoading = (state: RootState) => state.messages.sendLoading;

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload: messages }) => {
        state.fetchLoading = false;
        state.messages = messages;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, { payload: newMessage }) => {
        state.sendLoading = false;
        state.messages.push(newMessage);
      })
      .addCase(sendMessage.rejected, (state) => {
        state.sendLoading = false;
      });
  },
});

export const messagesReducer = messagesSlice.reducer;