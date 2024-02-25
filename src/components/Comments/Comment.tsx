import React from 'react';
import '../PostCard/postCard.scss';
import './comment.scss';
import { Avatar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function Comment() {
  const navigate = useNavigate();

  const handleWentToProfile = () => {
    navigate('/profile/8761');
  };

  return (
    <div className="items">
      <Link to="/profile/1f1f">
        <Avatar sx={{ cursor: 'pointer' }} src="/broken-image.jpg" />
      </Link>
      <p onClick={handleWentToProfile} style={{ cursor: 'pointer' }} className="user-comment">
        sanguine.j@loaf_made
      </p>
      <p style={{ fontSize: '15px' }}>hello world</p>
      <br />
      <div className="down-section">
        <p className="createdAt-text">4 дн.</p>
      </div>
    </div>
  );
}

export default Comment;
