import React from 'react';
import MuiButton from '@mui/material/Button';
import { Button } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import { Link, useNavigate } from 'react-router-dom';

interface IProps {
  id: string;
  userName: string;
  avatarUrl?: string;
}

const UserItem: React.FC<IProps> = ({ id, userName, avatarUrl }) => {
  const [subscribe, setSubscribe] = React.useState(false);
  const [deletedUserContent, setDeletedUserContent] = React.useState(false);
  const navigate = useNavigate();

  const handleWentToProfile = () => {
    navigate(`/profile/${id}`);
  };

  const deleteUser = () => {
    setDeletedUserContent(!deletedUserContent);
  };

  return (
    <>
      <div className="item">
        <Link to="/profile/4234">
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
          <MuiButton variant="text" onClick={() => setSubscribe(false)}>
            <span style={{ fontSize: '13px' }}>Отписаться</span>
          </MuiButton>
        ) : (
          <MuiButton variant="text" onClick={() => setSubscribe(true)}>
            <span style={{ fontSize: '13px' }}>Подписаться</span>
          </MuiButton>
        )}
        {!deletedUserContent && (
          <Button
            onClick={deleteUser}
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
            onClick={() => setDeletedUserContent(false)}
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
