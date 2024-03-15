import React from 'react';
import './postCard.scss';
import Avatar from '@mui/material/Avatar';
import Comment from '../Comments/Comment';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MessageIcon from '@mui/icons-material/ChatBubbleOutline';
import ViewerIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useNavigate } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenFullPost } from '../../redux/slices/openFullPost';
import LikedUsersItems from './LikedUsersItems';
import { Box, Typography } from '@mui/material';
import PostLikedUsersModal from '@mui/material/Modal';
import ru from 'timeago.js/lib/lang/ru';
import { format, register } from 'timeago.js';
import axios from '../../axios';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material'


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const styleForLikedUsersList = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 308,
  maxHeight: '400px',
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  overflow: 'auto',
};

type UserType = {
  _id: string;
  avatarUrl?: string;
  userName: string;
};


interface ITypes {
  alreadyOnline: boolean;
  id: string;
  imageUrl: string;
  desc: string;
  tags: string[];
  likes: string[];
  saves: string[];
  viewers: number;
  createdAt: string;
  commentsPost: string[];
  user: UserType;
  checkMark: boolean;
}

export interface LikedUserTypes {
  _id: string;
  userName: string;
  avatarUrl: string;
  checkMark: boolean;
}

interface CommentTypes {
  _id: string;
  text: string;
  user: UserType;
  createdAt: string
}

