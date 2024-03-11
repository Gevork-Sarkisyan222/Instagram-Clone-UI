import React from 'react';
import '../App.scss';
import Avatar from '@mui/material/Avatar';
import PostCard from '../components/PostCard/PostCard';
import RightPanel from '../components/Right-Panel/RightPanel';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../redux/slices/user.slice';
import ErrorToLogin from '../components/ErrorToLogin';
import axios from '.././axios';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { UserTypeForResponese } from './Home';

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

type UserType = {
    avatarUrl?: string;
    userName: string;
};

interface Post {
    _id: string;
    imageUrl: string;
    desc: string;
    tags: string[];
    likes: string[];
    saves: string[];
    viewers: number;
    createdAt: string;
    user: UserType;
}

interface HomeMobileTypes {
    yourSubscribed: UserTypeForResponese[];
    posts: Post[];
    checkIfOnline: (userId: string) => boolean;
}


const MobileHome: React.FC<HomeMobileTypes> = ({ yourSubscribed, posts, checkIfOnline }) => {
    return (
        <div>
            <div className="main">
                <div className="high-section">
                    <div className="accaunts">
                        {/* 9 avatars */}
                        {yourSubscribed.map((obj) => (
                            <Link key={obj?._id} to={`/profile/${obj?._id}`}>
                                {
                                    checkIfOnline(obj?._id) ? <div><StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    ><Avatar
                                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                                            alt={obj?.userName}
                                            src={obj?.avatarUrl ? obj?.avatarUrl : '/broken-image.jpg'}
                                        />
                                    </StyledBadge></div> : <Avatar
                                        sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                                        alt={obj?.userName}
                                        src={obj?.avatarUrl ? obj?.avatarUrl : '/broken-image.jpg'}
                                    />
                                }

                            </Link>
                        ))}
                    </div>
                </div>
                <div className="posts-section-mobile">
                    {posts.map((obj: any) => (
                        <PostCard
                            key={obj._id}
                            alreadyOnline={checkIfOnline(obj.user._id)}
                            id={obj._id}
                            imageUrl={obj.imageUrl}
                            desc={obj.desc}
                            tags={obj.tags}
                            likes={obj.likes}
                            saves={obj.saves}
                            viewers={obj.viewers}
                            commentsPost={obj.comments}
                            createdAt={obj.createdAt}
                            user={obj.user}
                            checkMark={obj.checkMark}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MobileHome