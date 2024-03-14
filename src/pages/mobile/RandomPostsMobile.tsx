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
import axios from '../../axios'
import { useSelector } from 'react-redux';
import { format, register } from 'timeago.js';
import { useNavigate } from 'react-router-dom';


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
}

interface propsTypes {
    id: string;
    imageUrl: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    user: UserType;
}


const RandomPostsMobile: React.FC<propsTypes> = ({ id, imageUrl, likes, comments, createdAt, user }) => {
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

    const handleWentToProfile = () => {
        if (currentUser?._id === user?._id) {
            navigate('/profile')
        } else {
            navigate(`/profile/${user?._id}`)
        }
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Avatar onClick={handleWentToProfile} sx={{ cursor: 'pointer' }} src={user?.avatarUrl ? user?.avatarUrl : "/broken-image.jpg"} />
                        <Typography onClick={handleWentToProfile} id="modal-modal-title" variant="h6" component="h2">
                            {user?.userName}
                        </Typography>
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
                        <h4>{likes.length} отметок "Нравиться"</h4>
                        <p style={{ color: 'grey' }}>{formattedDate}</p>
                    </div>
                </Box>
            </Modal >
            <div className='RandomPostsMobile'>
                <img onClick={handleOpen} src={imageUrl} alt={`post with id > ${id}`} />
            </div>
        </>
    )
}

export default RandomPostsMobile