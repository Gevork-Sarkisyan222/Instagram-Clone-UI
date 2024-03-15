import React from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import './mobileProfile.scss'
import ProfileList from '../../../components/ForProfile/ProfileList';

function MobileProfile() {
    const { currentUser } = useSelector((state: any) => state.user)

    return (
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
                        // onClick={handleOpenEditProfile}
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
            <div className='items'>
                <span>{currentUser?.createdPosts.length} <span style={{ color: 'grey', display: 'flex' }}>публикаций</span></span>
                <span>{currentUser?.subscribers.length} <span style={{ color: 'grey', display: 'flex' }}>подписчика</span></span>
                <span>{currentUser?.subscribed.length} <span style={{ color: 'grey', display: 'flex' }}>подписок</span></span>
            </div>
        </div>
    )
}

export default MobileProfile