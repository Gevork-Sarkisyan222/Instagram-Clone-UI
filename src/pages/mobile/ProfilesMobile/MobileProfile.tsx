import React from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import './mobileProfile.scss'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GridViewIcon from '@mui/icons-material/GridView';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ButtonText from '@mui/material/Button';
import axios from '../../../axios';
import SubscribersModal from '@mui/material/Modal';
import SubscribedModal from '@mui/material/Modal';
import UserItem from '../../../components/SubscribersUser/UserItem';
import UserLastItem from '../../../components/SubscribedUser.tsx/UserLastItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArraysTypes } from '../../../components/ForProfile/ProfileList';
import MobileProfileCards from './cards-for-mobile/MobileProfileCards';
import CreatePostModal from '@mui/material/Modal';
import EditProfileModal from '@mui/material/Modal';
import PostModal from '../../../components/PostModal/PostModal';
import EditProfile from '../../../components/EdtiProfile/EditProfile';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 310,
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

type UserType = {
    _id: string;
    userName: string;
    avatarUrl?: string
    checkMark: boolean
}


export interface CardTypes {
    _id: string;
    imageUrl: string;
    likes: string[];
    desc: string;
    tags: string;
    createdAt: string;
    user: UserType;
}

const profileStyles = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: 500,
    maxHeight: '100vh',
    bgcolor: 'background.paper',
    borderRadius: '22px',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function MobileProfile() {
    const { currentUser } = useSelector((state: any) => state.user)
    const [selectedType, setSelectedType] = React.useState<string>('posts');

    const handleCheckboxClick = (type: string) => {
        setSelectedType(type);
    };

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openLast, setOpenLast] = React.useState(false);
    const handleOpenLast = () => setOpenLast(true);
    const handleCloseLast = () => setOpenLast(false);


    // selected types 
    // down

    // created posts
    const [createdPosts, setCreatedPosts] = React.useState<CardTypes[]>([]);
    console.log('created Posts', createdPosts);

    React.useEffect(() => {
        const fetchCreatedPosts = async () => {
            const res = await axios.get(`/post/get/users/created/posts/${currentUser._id}`);
            setCreatedPosts(res.data);
        };
        fetchCreatedPosts();
    });

    const [likedPosts, setLikedPosts] = React.useState<CardTypes[]>([]);
    const [savedPosts, setSavedPosts] = React.useState<CardTypes[]>([]);

    React.useEffect(() => {
        const fetchLikedPosts = async () => {
            const res = await axios.get(`/post/get/users/liked/posts/${currentUser._id}`);
            setLikedPosts(res.data);
        };
        fetchLikedPosts();
    }, []);

    React.useEffect(() => {
        const fetchSavedPosts = async () => {
            const res = await axios.get(`/post/get/users/saved/posts/${currentUser._id}`);
            setSavedPosts(res.data);
        };
        fetchSavedPosts();
    }, []);

    console.log('saved posts', savedPosts)

    // for create post modal
    const [openPostModal, setOpenPostModal] = React.useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);

    // edit profile settings 
    const [openEditProfile, setOpenEditProfile] = React.useState(false);
    const handleOpenEditProfile = () => setOpenEditProfile(true);
    const handleCloseEditProfile = () => setOpenEditProfile(false);


    return (
        <>
            {/* edit profile */}
            <EditProfileModal
                open={openEditProfile}
                onClose={handleCloseEditProfile}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={profileStyles}>
                    <EditProfile />
                </Box>
            </EditProfileModal>
            {/* create post modal */}
            <CreatePostModal
                open={openPostModal}
                onClose={handleClosePostModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <PostModal handleClosePostModal={handleClosePostModal} />
            </CreatePostModal>
            {/* subscribers and subsrcibed modals */}
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
            {/* ===================== */}
            <div className='MobileProfile-Container'>
                <h2 className='first-userName'>{currentUser?.userName}</h2>
                <div className='Top-Line'></div>
                <div className='info-content'>
                    <Avatar
                        alt={currentUser?.userName}
                        src={currentUser?.avatarUrl}
                        sx={{ width: 77, height: 77 }}
                    />
                    <div className="content">
                        <h2>{currentUser?.userName}</h2>
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
                            <span style={{ fontSize: '11px', color: '#00001d' }}>Редактировать профиль</span>
                        </Button>
                    </div>
                </div>
                <div style={{ padding: '14px' }}>
                    <p>{currentUser.desc && currentUser?.desc}</p>
                </div>
                <div className='items'>
                    <div className="items-first-line"></div>
                    <span style={{ cursor: 'pointer' }} onClick={() => setSelectedType('posts')}>{currentUser?.createdPosts.length} <span style={{ color: 'grey', display: 'flex' }}>публикаций</span></span>
                    <span style={{ cursor: 'pointer' }} onClick={handleOpen}>{currentUser?.subscribers.length} <span style={{ color: 'grey', display: 'flex' }}>подписчика</span></span>
                    <span style={{ cursor: 'pointer' }} onClick={handleOpenLast}>{currentUser?.subscribed.length} <span style={{ color: 'grey', display: 'flex' }}>подписок</span></span>
                    <div className="items-last-line"></div>
                </div>
                <div className="profile-icons">
                    <Checkbox
                        checked={selectedType === 'posts'}
                        onClick={() => handleCheckboxClick('posts')}
                        {...label}
                        icon={<GridViewIcon />}
                        checkedIcon={<DashboardIcon />}
                    />
                    <Checkbox
                        checked={selectedType === 'liked'}
                        onClick={() => handleCheckboxClick('liked')}
                        {...label}
                        icon={<FavoriteBorderIcon />}
                        checkedIcon={<FavoriteIcon />}
                    />
                    <Checkbox
                        checked={selectedType === 'saved'}
                        onClick={() => handleCheckboxClick('saved')}
                        {...label}
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                    />
                    <div className="line-for-icons"></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {selectedType === 'posts' && (
                        createdPosts.length === 0 ? <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                marginTop: '15px'
                            }}>
                            <h1 className="share-text" >Поделиться фото</h1>
                            <p style={{ fontSize: '20px' }}>Фото, которыми вы делитесь, будут показываться в вашем профиле.</p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ButtonText
                                    onClick={handleOpenPostModal}
                                    variant="text"
                                    sx={{ width: '275px' }}>
                                    <span>Поделись своим первым фото</span>
                                </ButtonText>
                            </div>
                        </div> : <div className='Mobile-Cards-Container'>
                            {createdPosts.map((post: CardTypes) => (
                                <MobileProfileCards key={post._id} id={post._id} imageUrl={post.imageUrl} likes={post.likes} desc={post.desc} createdAt={post.createdAt} tags={post.tags} user={post.user} />
                            ))}
                        </div>
                    )}

                    {selectedType === 'liked' && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                marginTop: '15px'
                            }}>
                            <div>
                                <h1>Лайкнутые посты</h1>
                                <p>Вот ваша подборка</p>
                                <div className='Mobile-Cards-Container'>
                                    {likedPosts.length === 0 ? <div><h2>Пусто</h2></div> : likedPosts.map((post: CardTypes) => (
                                        <MobileProfileCards key={post._id} id={post._id} imageUrl={post.imageUrl} likes={post.likes} desc={post.desc} createdAt={post.createdAt} tags={post.tags} user={post.user} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedType === 'saved' && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                marginTop: '15px'
                            }}>
                            <div>
                                <h1>Сохраненные посты</h1>
                                <p>Вот ваша подборка</p>
                                <div className='Mobile-Cards-Container'>
                                    {savedPosts.length === 0 ? <div><h2>Пусто</h2></div> : savedPosts.map((post: CardTypes) => (
                                        <MobileProfileCards key={post._id} id={post._id} imageUrl={post.imageUrl} likes={post.likes} desc={post.desc} createdAt={post.createdAt} tags={post.tags} user={post.user} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MobileProfile