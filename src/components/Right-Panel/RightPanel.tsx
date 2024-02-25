import React from 'react';
import './rightPanel.scss';
import { Button } from '@mui/material';
import RecommendUser from './recommendUser/RecommendUser/RecommendUser';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/user.slice';
import Avatar from '@mui/material/Avatar';
import { UserTypeForResponese } from '../../pages/Home';
import axios from '../../axios';

function RightPanel() {
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notSubscribedUser, setnNotSubscribedUser] = React.useState<UserTypeForResponese[]>([]);

  React.useEffect(() => {
    const fetchNotSubedUsers = async () => {
      if (currentUser._id) {
        const res = await axios.get(`user/not/subscribed/users/${currentUser?._id}`);
        setnNotSubscribedUser(res.data);
      }
    };
    fetchNotSubedUsers();
  }, []);

  const logoutFromAccaunt = () => {
    const message = window.confirm('Вы действительно хотите выйти с аккаунта?');
    if (message) {
      dispatch(logout());
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="paper-main">
      <div className="accaunt-items">
        <Link to="/profile">
          <Avatar
            alt={currentUser?.userName}
            src={currentUser?.avatarUrl ? currentUser?.avatarUrl : '/broken-image.jpg'}
          />
        </Link>
        <h4 onClick={navigateToProfile} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
          {currentUser?.userName}
        </h4>
        <Button onClick={logoutFromAccaunt} variant="text">
          <span style={{ fontSize: '12px' }}>Выйти с аккунта</span>
        </Button>
      </div>
      <p className="recommend-text">Рекомендации для вас</p>
      <div className="recommend-users">
        {notSubscribedUser.map((obj) => (
          <RecommendUser
            key={obj._id}
            id={obj._id}
            userName={obj.userName}
            avatarUrl={obj.avatarUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default RightPanel;
