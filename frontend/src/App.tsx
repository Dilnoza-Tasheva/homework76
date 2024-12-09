import MessageForm from './components/messageForm/messageForm.tsx';
import Messages from './features/messages/Messages.tsx';
import { Typography } from '@mui/material';


const App = () => {

  return (
    <>
      <Typography variant="h6">
        My Chat app
      </Typography>
      <MessageForm/>
      <Messages/>
    </>
  )
};

export default App
