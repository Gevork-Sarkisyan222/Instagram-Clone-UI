import React from 'react';
import LikeIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/ModeComment';
import './anotherProfile.scss';
import FullPost from '../../components/FullPost/FullPost';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenFullPost } from '../../redux/slices/openFullPost';

interface props {
  id: string;
  desc: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
}

const AnotherCard: React.FC<props> = ({ id, desc, imageUrl, likes, comments }) => {
  const { openFullPost } = useSelector((state: any) => state.openFullPost);
  const dispatch = useDispatch();

  const handleOpenFullPostModal = () => {
    dispatch(setOpenFullPost(id));
  };

  return (
    <>
      {openFullPost && <FullPost />}

      <div onClick={handleOpenFullPostModal} className="Another-Card-Container">
        <img src={imageUrl} alt={`post image ${imageUrl}`} />
        <div className="hover-content">
          <LikeIcon sx={{ color: 'white' }} />
          <span>{likes.length}</span>
          <CommentIcon sx={{ color: 'white' }} />
          <span>{comments.length}</span>
        </div>
      </div>
    </>
  );
};

export default AnotherCard;
