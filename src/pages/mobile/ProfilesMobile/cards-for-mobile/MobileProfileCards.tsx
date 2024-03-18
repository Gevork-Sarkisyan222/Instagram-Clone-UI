import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from '../../../../axios'
import { useSelector } from 'react-redux';
import { format, register } from 'timeago.js';
import { useNavigate } from 'react-router-dom';
import LikedUsersItems from '../../../../components/PostCard/LikedUsersItems';
import PostLikedUsersModal from '@mui/material/Modal';
import { LikedUserTypes } from '../../../../components/PostCard/PostCard';
import './cards-for-mobile.scss';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '@mui/material/Modal';
import EditPost from '../../../../components/ForProfile/EditPost';
import DeleteIcon from '@mui/icons-material/Delete';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '550px',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

type UserType = {
    _id: string;
    userName: string;
    avatarUrl?: string
    checkMark: boolean
}

interface propsTypes {
    id: string;
    imageUrl: string;
    likes: string[];
    desc: string;
    tags: string;
    createdAt: string;
    user: UserType;
}

const styleForLikedUsersList = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxHeight: '400px',
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    overflow: 'auto',
};


const MobileProfileCards: React.FC<propsTypes> = ({ id, imageUrl, likes, desc, tags, createdAt, user }) => {
    const { currentUser } = useSelector((state: any) => state.user)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // for checkbox
    const [liked, setLiked] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

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


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    // check if it already liked or saved
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

    const date = new Date(createdAt);
    const formattedDate = format(date, 'ru');

    const navigate = useNavigate()

    const [openLikesModal, setOpenLikesModal] = React.useState(false);

    const handleOpenlikes = () => {
        setOpenLikesModal(true);
    };

    const handleCloseLikes = () => {
        setOpenLikesModal(false);
    };

    const handleWentToProfile = () => {
        if (currentUser?._id === user?._id) {
            navigate('/profile')
        } else {
            navigate(`/profile/${user?._id}`)
        }
    }

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

    const [openEditModal, setOpenEditModal] = React.useState(false);

    const hanldeOpenEditModal = () => {
        setOpenEditModal(true)
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false)
    }

    const deletePost = async () => {
        const message = window.confirm('Вы действительно хотите удалить ваш пост?');

        if (message) {
            await axios.delete(`/post/delete/${id}`);
        }
    };

    return (
        <>
            <EditModal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <EditPost id={id} imageUrl={imageUrl} desc={desc} tags={tags} handleClose={handleClose} handleCloseEditModal={handleCloseEditModal} />
            </EditModal>
            <PostLikedUsersModal
                open={openLikesModal}
                onClose={handleCloseLikes}
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Avatar onClick={handleWentToProfile} sx={{ cursor: 'pointer' }} src={user?.avatarUrl ? user?.avatarUrl : "/broken-image.jpg"} />
                        <Typography onClick={handleWentToProfile} id="modal-modal-title" variant="h6" component="h2">
                            {user?.userName}
                        </Typography>
                        {user?.checkMark && <svg aria-label="Подтвержденный" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Подтвержденный</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>}
                        {currentUser?._id === user?._id && <EditIcon onClick={hanldeOpenEditModal} sx={{ position: 'absolute', right: '60px', cursor: 'pointer' }} />}
                        {currentUser?._id === user?._id && <DeleteIcon onClick={deletePost} sx={{ position: 'absolute', right: '30px', cursor: 'pointer' }} />}
                    </div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <img className='postImage-for-modal' src={imageUrl} alt={`post with id > ${id}`} />
                    </div>
                    <article className='icons-for-modal'>
                        <Checkbox
                            {...label}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: 'red' }} />}
                            onClick={handleCheckboxClickToLike}
                            checked={liked}
                        />
                        <div>
                            <Checkbox
                                {...label}
                                icon={<BookmarkBorderIcon />}
                                checkedIcon={<BookmarkIcon sx={{ color: 'black' }} />}
                                onClick={handleCheckboxClickToSave}
                                checked={saved}
                            />
                        </div>
                    </article>
                    <div>
                        <h4 style={{ cursor: 'pointer' }} onClick={handleOpenlikes}>{likes.length} отметок "Нравиться"</h4>
                        <p style={{ color: 'grey' }}>{formattedDate}</p>
                    </div>
                </Box>
            </Modal >
            <div className='MobileProfileCards'>
                <img onClick={handleOpen} src={imageUrl} alt={`post with id > ${id}`} />
            </div>
        </>
    )
}

export default MobileProfileCards