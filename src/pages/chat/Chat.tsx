import React from 'react'
import UserBox from './UserBox';
import './Chat.scss'
import { Avatar, useMediaQuery } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MessageInput from './MessageInput';
import MessageSection from './MessageSection';
import { useSelector } from 'react-redux';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import { isAuthenticated } from '../../redux/slices/user.slice';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ErrorToLogin from '../../components/ErrorToLogin';
import { io } from 'socket.io-client'
import MobileChat from '../mobile/MobileChat/MobileChat';

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



type MessageType = {
    _id: string;
    sender: string;
    text: string;
    conversationId: string
    createdAt: string
}

type UserType = {
    userName: string;
    avatarUrl: string
}

interface PropsTypes {
    socket: any
    isOnlineUser: string[];
    setIsOnlineUser: React.Dispatch<React.SetStateAction<string[]>>;
}


const Chat: React.FC<PropsTypes> = ({ socket, isOnlineUser, setIsOnlineUser }) => {
    const { currentUser } = useSelector((state: any) => state.user);
    const isAuthenticatedUser = useSelector(isAuthenticated);
    const [currentChat, setCurrentChat] = React.useState<any>(null);
    const [messages, setMessages] = React.useState<MessageType[]>([]);
    const [conversations, setConversations] = React.useState<any>([]);
    const [convUser, setConvUser] = React.useState<any>([])
    const navigate = useNavigate();
    const [messageText, setMessageText] = React.useState('')
    const scrollRef = React.useRef<HTMLDivElement | null>(null)
    const [arrivalMessage, setArrivalMessage] = React.useState<any>(null)
    const [editedMessage, setEditedMessage] = React.useState('')


    console.log('arrivalMessage', arrivalMessage)

    // get deleted message
    // React.useEffect(() => {
    //     socket.current?.on('messageDeletedInstagram', (data: any) => {
    //         setArrivalMessage([]);
    //         // setMessages((prev) => prev.filter((msg) => msg._id !== data.messageId));
    //     });
    // });
    React.useEffect(() => {
        socket.current?.on('messageDeletedInstagram', (data: any) => {
            setMessages((prevMessages: any) => prevMessages.filter((message: any) => message._id !== data.messageId));
        });

        return () => {
            socket.current?.off('messageDeletedInstagram');
        };
    }, [socket]);

    // edit message
    React.useEffect(() => {
        socket.current?.on('messageEditedInstagram', (data: any) => {
            setMessages((prevMessages) => {
                return prevMessages.map((message) =>
                    message._id === data.messageId ? { ...message, text: data.editedMessage } : message,
                );
            });
        });

        return () => {
            socket.current?.off('messageEditedInstagram');
        };
    }, [socket, setMessages])


    // get message
    React.useEffect(() => {
        socket.current?.on('getMessageInstagram', (data: any) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, [socket]);

    React.useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)
            && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])



    React.useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    React.useEffect(() => {
        socket.current?.on('getUsers', (users: any) => {
            setIsOnlineUser(users.map((user: any) => user.userId));
        });
    }, [currentUser]);

    const checkIfOnline = (userId: string) => {
        return isOnlineUser.includes(userId);
    };

    const handleWentToProfile = () => {
        if (currentUser?._id === convUser?._id) {
            navigate('/profile')
        } else {
            navigate(`/profile/${convUser?._id}`)
        }
    }

    React.useEffect(() => {
        const getUserConversations = async () => {
            try {
                const res = await axios.get(`/chat/conversation/${currentUser?._id}`);
                setConversations(res.data);
            } catch (err) {
                alert(err);
                console.warn(err);
            }
        };
        getUserConversations();
    }, [currentUser?._id]);



    console.log('current chat here >', currentChat)

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


    React.useEffect(() => {
        const getConversatonUser = async () => {
            const friendId = currentChat?.members.find((m: UserType) => m !== currentUser?._id)
            try {
                const res = await axios.get(`/user/get/${friendId}`)
                setConvUser(res.data)
                console.log('getConversatonUser', res.data)
            } catch (err) {
                console.warn(err)
            }
        }
        getConversatonUser()
    }, [currentChat])


    const createMessage = async () => {
        const receiverId = currentChat?.members.find(
            (member: any) => member !== currentUser?._id
        );

        await socket.current.emit('sendMessageInstagram', {
            senderId: currentUser?._id,
            receiverId,
            text: messageText
        })

        try {
            const res = await axios.post('/chat/conversation/message', {
                conversationId: currentChat?._id,
                sender: currentUser?._id,
                text: messageText
            })
            setMessageText('')
            setMessages((prev) => [...prev, res.data]);
            return res.data
        } catch (err) {
            console.warn(err)
        }
    }


    const deleteConversation = async () => {
        try {
            const message = window.confirm(`Вы действительно хотите удалить чат с ${convUser?.userName}?`)
            if (message) {
                const res = await axios.delete(`/chat/conversation/${currentChat?._id}`)
                window.location.reload()
                return res.data
            }
        } catch (err) {
            alert('Ну удалось удалить чат')
            console.warn(err)
        }

    }

    const handleOpenCameraCall = () => {
        alert('call me baby')
    }


    const alreadyOnline = checkIfOnline(convUser?._id)
    console.log('arrivalMessage after', arrivalMessage)

    const isMobileScreen = useMediaQuery('(max-width:600px)');



    if (isAuthenticatedUser) {
        return (
            isMobileScreen ? <MobileChat /> : <div className='Main-Chat'>
                <div className='left-userSide'>
                    <section className='text-section'>
                        <h2>Сообщения</h2>
                        <h2>Запросы</h2>
                    </section>
                    <div className='users-box-section'>
                        {conversations.length === 0 ? <div><h2>Нету чатов</h2></div> : conversations.map((conversation: any) => (
                            <div onClick={() => setCurrentChat(conversation)}>
                                <UserBox key={conversation?._id} checkIfOnline={checkIfOnline} conversation={conversation} />
                            </div>
                        ))}
                    </div>
                    <div className='line-for-chat'></div>
                </div>
                {currentChat ? (
                    <div>
                        <div className='Chat-Section'>
                            <div className='top-content'>
                                {alreadyOnline ? <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                > <Avatar onClick={handleWentToProfile} sx={{ width: '44px', height: '44px' }} alt={convUser.userName} src={convUser.avatarUrl ? convUser.avatarUrl : '/broken-image.jpg'} /></StyledBadge> : <Avatar onClick={handleWentToProfile} sx={{ width: '44px', height: '44px' }} alt={convUser.userName} src={convUser.avatarUrl ? convUser.avatarUrl : '/broken-image.jpg'} />}
                                <span onClick={handleWentToProfile}>{convUser.userName}</span>
                                <div className="icons-toCall">
                                    <CallIcon onClick={handleOpenCameraCall} sx={{ cursor: 'pointer' }} />
                                    <VideocamIcon onClick={handleOpenCameraCall} sx={{ cursor: 'pointer' }} />
                                    <FolderDeleteIcon onClick={deleteConversation} sx={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                            <div className='underline'></div>
                            <div className='Chat-Area'>
                                <div style={{ display: 'flex', marginTop: '15px', flexDirection: 'column', gap: '15px' }}>
                                    {messages.length === 0 ? <div><h1 style={{ textAlign: 'center', color: "grey" }}>Сообшение пустые напишите что то</h1></div> : messages.map((message: any) => (
                                        <div ref={scrollRef}>
                                            <MessageSection key={message._id} message={message} own={message.sender === currentUser._id} setMessages={setMessages} socket={socket} currentChat={currentChat} editedMessage={editedMessage} setEditedMessage={setEditedMessage} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='write-message'>
                            <MessageInput messageText={messageText} setMessageText={setMessageText} createMessage={createMessage} />
                        </div>
                    </div>
                ) : <div>
                    <h1 className='no-conversation-text'>Выберите директ для чата</h1>
                </div>}
            </div>
        );
    } else {
        return <ErrorToLogin />
    }
};

export default Chat;
