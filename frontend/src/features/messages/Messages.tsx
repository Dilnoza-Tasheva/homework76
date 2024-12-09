import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading, selectMessages } from './messagesSlice.ts';
import { useEffect } from 'react';
import { fetchMessages } from './messagesThunks.ts';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import dayjs from 'dayjs';


const Messages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const fetchLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (fetchLoading) return <CircularProgress />;

  return (
    <List>
      {messages.map((message) => (
        <ListItem key={message.id}>
          <ListItemText
            primary={`${message.author}: ${message.message}`}
            secondary={dayjs(message.dateTime).format('DD.MM.YYYY HH:mm')}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Messages;