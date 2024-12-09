import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectSendLoading } from '../../features/messages/messagesSlice.ts';
import { sendMessage } from '../../features/messages/messagesThunks.ts';
import { Box, Button, CircularProgress, TextField } from '@mui/material';


const MessageForm = () => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const sendLoading = useAppSelector(selectSendLoading);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() === '' || message.trim() === '') {
      alert('Both fields are required!');
      return;
    }
    dispatch(sendMessage({ author, message, dateTime: new Date().toISOString() }));
    setAuthor('');
    setMessage('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={sendLoading}>
        {sendLoading ? <CircularProgress /> : 'Send'}
      </Button>
    </Box>
  );
};

export default MessageForm;