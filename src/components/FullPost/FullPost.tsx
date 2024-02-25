import React from 'react';
import Modal from '@mui/material/Modal';
import PostInfoBox from '../../components/PostInfoBox/PostInfoBox';
import { setCloseFullPost } from '../../redux/slices/openFullPost';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';

const FullPost: React.FC = () => {
  const { openFullPost, postId } = useSelector((state: any) => state.openFullPost);
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  console.log('changed id =================', postId);

  const handleClose = () => {
    dispatch(setCloseFullPost());
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <PostInfoBox id={postId} />
    </Modal>
  );
};

export default FullPost;
