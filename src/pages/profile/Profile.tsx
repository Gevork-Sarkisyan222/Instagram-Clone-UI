import React from 'react';
import './profile.scss';
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
import EditProfile from '../../components/EdtiProfile/EditProfile';
import { isAuthenticated } from '../../redux/slices/user.slice';
import { useSelector } from 'react-redux';
import ErrorToLogin from '../../components/ErrorToLogin';
import axios from '../../axios';
import { useMediaQuery } from '@mui/material'
import MobileProfile from '../mobile/ProfilesMobile/MobileProfile';




const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 383,
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


function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const isMobileScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //
  const [openLast, setOpenLast] = React.useState(false);
  const handleOpenLast = () => setOpenLast(true);
  const handleCloseLast = () => setOpenLast(false);

  //
  const [openEditProfile, setOpenEditProfile] = React.useState(false);
  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const isAuthenticatedUser = useSelector(isAuthenticated);

  // fetch from backend datas
  const [subscribersList, setSubscribersList] = React.useState([]);
  const [subscribedList, setSubscribedList] = React.useState([]);

  console.log(currentUser?._id);

  React.useEffect(() => {
    const fetchSubscribers = async () => {
      if (currentUser?._id) {
        const res = await axios.get(`user/subscribers/list/${currentUser._id}`);
        setSubscribersList(res.data);
      }
    };

    fetchSubscribers();
  }, [currentUser]);

  React.useEffect(() => {
    const fetchSubscribed = async () => {
      if (currentUser?._id) {
        const res = await axios.get(`user/subscribed/list/${currentUser._id}`);
        setSubscribedList(res.data);
      }
    };

    fetchSubscribed();
  }, [currentUser]);

  // search inputs
  const [searchSubscribers, setSearchSubscribers] = React.useState('');
  const [searchSubscribed, setSearchSubscibed] = React.useState('');

  const filteredSubscribers = subscribersList.filter((user: any) =>
    user.userName.toLowerCase().includes(searchSubscribers.toLowerCase()),
  );

  const filteredSubscribed = subscribedList.filter((user: any) =>
    user.userName.toLowerCase().includes(searchSubscribed.toLowerCase()),
  );

  if (isAuthenticatedUser) {
    return isMobileScreen ? <MobileProfile /> : (
      <>
        <EditProfileModal
          open={openEditProfile}
          onClose={handleCloseEditProfile}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={profileStyles}>
            <EditProfile />
          </Box>
        </EditProfileModal>
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
                {subscribersList.length === 0 ? (
                  <div>
                    <h2>Список Пуст</h2>
                  </div>
                ) : (
                  filteredSubscribers?.map((obj: any) => (
                    <UserItem
                      key={obj._id}
                      id={obj._id}
                      userName={obj.userName}
                      avatarUrl={obj.avatarUrl}
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
              Твои подписки
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
                  onChange={(e) => setSearchSubscibed(e.target.value)}
                  className="input"
                  type="search"
                  placeholder="Поиск"
                />
              </div>
            </div>
            <div className="user-content">
              {subscribedList.length === 0 ? (
                <div>
                  <h2>Список Пуст</h2>
                </div>
              ) : (
                filteredSubscribed?.map((obj: any) => (
                  <UserLastItem
                    key={obj._id}
                    id={obj._id}
                    userName={obj.userName}
                    avatarUrl={obj.avatarUrl}
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
                alt={currentUser?.userName}
                src={currentUser?.avatarUrl ? currentUser?.avatarUrl : '/broken-image.jpg'}
              />
            </div>
            <section className="User-Info-Section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {currentUser?.userName}
                {currentUser?.checkMark && (
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

              <Button
                onClick={handleOpenEditProfile}
                sx={{
                  width: '192px',
                  height: '32px',
                  backgroundColor: '#e7e7e7',
                  '&:hover': {
                    backgroundColor: '#c4c4c4',
                  },
                }}>
                <span style={{ fontSize: '13px', color: '#00001d' }}>Редактировать профиль</span>
              </Button>
            </section>
            <section className="info-texts">
              <span>{currentUser?.createdPosts.length} публикаций</span>
              <span onClick={handleOpen} style={{ cursor: 'pointer' }}>
                {currentUser?.subscribers.length} подписчиков
              </span>
              <span onClick={handleOpenLast} style={{ cursor: 'pointer' }}>
                {currentUser?.subscribed.length} подписок
              </span>
            </section>
            <section className="desc-section">
              <Markdown className="markdown-content">{currentUser?.desc}</Markdown>
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
          <ProfileList />
        </div>
      </>
    );
  } else {
    return <ErrorToLogin />;
  }
}

export default Profile;
