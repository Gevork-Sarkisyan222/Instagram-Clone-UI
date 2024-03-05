import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import SmileIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

interface props {
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  createMessage: () => void;
}

const MessageInput: React.FC<props> = ({ messageText, setMessageText, createMessage }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createMessage();
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 730, borderRadius: '40px' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SmileIcon />
      </IconButton>
      <InputBase
        value={messageText}
        onKeyPress={handleKeyPress}
        onChange={(e) => setMessageText(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Напишите сообшение..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={createMessage} color="primary" sx={{ p: '10px' }} aria-label="directions">
        <SendIcon />
      </IconButton>
    </Paper>
  )
}

export default MessageInput