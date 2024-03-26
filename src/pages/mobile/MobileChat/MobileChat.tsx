import React from 'react';
import './mobileChat.scss';
import { Avatar, useMediaQuery, Button } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import Textarea from '@mui/joy/Textarea';
import { useSelector } from 'react-redux';
import axios from '../../../axios';
import { UserType } from '../../chat/Chat';
import UserAvatar from './UserAvatar';
import { SenderUser } from '../../chat/MessageSection';

interface PropsTypes {
    currentChat: any;
    convUser: UserType;
    conversations: any;
    setCurrentChat: any
}

type MessagesType = {
    sender: string;
    text: string;
}

const MobileChat: React.FC<PropsTypes> = ({ currentChat, convUser, conversations, setCurrentChat }) => {
    const { currentUser } = useSelector((state: any) => state.user)
    const isMobileScreen = useMediaQuery('(max-width:420px)');
    const isVerySmallMobileScreen = useMediaQuery('(max-width:380px)');
    const [messageText, setMessageText] = React.useState('')

    const [messages, setMessages] = React.useState<MessagesType[]>([])


    let textAreaWidth = '291px';

    if (isVerySmallMobileScreen) {
        textAreaWidth = '235px';
    } else if (isMobileScreen) {
        textAreaWidth = '265px';
    }

    const [user, setUser] = React.useState<UserType | null>(null);

    React.useEffect(() => {
        if (conversations && conversations.members) {
            const friendId = conversations.members.find((m: UserType) => m !== currentUser?._id);

            const getUser = async () => {
                try {
                    const res = await axios.get(`/user/get/${friendId}`);
                    setUser(res.data);
                    console.log(res.data);
                } catch (err) {
                    console.warn(err);
                }
            };

            getUser();
        }
    }, [currentUser, conversations]);

    console.log('current conv mobile', currentChat)

    React.useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/chat/conversation/messages/${currentChat?._id}`)
                setMessages(res.data)
            } catch (err) {
                console.warn(err)
            }
        }

        getMessages();
    }, [currentChat])


    const createMessage = async () => {
        const receiverId = currentChat?.members.find(
            (member: any) => member !== currentUser?._id
        );

        // await socket.current.emit('sendMessageInstagram', {
        //     senderId: currentUser?._id,
        //     receiverId,
        //     text: messageText
        // })

        try {
            const res = await axios.post('/chat/conversation/message', {
                conversationId: currentChat?._id,
                sender: currentUser?._id,
                text: messageText
            })
            setMessageText('');
            setMessages((prev) => [...prev, res.data]);
            return res.data
        } catch (err) {
            console.warn(err)
        }
    }

    return (
        <div className='MobileChat'>
            <div className='chat-container'>
                <h2>Чаты</h2>
                <div className="avatars">
                    {conversations.length === 0 ? <div><h2 style={{ fontSize: '20px' }}>Нету чатов</h2></div> : conversations.map((conversation: any) => (
                        <div className='content-avatar' onClick={() => setCurrentChat(conversation)}>
                            <UserAvatar key={conversation?._id} conversation={conversation} />
                        </div>
                    ))}
                </div>
                <div className='left-line-border'></div>
            </div>
            <div className="Right-Chat-Conv">
                {currentChat ? <>
                    <div className="top-chat">
                        <Avatar
                            // onClick={handleWentToProfile}
                            sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
                            alt={convUser.userName}
                            src={convUser.avatarUrl ? convUser.avatarUrl : '/broken-image.jpg'}
                        />
                        <span style={{ fontSize: '17px' }}>{convUser.userName}</span>
                        <CallIcon sx={{ cursor: 'pointer' }} />
                        <VideocamIcon sx={{ cursor: 'pointer' }} />
                        <FolderDeleteIcon sx={{ cursor: 'pointer' }} />
                        <div className="top-line"></div>
                    </div>
                    <section className='conv-section'>
                        {
                            messages.map((message) => (
                                <div style={{ justifyContent: currentUser?._id === message.sender ? 'flex-end' : 'initial' }} className='message-box'>
                                    <Avatar
                                        // onClick={handleWentToProfile}
                                        sx={{ width: '28px', height: '28px', cursor: 'pointer' }}
                                        alt={convUser?.userName}
                                        src={convUser?.avatarUrl ? convUser?.avatarUrl : '/broken-image.jpg'}
                                    />
                                    <div style={{ background: currentUser?._id === message.sender ? '#3797f0' : '#f1f1f1', color: currentUser?._id === message.sender ? 'white' : '#000' }} className='message-border'>
                                        {message?.text}
                                    </div>
                                </div>
                            ))
                        }

                    </section>
                </> :
                    <div style={{ margin: '50px' }}>
                        <h2>Выберите чат</h2>
                    </div>
                }
            </div>
            <div className='Text-Area'>
                <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    color="neutral"
                    disabled={false}
                    minRows={2}
                    placeholder="Напишите сообщение..."
                    size="md"
                    variant="outlined"
                    sx={{ borderRadius: '20px', width: textAreaWidth, height: '44px' }}
                />
                {messageText && <article className="btn"><Button onClick={createMessage} variant="text">Отправить</Button></article>}
            </div>
        </div >
    )
}

export default MobileChat