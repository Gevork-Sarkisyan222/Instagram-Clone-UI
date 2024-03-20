import React from 'react';
import './mobileChat.scss';
import { Avatar, useMediaQuery, Button } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import Textarea from '@mui/joy/Textarea';

interface PropsTypes {

}

const MobileChat: React.FC<PropsTypes> = ({ }) => {
    const isMobileScreen = useMediaQuery('(max-width:420px)');
    const isVerySmallMobileScreen = useMediaQuery('(max-width:380px)');
    const [message, setMessage] = React.useState('')

    let textAreaWidth = '291px';

    if (isVerySmallMobileScreen) {
        textAreaWidth = '235px';
    } else if (isMobileScreen) {
        textAreaWidth = '265px';
    }


    return (
        <div className='MobileChat'>
            <div className='chat-container'>
                <h2>Чаты</h2>
                <div className="avatars">
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                    <div className='content-avatar'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                    </div>
                </div>
                <div className='left-line-border'></div>
            </div>
            <div className="Right-Chat-Conv">
                <div className="top-chat">
                    <Avatar
                        // onClick={handleWentToProfile}
                        sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
                        // alt={user.userName}
                        // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                        src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                    />
                    <span style={{ fontSize: '17px' }}>jhonatan</span>
                    <CallIcon sx={{ cursor: 'pointer' }} />
                    <VideocamIcon sx={{ cursor: 'pointer' }} />
                    <FolderDeleteIcon sx={{ cursor: 'pointer' }} />
                    <div className="top-line"></div>
                </div>
                <section className='conv-section'>
                    <div className='message-box'>
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '28px', height: '28px', cursor: 'pointer' }}
                            // alt={user.userName}
                            // src={user.avatarUrl ? user.avatarUrl : '/broken-image.jpg'}
                            src={'https://scontent.cdninstagram.com/v/t51.2885-19/408896485_784064076776524_2748904233055191637_n.jpg?stp=dst-jpg_s100x100&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=sBtnb62HXbwAX-M6z0x&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=00_AfDZKy_SMHxP9jmXoOtE2IIM8r1DeHlOGNOen7nTBO-Myw&oe=65FEDFD6'}
                        />
                        <div className='message-border'>
                            barev
                        </div>
                    </div>
                </section>
            </div>
            <div className='Text-Area'>
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    color="neutral"
                    disabled={false}
                    minRows={2}
                    placeholder="Напишите сообщение..."
                    size="md"
                    variant="outlined"
                    sx={{ borderRadius: '20px', width: textAreaWidth, height: '44px' }}
                />
                {message && <article className="btn"><Button onClick={() => setMessage('')} variant="text">Отправить</Button></article>}
            </div>
        </div>
    )
}

export default MobileChat