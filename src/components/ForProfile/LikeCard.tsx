import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FullPost from '../FullPost/FullPost';
import { setOpenFullPost } from '../../redux/slices/openFullPost';
import { useNavigate } from 'react-router-dom';
import ru from 'timeago.js/lib/lang/ru';
import { format, register } from 'timeago.js';
import axios from '../../axios'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type User = {
  _id: string;
  userName: string;
  avatarUrl?: string;
  checkMark: boolean
};

interface PropsTypes {
  id: string;
  user: User;
  desc: string;
  imageUrl: string;
  createdAt: string;
}

const LikeCard: React.FC<PropsTypes> = ({ user, imageUrl, createdAt, desc, id }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(true);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.user)

  const handleWentToProfile = () => {
    if (currentUser._id === user._id) {
      window.location.reload()
    } else {
      navigate(`/profile/${user._id}`);
    }
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { openFullPost } = useSelector((state: any) => state.openFullPost);
  const dispatch = useDispatch();

  const handleOpenFullPostModal = () => {
    dispatch(setOpenFullPost(id));
  };

  register('ru', ru);

  const date = new Date(createdAt);
  const formattedDate = format(date, 'ru');


  const likePost = async () => {
    const res = await axios.post(`/post/like/${id}`)
    return res.data
  }

  const unlikePost = async () => {
    const res = await axios.delete(`/post/unlike/${id}`)
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

  return (
    <>
      {openFullPost && <FullPost />}
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <>
              <Avatar
                onClick={handleWentToProfile}
                sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                alt={user.userName}
                src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
              />
              {user.checkMark && <svg
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
                  fill-rule="evenodd"
                />
              </svg>}
            </>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          sx={{ cursor: 'pointer' }}
          subheader={formattedDate}
        />
        <CardMedia
          onClick={handleOpenFullPostModal}
          sx={{ cursor: 'pointer' }}
          component="img"
          height="194"
          image={imageUrl}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            checked={liked}
            onClick={handleCheckboxClickToLike}
          />
        </CardActions>
      </Card>
    </>
  );
};

export default LikeCard;
