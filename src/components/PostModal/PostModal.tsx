import React from 'react';
import Button from '@mui/joy/Button';

// modal imports
import Box from '@mui/material/Box';
import CreatePostModal from '@mui/material/Modal';

import app from '../.././firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from '../../axios';
import { useMediaQuery } from '@mui/material'



interface ModalProps {
  handleClosePostModal: () => void;
}

const PostModal: React.FC<ModalProps> = ({ handleClosePostModal }) => {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = React.useState<any>(null);
  const [continueCreation, setContinueCreation] = React.useState<boolean>(false);
  // post create states
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [desc, setDesc] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');
  const isMobileScreen = useMediaQuery('(max-width:600px)');


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobileScreen ? '70%' : '422px',
    height: 322,
    borderRadius: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #grey',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  };

  const continueStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobileScreen ? '75%' : '422px',
    height: 322,
    borderRadius: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #grey',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  };

  console.log(imageUrl)

  const uploadFile = (file: File | null) => {
    if (!file) return;

    const storage = getStorage(app);
    const newFile = new Date().getMinutes() + file?.name;
    const storageRef = ref(storage, newFile);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL: any) => {
          setImageUrl(downloadURL);
        });
      })
      .catch((error: any) => {
        console.warn(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileImage(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    fileImage && uploadFile(fileImage);
  }, [fileImage]);

  const handleStartContinue = () => {
    setContinueCreation(true);
  };

  // create a post
  const createPost = async () => {
    handleClosePostModal();
    const postData = { imageUrl, desc, tags };
    const res = await axios.post('/post/create', postData);
    return res.data;
  };

  return (
    <>
      {continueCreation ? (
        <Box sx={continueStyle}>
          <div className="Continue-Container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '-33ыpx',
              }}>
              <h3 style={{ marginRight: '163px' }}>Создание публикации</h3>
              <br />
              <TextField
                sx={{ marginTop: '-10px' }}
                id="standard-basic"
                variant="standard"
                multiline
                rows={4}
                placeholder="Добавьте подпись"
                onChange={(e) => setDesc(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <TextField
                  sx={{ marginTop: '40px' }}
                  id="outlined-textarea"
                  placeholder="Добавьте теги"
                  onChange={(e) => setTags(e.target.value)}
                  multiline
                  maxRows={4}
                />
                <Button onClick={createPost} sx={{ height: '53px', marginTop: '39px' }}>
                  Опубликовать <SendIcon />
                </Button>
              </div>
            </div>
          </div>
        </Box>
      ) : (
        <Box sx={style}>
          <div>
            <div>
              <span style={{ marginTop: '10px' }}>Создание публикации</span>
              <hr style={{ width: '100%' }} />
            </div>
            {imageUrl && (
              <img
                style={{ width: '200px', height: '150px', marginTop: '27px' }}
                src={imageUrl}
                alt="your post file"
              />
            )}
            <div style={{ marginTop: '58px' }}>
              {!imageUrl && (
                <svg
                  aria-label="Значок, соответствующий медиафайлам, например изображениям или видео"
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96">
                  <title>
                    Значок, соответствующий медиафайлам, например изображениям или видео
                  </title>
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"></path>
                  <path
                    d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"></path>
                  <path
                    d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"></path>
                </svg>
              )}

              {!imageUrl ? (
                <h3 style={{ fontWeight: '400', color: 'rgb(var(--ig-primary-text))' }}>
                  Перетащите сюда фото и видео
                </h3>
              ) : (
                <h3 style={{ fontWeight: '400', color: 'rgb(var(--ig-primary-text))' }}>
                  Файл выбран
                </h3>
              )}

              {!imageUrl ? (
                <Button
                  onClick={() => fileRef.current?.click()}
                  sx={{ backgroundColor: '#0095f6' }}>
                  <span style={{ fontWeight: '500' }}>Выбрать на компьютере</span>
                </Button>
              ) : (
                <Button onClick={handleStartContinue} sx={{ backgroundColor: '#0095f6' }}>
                  <span style={{ fontWeight: '500' }}>Далее</span>
                </Button>
              )}

              <input onChange={handleChange} ref={fileRef} type="file" hidden />
            </div>
          </div>
        </Box>
      )}
    </>
  );
};

export default PostModal;
