import React from 'react';
import MuiButton from '@mui/material/Button';
import { Button } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { setCloseFullPost } from '../../redux/slices/openFullPost';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  id: string;
  userName: string;
  avatarUrl: string;
}

const LikedUsersItems: React.FC<Props> = ({ id, userName, avatarUrl }) => {
  const [subscribe, setSubscribe] = React.useState(false);
  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleWentToProfile = () => {
    if (id === currentUser._id) {
      navigate('/profile');
    } else navigate(`/profile/${id}`);

    dispatch(setCloseFullPost());
  };


  return (
    <>
      <div style={{ justifyContent: 'center' }} className="item">
        <Avatar
          onClick={handleWentToProfile}
          sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
          alt={userName}
          src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
        />
        <span style={{ cursor: 'pointer' }} onClick={handleWentToProfile}>
          {userName}
        </span>
        {currentUser._id !== id ? (
          subscribe ? (
            <MuiButton variant="text" onClick={() => setSubscribe(false)}>
              Отписаться
            </MuiButton>
          ) : (
            <MuiButton variant="text" onClick={() => setSubscribe(true)}>
              Подписаться
            </MuiButton>
          )
        ) : null}
      </div>
    </>
  );
};

export default LikedUsersItems;
