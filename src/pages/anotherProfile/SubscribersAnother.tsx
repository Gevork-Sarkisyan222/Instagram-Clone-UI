import React from 'react';
import MuiButton from '@mui/material/Button';
import { Button } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface props {
  handleClose: () => void;
  id: string;
  userName: string;
  avatarUrl: string;
}

const SubscribersAnother: React.FC<props> = ({ handleClose, id, userName, avatarUrl }) => {
  const [subscribe, setSubscribe] = React.useState(false);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.user);

  const itsMyProfile = currentUser._id;

  const handleWentToNavigate = () => {
    if (id === itsMyProfile) {
      window.location.href = `/profile`;
    } else {
      window.location.href = `/profile/${id}`;
    }
    handleClose();
  };

  return (
    <>
      <div className="item">
        <Avatar
          onClick={handleWentToNavigate}
          sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
          alt={userName}
          src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
        />
        <span style={{ cursor: 'pointer' }} onClick={handleWentToNavigate}>
          {userName}
        </span>
        {subscribe ? (
          <MuiButton variant="text" onClick={() => setSubscribe(false)}>
            <span style={{ fontSize: '13px' }}>Отписаться</span>
          </MuiButton>
        ) : (
          <MuiButton variant="text" onClick={() => setSubscribe(true)}>
            <span style={{ fontSize: '13px' }}>Подписаться</span>
          </MuiButton>
        )}
      </div>
    </>
  );
};

export default SubscribersAnother;
