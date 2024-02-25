import React from 'react';
import { Avatar } from '@mui/material';
import './PostInfoBox.scss';
import { useNavigate } from 'react-router-dom';
import { setCloseFullPost } from '../../redux/slices/openFullPost';
import { useDispatch } from 'react-redux';

function UserComment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWentToProfile = () => {
    navigate('/profile/222');
    dispatch(setCloseFullPost());
  };

  return (
    <div className="comment-content">
      <Avatar
        onClick={handleWentToProfile}
        sx={{ cursor: 'pointer', width: '32px', height: '32px' }}
        src="/broken-image.jpg"
      />
      <span style={{ cursor: 'pointer' }} onClick={handleWentToProfile}>
        Gevork353
      </span>
      <svg
        aria-label="Подтвержденный"
        className="check-mark"
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
      <div className="comment-area">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A dolore rem molestiae totam
          quasi, exercitationem nihil repudiandae ducimus ipsa deleniti iure maiores sapiente
          debitis dolorem quisquam. Quia ab autem, quaerat quo quis atque aut recusandae nobis eos
          perspiciatis eligendi velit.
        </p>
      </div>
    </div>
  );
}

export default UserComment;
