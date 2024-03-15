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
  checkMark: boolean
}

const LikedUsersItems: React.FC<Props> = ({ id, userName, avatarUrl, checkMark }) => {
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
        {checkMark && <svg aria-label="Подтвержденный" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Подтвержденный</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>}
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
