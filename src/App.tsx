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

function App() {
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const location = useLocation();
  const dispatch = useDispatch();

  const isLocation = location.pathname === '/login' || location.pathname === '/register';

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      {!isLocation && isAuthenticatedUser && <DrawerLeft />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/post/:id" element={<FullPost />} /> */}
        <Route path="/profile/:id" element={<AnotherProfile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
