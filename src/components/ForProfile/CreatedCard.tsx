import React from 'react';
import FullPost from '../FullPost/FullPost';
import LikeIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/ModeComment';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenFullPost } from '../../redux/slices/openFullPost';
import './forProfile.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../axios';
import EditPost from './EditPost';
import EditModal from '@mui/material/Modal';

interface PropsTypes {
  id: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
  desc: string;
  tags: string;
}

const CreatedCard: React.FC<PropsTypes> = ({ id, imageUrl, likes, comments, desc, tags }) => {
  const { openFullPost } = useSelector((state: any) => state.openFullPost);

  const dispatch = useDispatch();

  const handleOpenFullPostModal = () => {
    dispatch(setOpenFullPost(id));
  };

  const editPost = () => {
    const message = window.confirm('Вы действительно хотите изменить ваш пост?');

    if (message) {
      setOpen(true);
    }
  };

  const deletePost = async () => {
    const message = window.confirm('Вы действительно хотите удалить ваш пост?');

    if (message) {
      await axios.delete(`/post/delete/${id}`);
    }
  };

  //   edit post
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      {openFullPost && <FullPost />}
      <EditModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <EditPost id={id} imageUrl={imageUrl} desc={desc} tags={tags} handleClose={handleClose} />
      </EditModal>
      <div onClick={handleOpenFullPostModal} className="CreatedCard-Container">
        <img src={imageUrl} alt={`post image ${imageUrl}`} />
        <div className="hover-content">
          <article className="crud-icons" onClick={(e) => e.stopPropagation()}>
            <EditIcon onClick={editPost} sx={{ color: 'orange' }} />
            <DeleteIcon onClick={deletePost} sx={{ color: 'red' }} />
          </article>
          <LikeIcon sx={{ color: 'white' }} />
          <span>{likes.length}</span>
          <CommentIcon sx={{ color: 'white' }} />
          <span>{comments.length}</span>
        </div>
      </div>
    </>
  );
};

export default CreatedCard;
