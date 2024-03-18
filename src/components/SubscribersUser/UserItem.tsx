import React from 'react';
import MuiButton from '@mui/material/Button';
import { Button } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios'

interface IProps {
  id: string;
  userName: string;
  avatarUrl?: string;
}

const UserItem: React.FC<IProps> = ({ id, userName, avatarUrl }) => {
  const { currentUser } = useSelector((state: any) => state.user)
  const [deletedUserContent, setDeletedUserContent] = React.useState(false);
  const navigate = useNavigate();

  const handleWentToProfile = () => {
    if (currentUser?._id === id) {
      navigate(`/profile`);
    } else {
      navigate(`/profile/${id}`);
    }
  };




  const [subscribe, setSubscribe] = React.useState(false);

  // const isSubsribedOrNot = currentUser.subscribed !== id && setSubscribe(true)

  React.useEffect(() => {
    if (currentUser.subscribed.includes(id)) {
      setSubscribe(true);
    }
  }, []);


  const subscibe = async () => {
    const { data } = await axios.post(`/user/subscribe/${id}`)
    setSubscribe(true)
    return data
  }

  const unSubscibe = async () => {
    const { data } = await axios.post(`/user/unsubscribe/${id}`)
    setSubscribe(false)
    return data
  }

  // remove subscribed user
  const removeSubscribedUser = async () => {
    const res = await axios.delete(`/user/delete/subscriber/user/${id}`)
    setDeletedUserContent(!deletedUserContent);
    return res.data
  }

  // return subscriber user
  const returnSubscribedUser = async () => {
    const res = await axios.patch(`/user/return/subscriber/user/${id}`)
    setDeletedUserContent(false);
    return res.data
  }


  return (
    <>
      <div className="item">
        <Avatar
          onClick={handleWentToProfile}
          sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
          alt={userName}
          src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
        />
        <span style={{ cursor: 'pointer' }} onClick={handleWentToProfile}>
          {userName}
        </span>
        {currentUser?._id === id ? '' : subscribe ? (
          <MuiButton variant="text" onClick={unSubscibe}>
            <span style={{ fontSize: '13px' }}>Отписаться</span>
          </MuiButton>
        ) : (
          <MuiButton variant="text" onClick={subscibe}>
            <span style={{ fontSize: '13px' }}>Подписаться</span>
          </MuiButton>
        )}
        {currentUser?._id === id ? '' : !deletedUserContent && (
          <Button
            onClick={removeSubscribedUser}
            sx={{
              background: '#efefef',
              marginLeft: '18px',
              color: 'black',
              '&:hover': {
                backgroundColor: '#d4d4d4',
              },
            }}>
            Удалить
          </Button>
        )}

        {deletedUserContent && (
          <Button
            onClick={returnSubscribedUser}
            sx={{
              background: '#efefef',
              marginLeft: '18px',
              color: 'black',
              '&:hover': {
                backgroundColor: '#d4d4d4',
              },
            }}>
            Удалено <CheckIcon />
          </Button>
        )}
      </div>
    </>
  );
};

export default UserItem;
