import React from 'react';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios'
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

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


interface props {
    conversation: any;
    checkIfOnline: (userId: string) => boolean
}

type UserType = {
    _id: string;
    userName: string;
    avatarUrl: string
}

const UserBox: React.FC<props> = ({ conversation, checkIfOnline }) => {
    const [user, setUser] = React.useState<UserType | null>(null);
    const { currentUser } = useSelector((state: any) => state.user)

    React.useEffect(() => {
        const friendId = conversation.members.find((m: UserType) => m !== currentUser?._id)


        const getUser = async () => {
            try {
                const res = await axios.get(`/user/get/${friendId}`)
                setUser(res.data)
                console.log(res.data)
            } catch (err) {
                console.warn(err)
            }
        }
        getUser()
    }, [currentUser, conversation])

    console.log('user', user)

    const alreadyOnline = user?._id ? checkIfOnline(user._id) : false;


    return (
        <div className='user-box'>
            {user ? alreadyOnline ? <><StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            ><Avatar sx={{ width: '56px', height: '56px' }} alt={user.userName} src={user && user?.avatarUrl ? user?.avatarUrl : '/broken-image.jpg'} /></StyledBadge>  <span>{user.userName}</span></> : <><Avatar sx={{ width: '56px', height: '56px' }} alt={user.userName} src={user && user?.avatarUrl ? user?.avatarUrl : '/broken-image.jpg'} />
                <span>{user.userName}</span></> : <div>загрузка...</div>}
        </div>
    )
}

export default UserBox