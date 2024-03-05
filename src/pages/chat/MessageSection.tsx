import React from 'react';
import { Avatar } from '@mui/material';
import './Chat.scss'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ru from 'timeago.js/lib/lang/ru';
import { format, register } from 'timeago.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
};


register('ru', ru);

type MessageType = {
    _id: string;
    conversationId: string
    sender: string;
    text: string;
    createdAt: string
}


interface MessagePropsTypes {
    message: MessageType;
    own: boolean
}

type SenderUser = {
    _id: string;
    userName: string;
    avatarUrl: string;
}

const MessageSection: React.FC<MessagePropsTypes> = ({ message, own }) => {
    const [senderUser, setSenderUser] = React.useState<SenderUser | null>(null);
    const navigate = useNavigate()
    const { currentUser } = useSelector((state: any) => state.user)
    const [editedMessage, setEditedMessage] = React.useState('')

    const handleWentToProfile = () => {
        if (currentUser._id === message.sender) {
            navigate('/profile')
        } else {
            navigate(`/profile/${message?.sender}`)
        }
    }


    React.useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/user/get/${message?.sender}`)
                setSenderUser(res.data)
                console.log(res.data)
            } catch (err) {
                console.warn(err)
            }
        }
        getUser()
    }, [])

    const formattedDate = format(message.createdAt, 'ru');

    const deleteMessage = async () => {
        try {
            const confirmAlert = window.confirm('Вы действительно хотите удалить ваше сообщение?')
            if (confirmAlert) {
                const res = await axios.delete(`/chat/conversation/message/${message?._id}`)
                return res.data
            }
        } catch (err) {
            console.warn(err)
        }
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const editMessage = async () => {
        try {
            const res = await axios.patch(`/chat/conversation/message/${message?._id}`, { text: editedMessage })
            handleClose()
            return res.data
        } catch (err) {
            console.warn(err)
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Изменить сообщение
                    </Typography>
                    <TextField onChange={(e) => setEditedMessage(e.target.value)} id="filled-basic" defaultValue={message?.text} variant="filled" />
                    <Button onClick={editMessage} variant='contained'>Сохранить</Button>
                </Box>
            </Modal>
            {
                own ?
                    <div className="own-message-section">
                        <div className='own-message-settings'>
                            <EditIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
                            <DeleteIcon onClick={deleteMessage} sx={{ cursor: 'pointer' }} />
                        </div>
                        <p style={{ fontSize: '11px' }}>{formattedDate}</p>
                        <div className='message-border'>
                            {message?.text}
                        </div>
                    </div>
                    : <div className="message-section">
                        <Avatar onClick={handleWentToProfile} sx={{ width: '27px', height: '27px', cursor: 'pointer' }} alt={senderUser?.userName} src={senderUser?.avatarUrl ? senderUser?.avatarUrl : ''} />
                        <div className='message-border'>
                            {message?.text}
                        </div>
                        <p style={{ fontSize: '11px' }}>{formattedDate}</p>
                    </div>
            }


        </>
    )
}

export default MessageSection