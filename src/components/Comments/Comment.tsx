import React from 'react';
import '../PostCard/postCard.scss';
import './comment.scss';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ru from 'timeago.js/lib/lang/ru';
import { format, register } from 'timeago.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../axios'
import { useSelector } from 'react-redux';
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
}

interface props {
  id: string;
  user: User;
  text: string
  createdAt: string
  updateArrayComments: () => void
}

const Comment: React.FC<props> = ({ id, user, text, createdAt, updateArrayComments }) => {
  const { currentUser } = useSelector((state: any) => state.user)
  const navigate = useNavigate();

  const handleWentToProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  register('ru', ru);

  const date = new Date(createdAt);
  const formattedDate = format(date, 'ru');


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
      <div className="items">
        <Avatar onClick={handleWentToProfile} sx={{ cursor: 'pointer' }} src={user.avatarUrl ? user.avatarUrl : "/broken-image.jpg"} />
        <p onClick={handleWentToProfile} style={{ cursor: 'pointer' }} className="user-comment">
          {user.userName}
        </p>
        <p style={{ fontSize: '15px' }}>{text}</p>
        <br />
        <div className="down-section">
          <p className="createdAt-text">{formattedDate}</p>
        </div>
        {currentUser._id === user._id && <><EditIcon onClick={handleOpen} sx={{ cursor: 'pointer', color: 'grey' }} />
          <DeleteIcon onClick={deleteComment} sx={{ cursor: 'pointer', color: 'red' }} /></>}
      </div>
    </>
  );
}

export default Comment;
