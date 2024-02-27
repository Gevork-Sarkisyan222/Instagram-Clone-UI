import React from 'react';
import { Avatar, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../../../axios';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


interface TypesForProps {
  id: string;
  userName: string;
  avatarUrl: string;
  alreadyOnline: boolean
}

const RecommendUser: React.FC<TypesForProps> = ({ id, userName, avatarUrl, alreadyOnline }) => {
  const [subscribe, setSubscribe] = React.useState(false);
  const navigate = useNavigate();

  const handleWentToProfile = () => {
    navigate(`/profile/${id}`);
  };


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

  return (
    <div className="recomend-users-box">
      {
        alreadyOnline ? <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar
            onClick={handleWentToProfile}
            sx={{ cursor: 'pointer', width: '44px', height: '44px' }}
            alt={userName}
            src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
          />
        </StyledBadge> : <Avatar
          onClick={handleWentToProfile}
          sx={{ cursor: 'pointer', width: '44px', height: '44px' }}
          alt={userName}
          src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
        />
      }


      <p
        onClick={handleWentToProfile}
        style={{ fontSize: '14px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
        {userName}
      </p>
      {subscribe ? (
        <Button onClick={unSubscibe} variant="text">
          <span style={{ fontSize: '12px' }}>Отписаться</span>
        </Button>
      ) : (
        <Button onClick={subscibe} variant="text">
          <span style={{ fontSize: '12px' }}>Подписаться</span>
        </Button>
      )}
    </div>
  );
};

export default RecommendUser;
