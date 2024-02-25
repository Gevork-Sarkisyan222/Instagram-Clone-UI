import React from 'react';
import { Avatar, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../../../axios'

interface TypesForProps {
  id: string;
  userName: string;
  avatarUrl: string;
}

const RecommendUser: React.FC<TypesForProps> = ({ id, userName, avatarUrl }) => {
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
      <Link to={`/profile/${id}`}>
        <Avatar
          sx={{ cursor: 'pointer', width: '44px', height: '44px' }}
          alt={userName}
          src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
        />
      </Link>
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
