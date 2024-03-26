import React from 'react';
import { Avatar, useMediaQuery, Button } from '@mui/material';
import { UserType } from '../../chat/Chat';
import { useSelector } from 'react-redux';
import axios from '../../../axios';

interface props {
    conversation: any;
}

const UserAvatar: React.FC<props> = ({ conversation }) => {
    const [user, setUser] = React.useState<UserType | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);


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



    return (
        <Avatar
            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
            alt={user?.userName}
            src={user?.avatarUrl ? user?.avatarUrl : '/broken-image.jpg'}
        />
    )
}

export default UserAvatar