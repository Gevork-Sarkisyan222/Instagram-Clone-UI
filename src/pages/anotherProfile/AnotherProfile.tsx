import React from 'react';
import './anotherProfile.scss';
import { Avatar } from '@mui/material';
import Button from '@mui/joy/Button';
import Markdown from 'react-markdown';
import ProfileList from '../../components/ForProfile/ProfileList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';
import SubscribersModal from '@mui/material/Modal';
import SubscribedModal from '@mui/material/Modal';
import EditProfileModal from '@mui/material/Modal';
import UserItem from '../../components/SubscribersUser/UserItem';
import UserLastItem from '../../components/SubscribedUser.tsx/UserLastItem';
import LikeIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/ModeComment';
import SubscribersAnother from './SubscribersAnother';
import AnotherCard from './AnotherCard';
import SubscribedAnother from './SubscribedAnother';
import ErrorToLogin from '../../components/ErrorToLogin';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../redux/slices/user.slice';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import axios from '../../axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 340,
  maxHeight: '400px',
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  overflow: 'auto',
};

const styleForLastText = {
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

const profileStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 500,
  maxHeight: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

interface User {
  _id: string;
  userName: string;
  avatarUrl?: string;
  checkMark: boolean;
  blocked: boolean;
  createdPosts: string[];
  subscribers: string[];
  subscribed: string[];
  desc: string;
}

interface Post {
  id: string;
  desc: string;
  avatarUrl: string;
  likes: string[];
  comments: string[];
}

function AnotherProfile() {
  const { id } = useParams();
  console.log('params', id);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [subscribe, setSubscribe] = React.useState(false);

  //
  const [openLast, setOpenLast] = React.useState(false);
  const handleOpenLast = () => setOpenLast(true);
  const handleCloseLast = () => setOpenLast(false);

  const markdown =
    '# Hi, *Pluto*!   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum blanditiis aliquam suscipit';

  const isAuthenticatedUser = useSelector(isAuthenticated);

  const [userData, setUserData] = React.useState<User>({
    _id: '',
    userName: '',
    avatarUrl: '',
    checkMark: false,
    blocked: false,
    createdPosts: [],
    subscribers: [],
    subscribed: [],
    desc: '',
  });

  React.useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(`/user/get/${id}`);
      setUserData(res.data);
    };

    getUserData();
  }, []);

  // fetch subscribers
  const [subscribers, setSubscribers] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchSubscribers = async () => {
      if (userData._id) {
        const res = await axios.get(`/user/subscribers/list/${userData._id}`);
        setSubscribers(res.data);
      }
    };
    fetchSubscribers();
  }, [userData]);

  // fetch subscribed
  const [subscribed, setSubscribed] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchSubscribed = async () => {
      if (userData._id) {
        const res = await axios.get(`/user/subscribed/list/${userData._id}`);
        setSubscribed(res.data);
      }
    };
    fetchSubscribed();
  }, [userData]);

  // fetch created Posts
  const [createdPosts, setCreatedPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const fetchCreatedPosts = async () => {
      if (userData._id) {
        const res = await axios.get(`/post/get/users/created/posts/${userData._id}`);
        setCreatedPosts(res.data);
      }
    };
    fetchCreatedPosts();
  }, [userData]);

  // find poles
  const [searchSubscribers, setSearchSubscribers] = React.useState('');
  const [searchSubscribed, setSearchSubscribed] = React.useState('');

  const filteredSubscribers = subscribers.filter((user: any) =>
    user.userName.toLowerCase().includes(searchSubscribers.toLowerCase()),
  );

  const filteredSubscribed = subscribed.filter((user: any) =>
    user.userName.toLowerCase().includes(searchSubscribed.toLowerCase()),
  );

  if (isAuthenticatedUser) {
    return (
      <>
        {/* =============== */}
        <SubscribersModal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Подписчики
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '21px',
              }}>
              <div className="group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input
                  value={searchSubscribers}
                  onChange={(e) => setSearchSubscribers(e.target.value)}
                  className="input"
                  type="search"
                  placeholder="Поиск"
                />
              </div>
            </div>
            <div>
              <div className="user-content">
                {subscribers.length === 0 ? (
                  <div>
                    <h2>Список Пуст</h2>
                  </div>
                ) : (
                  filteredSubscribers.map((obj: any) => (
                    <SubscribersAnother
                      key={obj._id}
                      id={obj._id}
                      userName={obj.userName}
                      avatarUrl={obj.avatarUrl}
                      handleClose={handleClose}
                    />
                  ))
                )}
              </div>
            </div>
          </Box>
        </SubscribersModal>

        {/* subscribed modal last */}
        <SubscribedModal
          open={openLast}
          onClose={handleCloseLast}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleForLastText}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Подписки
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '21px' }}>
              <div className="group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input
                  value={searchSubscribed}
                  onChange={(e) => setSearchSubscribed(e.target.value)}
                  className="input"
                  type="search"
                  placeholder="Поиск"
                />
              </div>
            </div>
            <div className="user-content">
              {subscribed.length === 0 ? (
                <div>
                  <h2>Список Пуст</h2>
                </div>
              ) : (
                filteredSubscribed.map((obj: any) => (
                  <SubscribedAnother
                    key={obj._id}
                    id={obj._id}
                    userName={obj.userName}
                    avatarUrl={obj.avatarUrl}
                    handleCloseLast={handleCloseLast}
                  />
                ))
              )}
            </div>
          </Box>
        </SubscribedModal>
        <div className="container">
          <div>
            <div className="avatar-div">
              <Avatar
                sx={{ width: '150px', height: '150px', cursor: 'pointer' }}
                alt={userData?.userName}
                src={userData?.avatarUrl ? userData?.avatarUrl : '/broken-image.jpg'}
              />
            </div>
            <section className="User-Info-Section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {userData?.userName}
                {userData?.checkMark && (
                  <svg
                    aria-label="Подтвержденный"
                    className="x1lliihq x1n2onr6"
                    fill="rgb(0, 149, 246)"
                    height="18"
                    role="img"
                    viewBox="0 0 40 40"
                    width="18">
                    <title>Подтвержденный</title>
                    <path
                      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                      fill-rule="evenodd"></path>
                  </svg>
                )}
              </h3>
              {!subscribe && (
                <Button
                  onClick={() => setSubscribe(true)}
                  sx={{
                    width: '122px',
                    height: '32px',
                    backgroundColor: '#e7e7e7',
                    '&:hover': {
                      backgroundColor: '#c4c4c4',
                    },
                  }}>
                  <span style={{ fontSize: '13px', color: '#00001d' }}>Подписаться</span>
                </Button>
              )}
              {subscribe && (
                <Button
                  onClick={() => setSubscribe(false)}
                  sx={{
                    width: '122px',
                    height: '32px',
                    backgroundColor: '#e7e7e7',
                    '&:hover': {
                      backgroundColor: '#c4c4c4',
                    },
                  }}>
                  <span style={{ fontSize: '13px', color: '#00001d' }}>Отписаться</span>
                </Button>
              )}
              <Button
                sx={{
                  width: '178px',
                  height: '32px',
                  backgroundColor: '#e7e7e7',
                  '&:hover': {
                    backgroundColor: '#c4c4c4',
                  },
                }}>
                <span style={{ fontSize: '13px', color: '#00001d' }}>Отправить сообщение</span>
              </Button>
            </section>
            <section className="info-texts">
              <span>{userData.createdPosts.length} публикаций</span>
              <span onClick={handleOpen} style={{ cursor: 'pointer' }}>
                {userData.subscribers.length} подписчиков
              </span>
              <span onClick={handleOpenLast} style={{ cursor: 'pointer' }}>
                {userData.subscribed.length} подписок
              </span>
            </section>
            <section className="desc-section">
              <Markdown className="markdown-content">{userData.desc}</Markdown>
            </section>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '126px',
            marginLeft: '141px',
          }}>
          {userData?.blocked ? (
            <>
              {/* <h2 style={{ marginTop: '-19px' }}>Публикаций</h2> */}
              <div className="close-profile-container">
                <span>Это закрытый аккаунт</span>
                <span>Подпишитесь, чтобы видеть его/ее фото и видео.</span>
              </div>
            </>
          ) : (
            <div className="card-wrapper">
              {createdPosts.length === 0 ? (
                <div>
                  <h1>Нету публикаций</h1>
                </div>
              ) : (
                createdPosts.map((obj: any) => (
                  <AnotherCard
                    key={obj._id}
                    id={obj._id}
                    desc={obj.desc}
                    imageUrl={obj.imageUrl}
                    likes={obj.likes}
                    comments={obj.comments}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <ErrorToLogin />;
  }
}

export default AnotherProfile;
