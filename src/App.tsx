import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// component
import DrawerLeft from './components/Drawer/DrawerLeft';

// pages
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import AnotherProfile from './pages/anotherProfile/AnotherProfile';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import Explore from './pages/explore/Explore';
import { fetchAuthMe, isAuthenticated } from './redux/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from './axios';
import FullPost from './components/FullPost/FullPost';
import Chat from './pages/chat/Chat';
import { io, Socket } from 'socket.io-client';
import { useMediaQuery } from '@mui/material'
import BottomMenu from './pages/mobile/BottomMenu';


function App() {
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const { currentUser } = useSelector((state: any) => state.user)
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOnlineUser, setIsOnlineUser] = React.useState<string[]>([]);
  const socket = React.useRef<Socket>();
  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const isLocation = location.pathname === '/login' || location.pathname === '/register';

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    socket.current = io('https://socket-server-v9ni.onrender.com');
  }, []);


  React.useEffect(() => {
    isAuthenticatedUser && socket.current?.emit('addUser', currentUser?._id);
    socket.current?.on('getUsers', (users: any) => {
      console.log(users.length)
      console.log(
        'users id array',
        users,
        users.map((user: any) => user.userId),
      );
      setIsOnlineUser(users.map((user: any) => user.userId));
    });
  }, [currentUser]);



  return (
    <div className="App">
      {!isLocation && isAuthenticatedUser && !isMobileScreen && <DrawerLeft />}
      <Routes>
        <Route path="/" element={<Home isOnlineUser={isOnlineUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/post/:id" element={<FullPost />} /> */}
        <Route path="/profile/:id" element={<AnotherProfile isOnlineUser={isOnlineUser} setIsOnlineUser={setIsOnlineUser} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/chat" element={<Chat socket={socket} isOnlineUser={isOnlineUser} setIsOnlineUser={setIsOnlineUser} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isMobileScreen && isAuthenticatedUser && !isLocation && <BottomMenu />}
    </div>
  );
}

export default App;
