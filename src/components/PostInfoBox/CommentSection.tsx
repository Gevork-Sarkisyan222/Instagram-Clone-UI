import React from 'react';
import { Avatar } from '@mui/material';
import './PostInfoBox.scss';
import { useNavigate } from 'react-router-dom';
import { setCloseFullPost } from '../../redux/slices/openFullPost';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};


type User = {
  _id: string;
  userName: string;
  avatarUrl?: string;
  checkMark: boolean
}

interface props {
  id: string;
  user: User;
  text: string
  createdAt: string;
  updateArrayComments: () => void
}


const UserComment: React.FC<props> = ({ id, user, text, createdAt, updateArrayComments }) => {
  const { currentUser } = useSelector((state: any) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWentToProfile = () => {
    if (currentUser?._id === user._id) {
      navigate('/profile')
    } else {
      navigate(`/profile/${user._id}`);
    }
    dispatch(setCloseFullPost());
  };

  const deleteComment = async () => {
    try {
      const message = window.confirm("Вы действительно хотите удалить вашу комментарию?")

      if (message) {
        const res = await axios.delete(`/post/comment/${id}`);
        updateArrayComments()
        return res.data
      }
    } catch (err) {
      alert("Ну удалось удалить комментарию")
      console.warn(err)
    }
  }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [changeComment, setChageComment] = React.useState('')


  const editComment = async () => {
    const res = await axios.patch(`/post/comment/${id}`, { text: changeComment })
    updateArrayComments()
    handleClose()
    return res.data
  }


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменить комментарии
          </Typography>
          <TextField onChange={(e) => setChageComment(e.target.value)} id="filled-basic" label="Изменить комментарии" defaultValue={text} variant="filled" />
          <Button onClick={editComment} variant="contained">Сохранить</Button>
        </Box>
      </Modal>
      <div className="comment-content">
        <Avatar
          onClick={handleWentToProfile}
          sx={{ cursor: 'pointer', width: '32px', height: '32px' }}
          src={user.avatarUrl ? user.avatarUrl : "/broken-image.jpg"}
        />
        <span style={{ cursor: 'pointer' }} onClick={handleWentToProfile}>
          {user.userName}
        </span>
        {user.checkMark && <svg
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
        </svg>}
        <div className="comment-area">
          <p>
            {text}
          </p>
          {
            currentUser._id === user._id && <><EditIcon onClick={handleOpen} sx={{ cursor: 'pointer', color: 'grey' }} />
              <DeleteIcon onClick={deleteComment} sx={{ cursor: 'pointer', color: 'red' }} /></>
          }
        </div>
      </div>
    </>
  );
}

export default UserComment;
