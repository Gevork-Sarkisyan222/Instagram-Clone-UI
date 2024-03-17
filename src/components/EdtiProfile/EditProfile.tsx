import React, { useState } from 'react';
import './EditProfile.scss';
import { Avatar, Button, TextField, useMediaQuery } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import app from '../../firebase';
import UserNameModal from '@mui/material/Modal';
import EmailModal from '@mui/material/Modal';
import DescModal from '@mui/material/Modal';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from '../../axios';
import { useSelector } from 'react-redux';

function EditProfile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [changeAvatar, setChangeAvatar] = React.useState<any>(null);

  // poles
  const [changeUserName, setChangeUserName] = React.useState('');
  const [changeEmail, setChangeEmail] = React.useState('');
  const [descAbout, setDescAbout] = React.useState('');
  const [makePrivate, setMakePrivate] = React.useState(false);
  const [changeAvatarUrl, setChangeAvatarUrl] = React.useState<string>('');

  // =========================
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const uploadFile = (file: File | null) => {
    if (!file) return;

    const storage = getStorage(app);
    const newFile = new Date().getMinutes() + file?.name;
    const storageRef = ref(storage, newFile);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL: any) => {
          setChangeAvatarUrl(downloadURL);
        });
      })
      .catch((error: any) => {
        console.warn(error);
      });
  };

  React.useEffect(() => {
    changeAvatar && uploadFile(changeAvatar);
  }, [changeAvatar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setChangeAvatar(e.target.files[0]);
    }
  };

  const [openUserName, setOpenUserName] = React.useState(false);
  const handleOpenUserName = () => setOpenUserName(true);
  const handleCloseUserName = () => setOpenUserName(false);

  const [openEmail, setOpenEmail] = React.useState(false);
  const handleOpenEmail = () => setOpenEmail(true);
  const handleCloseEmail = () => setOpenEmail(false);

  const [openDesc, setOpenDesc] = React.useState(false);
  const handleOpenDesc = () => setOpenDesc(true);
  const handleCloseDesc = () => setOpenDesc(false);

  const editUser = async () => {
    handleCloseUserName();
    handleCloseEmail();
    handleCloseDesc();

    const requestData: any = {};
    if (changeAvatarUrl) requestData.avatarUrl = changeAvatarUrl;
    if (changeUserName) requestData.userName = changeUserName;
    if (changeEmail) requestData.email = changeEmail;
    if (descAbout) requestData.desc = descAbout;
    if (makePrivate) requestData.blocked = makePrivate;

    if (Object.keys(requestData).length === 0) {
      return;
    }

    const res = await axios.patch(`/user/edit/${currentUser._id}`, requestData);
    window.location.reload();
    return res.data;
  };

  const editUserMakeGeneral = async () => {
    const res = await axios.patch(`/user/edit/${currentUser._id}`, { blocked: makePrivate });
    window.location.reload();
    return res.data;
  };

  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobileScreen ? '65%' : 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  };



  return isMobileScreen ?
    <>
      <UserNameModal
        open={openUserName}
        onClose={handleCloseUserName}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2>Изменить имя пользователья</h2>
          <TextField
            onChange={(e) => setChangeUserName(e.target.value)}
            id="filled-basic"
            label="Имя пользователья"
            defaultValue={currentUser.userName}
            variant="filled"
          />
          <Button onClick={editUser} sx={{ marginTop: '25px' }} variant="contained">
            Сохранить
          </Button>
        </Box>
      </UserNameModal>
      <EmailModal
        open={openEmail}
        onClose={handleCloseEmail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2>Изменить почту</h2>
          <TextField
            onChange={(e) => setChangeEmail(e.target.value)}
            id="filled-basic"
            label="Почта"
            defaultValue={currentUser.email}
            variant="filled"
          />
          <Button onClick={editUser} sx={{ marginTop: '15px' }} variant="contained">
            Сохранить
          </Button>
        </Box>
      </EmailModal>
      <DescModal
        open={openDesc}
        onClose={handleCloseDesc}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2>Напишите описание</h2>
          <TextField
            id="filled-multiline-static"
            label="Напишите"
            defaultValue={currentUser.desc}
            onChange={(e) => setDescAbout(e.target.value)}
            multiline
            rows={4}
            variant="filled"
          />
          <Button onClick={editUser} sx={{ marginTop: '15px' }} variant="contained">
            Сохранить
          </Button>
        </Box>
      </DescModal>
      <div className="wrapper">
        <h2>Редактировать профиль</h2>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <div className="avatar-text">
            <h2>Фото профиля</h2>
          </div>
          <div className="avatar-button">
            <Button onClick={() => avatarRef?.current?.click()} variant="text">
              Редактировать
            </Button>
            <input
              onChangeCapture={handleChange}
              onChange={(e: any) => setChangeAvatarUrl(e.target.files[0])}
              ref={avatarRef}
              type="file"
              hidden
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '95px',
            }}>
            <Avatar
              onClick={() => avatarRef?.current?.click()}
              sx={{ width: '160px', height: '160px', cursor: 'pointer', marginTop: '-71px' }}
              alt={currentUser.userName}
              src={
                changeAvatarUrl
                  ? changeAvatarUrl
                  : currentUser.avatarUrl
                    ? currentUser.avatarUrl
                    : '/broken-image.jpg'
              }
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={editUser}
              sx={{ width: '100px', height: '40px', marginTop: '15px' }}
              variant="contained">
              Сохранить
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '85px',
              flexDirection: 'column',
            }}>
            <h2 style={{ marginRight: '9px' }}>Имя пользователья</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
              }}>
              <span>{currentUser.userName}</span>
              <Button
                onClick={handleOpenUserName}
                sx={{ width: '100px', height: '40px' }}
                variant="contained">
                Изменить
              </Button>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '85px',
              flexDirection: 'column',
            }}>
            <article
              style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <h2>Почта</h2>
            </article>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
              }}>
              <span>{currentUser.email}</span>
              <Button
                onClick={handleOpenEmail}
                sx={{ width: '100px', height: '40px' }}
                variant="contained">
                Изменить
              </Button>
            </div>
          </div>
        </div>
        <div className="desc">
          <h2>Наиши о себе</h2>
          <Button
            onClick={handleOpenDesc}
            sx={{ width: '260px', height: '40px', marginRight: '8px' }}
            variant="contained">
            Наисать описание
          </Button>
        </div>
        <div className="make-private">
          <h2>Сделать аккаунт {currentUser.blocked ? 'доступным' : 'приватным'}</h2>
          {currentUser.blocked ? (
            <Button
              onClick={editUserMakeGeneral}
              onClickCapture={() => setMakePrivate(false)}
              sx={{ width: '260px', height: '40px', marginRight: '8px' }}
              variant="contained">
              Сделать доступным
            </Button>
          ) : (
            <Button
              onClick={editUser}
              onClickCapture={() => setMakePrivate(true)}
              sx={{ width: '260px', height: '40px', marginRight: '8px' }}
              variant="contained">
              Сделать приватным
            </Button>
          )}
        </div>
      </div>
    </> : (
      <>
        <UserNameModal
          open={openUserName}
          onClose={handleCloseUserName}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <h2>Изменить имя пользователья</h2>
            <TextField
              onChange={(e) => setChangeUserName(e.target.value)}
              id="filled-basic"
              label="Имя пользователья"
              defaultValue={currentUser.userName}
              variant="filled"
            />
            <Button onClick={editUser} sx={{ marginTop: '25px' }} variant="contained">
              Сохранить
            </Button>
          </Box>
        </UserNameModal>
        <EmailModal
          open={openEmail}
          onClose={handleCloseEmail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <h2>Изменить почту</h2>
            <TextField
              onChange={(e) => setChangeEmail(e.target.value)}
              id="filled-basic"
              label="Почта"
              defaultValue={currentUser.email}
              variant="filled"
            />
            <Button onClick={editUser} sx={{ marginTop: '15px' }} variant="contained">
              Сохранить
            </Button>
          </Box>
        </EmailModal>
        <DescModal
          open={openDesc}
          onClose={handleCloseDesc}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <h2>Напишите описание</h2>
            <TextField
              id="filled-multiline-static"
              label="Напишите"
              defaultValue={currentUser.desc}
              onChange={(e) => setDescAbout(e.target.value)}
              multiline
              rows={4}
              variant="filled"
            />
            <Button onClick={editUser} sx={{ marginTop: '15px' }} variant="contained">
              Сохранить
            </Button>
          </Box>
        </DescModal>
        <div className="wrapper">
          <h2>Редактировать профиль</h2>
          <div>
            <div className="avatar-text">
              <h2>Фото профиля</h2>
            </div>
            <div className="avatar-button">
              <Button onClick={() => avatarRef?.current?.click()} variant="text">
                Редактировать
              </Button>
              <input
                onChangeCapture={handleChange}
                onChange={(e: any) => setChangeAvatarUrl(e.target.files[0])}
                ref={avatarRef}
                type="file"
                hidden
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '95px',
              }}>
              <Avatar
                onClick={() => avatarRef?.current?.click()}
                sx={{ width: '160px', height: '160px', cursor: 'pointer', marginTop: '-71px' }}
                alt={currentUser.userName}
                src={
                  changeAvatarUrl
                    ? changeAvatarUrl
                    : currentUser.avatarUrl
                      ? currentUser.avatarUrl
                      : '/broken-image.jpg'
                }
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={editUser}
                sx={{ width: '100px', height: '40px', marginTop: '15px' }}
                variant="contained">
                Сохранить
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '85px',
                flexDirection: 'column',
              }}>
              <h2 style={{ marginRight: '9px' }}>Имя пользователья</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                <span>{currentUser.userName}</span>
                <Button
                  onClick={handleOpenUserName}
                  sx={{ width: '100px', height: '40px' }}
                  variant="contained">
                  Изменить
                </Button>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '85px',
                flexDirection: 'column',
              }}>
              <article
                style={{ display: 'flex', justifyContent: 'flex-start', marginRight: '188px' }}>
                <h2 style={{ marginLeft: '211px' }}>Почта</h2>
              </article>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                <span>{currentUser.email}</span>
                <Button
                  onClick={handleOpenEmail}
                  sx={{ width: '100px', height: '40px' }}
                  variant="contained">
                  Изменить
                </Button>
              </div>
            </div>
          </div>
          <div className="desc">
            <h2>Наиши о себе</h2>
            <Button
              onClick={handleOpenDesc}
              sx={{ width: '260px', height: '40px', marginRight: '8px' }}
              variant="contained">
              Наисать описание
            </Button>
          </div>
          <div className="make-private">
            <h2>Сделать аккаунт {currentUser.blocked ? 'доступным' : 'приватным'}</h2>
            {currentUser.blocked ? (
              <Button
                onClick={editUserMakeGeneral}
                onClickCapture={() => setMakePrivate(false)}
                sx={{ width: '260px', height: '40px', marginRight: '8px' }}
                variant="contained">
                Сделать доступным
              </Button>
            ) : (
              <Button
                onClick={editUser}
                onClickCapture={() => setMakePrivate(true)}
                sx={{ width: '260px', height: '40px', marginRight: '8px' }}
                variant="contained">
                Сделать приватным
              </Button>
            )}
          </div>
        </div>
      </>
    );
}

export default EditProfile;
