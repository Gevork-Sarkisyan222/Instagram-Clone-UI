import React from 'react';
import { useDispatch } from 'react-redux';
import { setOpenFullPost } from '../../redux/slices/openFullPost';
import LikeIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/ModeComment';
import { useMediaQuery } from '@mui/material'


interface propsTypes {
  id: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
}

const RandomCard: React.FC<propsTypes> = ({ id, imageUrl, likes, comments }) => {
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery('(max-width:600px)');


  const handleOpenFullPostModal = () => {
    dispatch(setOpenFullPost(id));
  };

  return (
    <div onClick={handleOpenFullPostModal} className="RandomCard-Container">
      <img src={imageUrl} alt="post" />
      <div className="hover-content">
        <LikeIcon sx={{ color: 'white' }} />
        <span>{likes.length}</span>
        <CommentIcon sx={{ color: 'white' }} />
        <span>{comments.length}</span>
      </div>
    </div>
  );
};

export default RandomCard;