const PostCard: React.FC<ITypes> = ({
  alreadyOnline,
  id,
  imageUrl,
  desc,
  tags,
  likes,
  saves,
  viewers,
  createdAt,
  commentsPost,
  user,
  checkMark,
}) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [openComments, setOpenComments] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const { openFullPost } = useSelector((state: any) => state.openFullPost);
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery('(max-width:600px)');


  const navigate = useNavigate();

  const toggleComments = () => {
    setOpenComments(!openComments);
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleOpenFullPostModal = () => {
    dispatch(setOpenFullPost(id));
    console.log('for postCard > id', id);
  };

  const handleWentToProfile = () => {
    if (user._id === currentUser._id) {
      navigate('/profile');
    } else {
      navigate(`/profile/${user._id}`);
    }
  };

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  register('ru', ru);

  const date = new Date(createdAt);
  const formattedDate = format(date, 'ru');

  const [likedUsers, setLikedUsers] = React.useState<LikedUserTypes[]>([]);

  React.useEffect(() => {
    const fetchLikedUser = async () => {
      const res = await axios.get(`/post/liked/users/${id}`);
      setLikedUsers(res.data);
    };

    fetchLikedUser();
  }, []);

  // find user
  const [findUser, setFindUser] = React.useState('');

  const filteredUsers = likedUsers.filter((user) =>
    user.userName.toLowerCase().includes(findUser.toLowerCase()),
  );

  // like post and save
  const likePost = async () => {
    const res = await axios.post(`/post/like/${id}`)
    return res.data
  }

  const unlikePost = async () => {
    const res = await axios.delete(`/post/unlike/${id}`)
    return res.data
  }

  const savePost = async () => {
    const res = await axios.post(`/post/save/${id}`)
    return res.data
  }

  const removeSavePost = async () => {
    const res = await axios.delete(`/post/removeSave/${id}`)
    return res.data
  }

  // for checkbox
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);


  const handleCheckboxClickToLike = async () => {
    if (liked) {
      await unlikePost();
    } else {
      await likePost();
    }
    setLiked(!liked);
  };

  const handleCheckboxClickToSave = async () => {
    if (saved) {
      await removeSavePost();
    } else {
      await savePost();
    }
    setSaved(!saved);
  };

  // ================================



  React.useEffect(() => {
    if (currentUser.likedPosts.includes(id)) {
      setLiked(true);
    }
  }, [currentUser.likedPosts, id]);


  React.useEffect(() => {
    if (currentUser.savedPosts.includes(id)) {
      setSaved(true);
    }
  }, [currentUser.savedPosts, id]);



  // rednder current comments
  const [comments, setComments] = React.useState<CommentTypes[]>([])

  React.useEffect(() => {
    const fetchCurrentComments = async () => {
      const res = await axios.get(`/post/comments/${id}`);
      setComments(res.data);
    };

    fetchCurrentComments()
  }, []);

  // create comment 
  const createComment = async () => {
    try {
      const res = await axios.post(`/post/comment/${id}`, { text: comment })
      setComment('');
      updateArrayComments()
      return res.data
    } catch (err) {
      alert(`Не удалось создать комментарии символы большие или ${err}`)
      console.warn(err)
    }
  }

  // update array to see changes
  const updateArrayComments = async () => {
    try {
      const res = await axios.get(`/post/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error('Error updating comments:', error);
    }
  }


  return (
    <>
      {openFullPost && <FullPost />}
      <PostLikedUsersModal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styleForLikedUsersList}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Все лайкнутые
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '21px' }}>
            <div className="group">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                value={findUser}
                onChange={(e) => setFindUser(e.target.value)}
                className="input"
                type="search"
                placeholder="Поиск"
              />
            </div>
          </div>
          <div className="user-content">
            {filteredUsers.length === 0 ? (
              <div>
                <h2>Пусто</h2>
              </div>
            ) : (
              filteredUsers.map((obj) => (
                <LikedUsersItems
                  key={obj._id}
                  id={obj._id}
                  userName={obj.userName}
                  avatarUrl={obj.avatarUrl}
                  checkMark={obj.checkMark}
                />
              ))
            )}
          </div>
        </Box>
      </PostLikedUsersModal>
      <div className="instagram-card">
        <div className="instagram-card-header">
          {currentUser._id !== user._id && alreadyOnline ? <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar onClick={handleWentToProfile} sx={{ cursor: 'pointer' }} alt={user.userName} src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'} />
          </StyledBadge> : <Avatar
            onClick={handleWentToProfile}
            sx={{ cursor: 'pointer' }}
            alt={user.userName}
            src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
          />}


          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <h4 onClick={handleWentToProfile} className="instagram-card-user-name">
              {user.userName}
            </h4>
            {checkMark && (
              <svg
                aria-label="Подтвержденный"
                className="x1lliihq x1n2onr6"
                fill="rgb(0, 149, 246)"
                height="15"
                role="img"
                viewBox="0 0 40 40"
                width="15">
                <title>Подтвержденный</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fill-rule="evenodd"></path>
              </svg>
            )}
          </div>
          <div className="instagram-card-time">{formattedDate}</div>
        </div>
        <div className="instagram-card-image">
          <img
            onClick={!isMobileScreen ? handleOpenFullPostModal : undefined}
            style={{ width: isMobileScreen ? '100%' : '600px', cursor: 'pointer' }}
            src={imageUrl}
            height="600px"
            alt="Post"
          />
        </div>

        <section className="icons">
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            onClick={handleCheckboxClickToLike}
            checked={liked}
          />
          <MessageIcon
            onClick={!isMobileScreen ? handleOpenFullPostModal : undefined}
            sx={{ marginTop: '9px', cursor: 'pointer', color: 'grey' }}
          />
          <div style={{ position: 'absolute', right: '25px' }}>
            <Checkbox
              {...label}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon sx={{ color: 'black' }} />}
              onClick={handleCheckboxClickToSave}
              checked={saved}
            />
          </div>
        </section>

        <div className="instagram-card-content">
          <p onClick={handleOpen} style={{ cursor: 'pointer' }} className="likes">
            {likes?.length} отметок "Нравиться"
          </p>
          <p className="likes">
            {viewers} <ViewerIcon sx={{ color: 'grey', width: '20px' }} />
          </p>
          <p style={{ fontWeight: '500' }}>
            <p className="instagram-card-content-user">{user.userName}</p>
            <p>описание:</p>
            <p>{desc}</p>
            <span className="tags">{tags}</span>
          </p>
          <p onClick={toggleComments} className="comments" style={{ fontWeight: '400' }}>
            Посмотреть все комментарии ({commentsPost.length})
          </p>
          {openComments && (
            <>
              <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                {
                  comments.map((obj) => (
                    <Comment key={obj._id} id={obj._id} user={obj.user} text={obj.text} createdAt={obj.createdAt} updateArrayComments={updateArrayComments} />
                  ))
                }
              </div>
            </>
          )}
          <hr />
        </div>

        <div className="instagram-card-footer">
          <a className="footer-action-icons" href="#">
            <i className="fa fa-heart-o"></i>
          </a>
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="comments-input"
            type="text"
            placeholder="Добавьте комментарий..."
          />
          <a className="footer-action-icons" href="#">
            <i className="fa fa-ellipsis-h"></i>
          </a>
          {comment && (
            <Button onClick={createComment} variant="text">
              Опубликовать
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PostCard;
