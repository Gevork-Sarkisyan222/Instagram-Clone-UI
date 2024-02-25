import React from 'react';
import './PostInfoBox.scss';
import { Avatar, TextField, Checkbox, Button, Typography, Box } from '@mui/material';
import CommentSection from './CommentSection';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCloseFullPost } from '../../redux/slices/openFullPost';
import PostLikedUsersModal from '@mui/material/Modal';
import LikedUsersItems from '.././PostCard/LikedUsersItems';
import ru from 'timeago.js/lib/lang/ru';
import { format, register } from 'timeago.js';
import axios from '../../axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1050,
  height: 535,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

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

interface idType {
  id: string;
}

type UserType = {
  id: string;
  userName: string;
  avatarUrl?: string;
  checkMark: boolean;
};

interface FullPostType {
  imageUrl: string;
  likes: string[];
  saves: string[];
  comments: string[];
  viewers: string;
  user: UserType[];
}

const PostInfoBox: React.FC<idType> = ({ id }) => {
  const [post, setPost] = React.useState<any>([]);
  const { currentUser } = useSelector((state: any) => state.user);

  React.useEffect(() => {
    const findPost = async () => {
      const res = await axios.get(`/post/get/${id}`);
      setPost(res.data);
    };
    findPost();
  }, [id]);

  const [comment, setComment] = React.useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWentToProfile = () => {
    if (post.user._id === currentUser._id) {
      navigate('/profile');
    } else navigate(`/profile/${post.user._id}`);
    dispatch(setCloseFullPost());
  };

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  console.log('inside post box', id, post._id);

  console.log('после render inside post box', id, post._id);

  const date = new Date(post.createdAt);
  const formattedDate = format(date, 'ru');

  // fetch likes users
  const [likedUsers, setLikedUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchLikedUser = async () => {
      const res = await axios.get(`/post/liked/users/${id}`);
      setLikedUsers(res.data);
    };

    fetchLikedUser();
  }, []);

  const [findUser, setFindUser] = React.useState('');

  const filteredUsers = likedUsers.filter((user: any) =>
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

  return (
    <>
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
              filteredUsers.map((obj: any) => (
                <LikedUsersItems
                  key={obj._id}
                  id={obj._id}
                  userName={obj.userName}
                  avatarUrl={obj.avatarUrl}
                />
              ))
            )}
          </div>
        </Box>
      </PostLikedUsersModal>
      <Box sx={style}>
        <div className="image-place">
          <img
            style={{ width: '600px', cursor: 'pointer' }}
            src={post?.imageUrl}
            alt="post image"
          />
        </div>
        <div className="Comments-Section">
          <div className="user-area">
            <Avatar
              onClick={handleWentToProfile}
              sx={{ cursor: 'pointer', width: '32px', height: '32px' }}
              alt={post?.user?.userName}
              src={post?.user?.avatarUrl ? post?.user?.avatarUrl : '/broken-image.jpg'}
            />
            <span style={{ cursor: 'pointer' }} onClick={handleWentToProfile}>
              {post?.user?.userName}
            </span>
            {post?.user?.checkMark && (
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
            )}
            <span className="createdAt-text">{formattedDate}</span>
          </div>
          <div className="line"></div>
          <section className="comments-section">
            <CommentSection />
            <CommentSection />
            <CommentSection />
            <CommentSection />
            <CommentSection />
            <CommentSection />
            <CommentSection />
            <CommentSection />
          </section>
          <div className="second-line"></div>
          <div className="icons-and-content">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} checked={liked} onClick={handleCheckboxClickToLike} />
            <Checkbox
              icon={<BookmarkBorderIcon />}
              checked={saved}
              onClick={handleCheckboxClickToSave}
              checkedIcon={<BookmarkIcon sx={{ color: 'black' }} />}
            />
          </div>
          <p onClick={handleOpen} style={{ cursor: 'pointer' }} className="liked-count">
            {post?.likes?.length} отметок "Нравится"
          </p>
          <p className="viewers-count">{post?.viewers} просмотров</p>
          <div className="input-line"></div>
          <div className="write-area">
            <div className="input-container">
              <input
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                id="input"
                type="text"
                placeholder="Добавьте комментарий..."
              />
              {comment && (
                <Button onClick={() => setComment('')} variant="text">
                  <span>Опубликовать</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default PostInfoBox;
