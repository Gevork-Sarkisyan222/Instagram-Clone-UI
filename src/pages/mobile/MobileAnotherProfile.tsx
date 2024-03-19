import React from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import './ProfilesMobile/mobileProfile.scss'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GridViewIcon from '@mui/icons-material/GridView';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ButtonText from '@mui/material/Button';
import axios from '../../axios';
import SubscribersModal from '@mui/material/Modal';
import SubscribedModal from '@mui/material/Modal';
import UserItem from '../../components/SubscribersUser/UserItem';
import UserLastItem from '../../components/SubscribedUser.tsx/UserLastItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArraysTypes } from '../../components/ForProfile/ProfileList';
import MobileProfileCards from './ProfilesMobile/cards-for-mobile/MobileProfileCards';
import PostModal from '../../components/PostModal/PostModal';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        width: '14px',
        height: '14px',
        borderRadius: '20px',

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
    avatarUrl?: string;
    checkMark: boolean;
    blocked: boolean
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


interface propsTypes {
    userData: any
    isOnlineUser: string[]
}

const MobileAnotherProfile: React.FC<propsTypes> = ({ userData, isOnlineUser }) => {
    const { currentUser } = useSelector((state: any) => state.user)
    const [selectedType, setSelectedType] = React.useState<string>('posts');

    const handleCheckboxClick = (type: string) => {
        setSelectedType(type);
    };

    // fetch from backend datas
    const [subscribersList, setSubscribersList] = React.useState([]);
    const [subscribedList, setSubscribedList] = React.useState([]);

    console.log(userData?._id);

    React.useEffect(() => {
        const fetchSubscribers = async () => {
            if (userData?._id) {
                const res = await axios.get(`user/subscribers/list/${userData?._id}`);
                setSubscribersList(res.data);
            }
        };

        fetchSubscribers();
    }, [userData]);

    React.useEffect(() => {
        const fetchSubscribed = async () => {
            if (userData?._id) {
                const res = await axios.get(`user/subscribed/list/${userData?._id}`);
                setSubscribedList(res.data);
            }
        };

        fetchSubscribed();
    }, [userData]);

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



    // created posts
    const [createdPosts, setCreatedPosts] = React.useState<CardTypes[]>([]);
    console.log('created Posts', createdPosts);

    React.useEffect(() => {
        const fetchCreatedPosts = async () => {
            const res = await axios.get(`/post/get/users/created/posts/${userData?._id}`);
            setCreatedPosts(res.data);
        };
        fetchCreatedPosts();
    }, []);

    const [subscribe, setSubscribe] = React.useState(false);

    React.useEffect(() => {
        if (currentUser?.subscribed.includes(userData?._id)) {
            setSubscribe(true);
        }
    }, []);

    const subscibeUser = async () => {
        const { data } = await axios.post(`/user/subscribe/${userData?._id}`)
        setSubscribe(true)
        return data
    }

    const unSubscibeUser = async () => {
        const { data } = await axios.post(`/user/unsubscribe/${userData?._id}`)
        setSubscribe(false)
        return data
    }

    const navigate = useNavigate()

    const createConversation = async () => {
        try {
            const res = await axios.post('/chat/conversation', { senderId: currentUser?._id, reciverId: userData?._id });
            navigate('/chat')
            return res.data
        } catch (err) {
            console.warn(err)
            navigate('/chat')
        }
    }

    const checkIfOnline = (userId: string) => {
        return isOnlineUser.includes(userId);
    };

    const alreadyOnline = checkIfOnline(userData?._id);


    return (
        <>
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
                <h2 className='first-userName'>{userData?.userName}</h2>
                <div className='Top-Line'></div>
                <div className='info-content'>

                    {alreadyOnline ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar
                            alt={userData?.userName}
                            src={userData?.avatarUrl}
                            sx={{ width: 77, height: 77 }}
                        />
                    </StyledBadge>
                        : <Avatar
                            alt={userData?.userName}
                            src={userData?.avatarUrl}
                            sx={{ width: 77, height: 77 }}
                        />}
                    <div className="content">
                        <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                            <h2>{userData?.userName}</h2>
                            {userData.checkMark && <svg aria-label="Подтвержденный" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Подтвержденный</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {
                                subscribe ?
                                    <Button
                                        onClick={unSubscibeUser}
                                        sx={{
                                            width: '192px',
                                            height: '32px',
                                            backgroundColor: '#0095f6',
                                            '&:hover': {
                                                backgroundColor: '#0095f6',
                                            },
                                        }}>
                                        <span style={{ fontSize: '13px', color: 'white' }}>Отписаться</span>
                                    </Button>
                                    : <Button
                                        onClick={subscibeUser}
                                        sx={{
                                            width: '192px',
                                            height: '32px',
                                            backgroundColor: '#0095f6',
                                            '&:hover': {
                                                backgroundColor: '#0095f6',
                                            },
                                        }}>
                                        <span style={{ fontSize: '13px', color: 'white' }}>Подписаться</span>
                                    </Button>
                            }
                            <Button
                                onClick={createConversation}
                                sx={{
                                    width: '192px',
                                    height: '32px',
                                    backgroundColor: '#0095f6',
                                    '&:hover': {
                                        backgroundColor: '#0095f6',
                                    },
                                }}>
                                <span style={{ fontSize: '13px', color: 'white' }}>Написать</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div style={{ padding: '14px' }}>
                    <p>{userData?.desc}</p>
                </div>
                <div className='items'>
                    <div className="items-first-line"></div>
                    <span style={{ cursor: 'pointer' }} onClick={() => setSelectedType('posts')}>{userData?.createdPosts.length} <span style={{ color: 'grey', display: 'flex' }}>публикаций</span></span>
                    <span style={{ cursor: 'pointer' }} onClick={handleOpen}>{userData?.subscribers.length} <span style={{ color: 'grey', display: 'flex' }}>подписчика</span></span>
                    <span style={{ cursor: 'pointer' }} onClick={handleOpenLast}>{userData?.subscribed.length} <span style={{ color: 'grey', display: 'flex' }}>подписок</span></span>
                    <div className="items-last-line"></div>
                </div>
                {userData?.blocked ?
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h3 style={{ fontSize: '15px' }}>Это закрытый аккаунт</h3>
                        <h3 style={{ fontSize: '15px' }}>Подпишитесь, чтобы видеть его/ее фото и видео.</h3>
                    </div> : <>
                        <div className="profile-icons">
                            <Checkbox
                                checked={selectedType === 'posts'}
                                onClick={() => handleCheckboxClick('posts')}
                                {...label}
                                icon={<GridViewIcon />}
                                checkedIcon={<DashboardIcon />}
                            />
                            <div className="line-for-icons"></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {selectedType === 'posts' && (
                                createdPosts.length === 0 ? <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                    <h1>Пока нету публикаций</h1>
                                </div>
                                    : <div className='Mobile-Cards-Container'>
                                        {createdPosts.map((post: CardTypes) => (
                                            <MobileProfileCards key={post._id} id={post._id} imageUrl={post.imageUrl} likes={post.likes} desc={post.desc} createdAt={post.createdAt} tags={post.tags} user={post.user} />
                                        ))}
                                    </div>
                            )}
                        </div></>}
            </div >
        </>
    )
}

export default MobileAnotherProfile