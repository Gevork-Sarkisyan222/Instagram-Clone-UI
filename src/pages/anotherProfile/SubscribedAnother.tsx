import React, { useState } from 'react';
import MuiButton from '@mui/material/Button';
import { Button } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios'

interface props {
  handleCloseLast: () => void;
  id: string;
  userName: string;
  avatarUrl: string;
}

const SubscribedAnother: React.FC<props> = ({ handleCloseLast, id, userName, avatarUrl }) => {
  const [subscribe, setSubscribe] = React.useState(false);

  const deleteUser = () => {
    const message = window.confirm('Вы действительно хотите удалить пользователся?');

    if (message) {
      console.log('deleted');
    }
  };

  const { currentUser } = useSelector((state: any) => state.user);

  const itsMyProfile = currentUser._id;

  console.log('xeris', id);

  const handleWentToProfile = () => {
    if (id === itsMyProfile) {
      window.location.href = `/profile`;
    } else {
      window.location.href = `/profile/${id}`;
    }
    handleCloseLast();
  };

  const [hideYou, setHideYou] = React.useState(false)

  React.useEffect(() => {
    if (currentUser?.subscribed.includes(id)) {
      setSubscribe(true);
    }

    if (currentUser._id === id) {
      setHideYou(true)
    }

  }, []);

  console.log('after not inside effect', hideYou)


  const subscibeUser = async () => {
    const { data } = await axios.post(`/user/subscribe/${id}`)
    setSubscribe(true)
    return data
  }

  const unSubscibeUser = async () => {
    const { data } = await axios.post(`/user/unsubscribe/${id}`)
    setSubscribe(false)
    return data
  }

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
        {hideYou ? <div></div> : subscribe ? (
          <MuiButton variant="text" onClick={unSubscibeUser}>
            Отписаться
          </MuiButton>
        ) : (
          <MuiButton variant="text" onClick={subscibeUser}>
            Подписаться
          </MuiButton>
        )}
      </div>
    </>
  );
};

export default SubscribedAnother;
