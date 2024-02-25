import React from 'react';
import MuiButton from '@mui/material/Button';
import { Button } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios'

interface IProps {
  id: string;
  userName: string;
  avatarUrl?: string;
}

const UserLastItem: React.FC<IProps> = ({ id, userName, avatarUrl }) => {
  const [subscribe, setSubscribe] = React.useState(false);

  const deleteUser = () => {
    const message = window.confirm('Вы действительно хотите удалить пользователся?');

    if (message) {
      console.log('deleted');
    }
  };

  const navigate = useNavigate();

  const handleWentToProfile = () => {
    navigate(`/profile/${id}`);
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
        <Link to="/profile/342">
          <Avatar
            sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
            alt="Travis Howard"
            src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
          />
        </Link>
        <span style={{ cursor: 'pointer' }} onClick={handleWentToProfile}>
          {userName}
        </span>
        {subscribe ? (
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
