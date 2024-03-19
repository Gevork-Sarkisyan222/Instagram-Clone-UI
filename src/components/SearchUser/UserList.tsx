import React from 'react';
import { Avatar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import ModalClose from '@mui/joy/ModalClose';
import { UserProps } from './SearchUser';
import { useSelector } from 'react-redux';

const UserList: React.FC<UserProps> = ({ id, avatarUrl, userName, checkMark }) => {
  const [removeUser, setRemoveUser] = React.useState(true);
  const closeModal = React.useRef<HTMLButtonElement>(null);
  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  const handleWentToProifle = () => {
    if (id === currentUser._id) {
      navigate('/profile');
    } else navigate(`/profile/${id}`);
  };

  return (
    <>
      {removeUser && (
        <div className="UserList">
          <div className="users-items">
            <ModalClose
              ref={closeModal}
              id="close-icon"
              sx={{ position: 'initial', display: 'none' }}
            />
            <Avatar
              onClick={handleWentToProifle}
              onClickCapture={() => closeModal.current?.click()}
              sx={{ cursor: 'pointer' }}
              alt={userName}
              src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
            />
            <span
              onClickCapture={() => closeModal.current?.click()}
              style={{ cursor: 'pointer' }}
              onClick={handleWentToProifle}>
              {userName}
            </span>
            {checkMark && (
              <svg
                aria-label="Подтвержденный"
                className="x1lliihq x1n2onr6"
                fill="rgb(0, 149, 246)"
                height="12"
                role="img"
                viewBox="0 0 40 40"
                width="12">
                <title>Подтвержденный</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fill-rule="evenodd"></path>
              </svg>
            )}
            <svg
              onClick={() => setRemoveUser(false)}
              aria-label="Закрыть"
              className="delete-svg"
              fill="currentColor"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16">
              <title>Закрыть</title>
              <polyline
                fill="none"
                points="20.643 3.357 12 12 3.353 20.647"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"></polyline>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"></line>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
