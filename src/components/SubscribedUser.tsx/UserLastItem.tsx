import React from 'react';
import MuiButton from '@mui/material/Button';
import { Button } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios'
import { useSelector } from 'react-redux';

interface IProps {
  id: string;
  userName: string;
  avatarUrl?: string;
}

const UserLastItem: React.FC<IProps> = ({ id, userName, avatarUrl }) => {
  const [subscribe, setSubscribe] = React.useState(false);
  const { currentUser } = useSelector((state: any) => state.user)

  const deleteUser = () => {
    const message = window.confirm('Вы действительно хотите удалить пользователся?');

    if (message) {
      console.log('deleted');
    }
  };

  const navigate = useNavigate();

  const handleWentToProfile = () => {
    if (currentUser?._id === id) {
      navigate('/profile')
    } else {
      navigate(`/profile/${id}`);
    }
  };


  // for your subscribed users
  const subscibe = async () => {
    const { data } = await axios.post(`/user/subscribe/${id}`)
    setSubscribe(false)
    return data
  }

  const unSubscibe = async () => {
    const { data } = await axios.post(`/user/unsubscribe/${id}`)
    setSubscribe(true)
    return data
  }


  return (
    <>
      <div style={{ justifyContent: 'center' }} className="item">
        <Link to={`/profile/${id}`}>
          <Avatar
            sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
            alt={userName}
            src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
          />
        </Link>
        <span style={{ cursor: 'pointer' }} onClick={handleWentToProfile}>
          {userName}
        </span>
        {currentUser?._id === id ? '' : subscribe ? (
          <MuiButton variant="text" onClick={subscibe}>
            Подписаться
          </MuiButton>
        ) : (
          <MuiButton variant="text" onClick={unSubscibe}>
            Отписаться
          </MuiButton>
        )}
      </div>
    </>
  );
};

export default UserLastItem;
