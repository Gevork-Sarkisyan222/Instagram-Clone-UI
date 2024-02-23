import React from 'react';
import Input from '@mui/joy/Input';
import SearchUserDrawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import Menu from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import PostModal from '../PostModal/PostModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './SearchUser.scss';
import UserList from './UserList';
import axios from '../../axios';

export interface UserProps {
  id: string;
  avatarUrl: string;
  userName: string;
  checkMark: boolean;
}

function SearchUser() {
  const [users, setUsers] = React.useState<UserProps[]>([]);
  const [searchUser, setSearchUser] = React.useState('');

  React.useEffect(() => {
    const fetchSearhUsers = async () => {
      const res = await axios.get('/user/list');
      setUsers(res.data);
    };
    fetchSearhUsers();
  }, [searchUser]);

  const filteredUsers =
    searchUser.trim() !== '' &&
    users.filter((user) => user.userName.toLowerCase().includes(searchUser.toLowerCase()));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          ml: 'auto',
          mt: 1,
          mr: 2,
        }}>
        <Typography
          component="label"
          htmlFor="close-icon"
          fontSize="sm"
          fontWeight="lg"
          sx={{ cursor: 'pointer' }}>
          Закрыть
        </Typography>
        <ModalClose id="close-icon" sx={{ position: 'initial' }} />
      </Box>
      <Input
        size="sm"
        placeholder="Поиск"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        variant="plain"
        endDecorator={<Search />}
        slotProps={{
          input: {
            'aria-label': 'Search anything',
          },
        }}
        sx={{
          m: 3,
          borderRadius: 0,
          borderBottom: '2px solid',
          borderColor: 'neutral.outlinedBorder',
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
      />
      <List
        component="nav"
        sx={{
          flex: 'none',
          fontSize: 'xl',
          '& > div': { justifyContent: 'center' },
          flexDirection: 'column',
        }}>
        <div className="user-wrapper">
          {filteredUsers &&
            filteredUsers.map((obj: any) => (
              <UserList
                key={obj._id}
                id={obj._id}
                avatarUrl={obj.avatarUrl}
                userName={obj.userName}
                checkMark={obj.checkMark}
              />
            ))}
        </div>
      </List>
    </>
  );
}

export default SearchUser;
