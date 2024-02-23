import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import app from '../../firebase';
import axios from '../../axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 585,
  height: 400,
  borderRadius: '22px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface PostTypes {
  id: string;
  imageUrl: string;
  desc: string;
  tags: string;
  handleClose: () => void;
}

const EditPost: React.FC<PostTypes> = ({ id, imageUrl, desc, tags, handleClose }) => {
  // edit poles
  const [imageUrlEdit, setImageUrlEdit] = React.useState<string>('');
  const [descEdit, setDescEdit] = React.useState<string>('');
  const [tagsEdit, setTagsEdit] = React.useState<string>('');

  const [imageChange, setImageChange] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const uploadFile = (file: File | null) => {
    if (!file) return;

    const storage = getStorage(app);
    const newFile = new Date().getMinutes() + file.name;
    const storageRef = ref(storage, newFile);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL: any) => {
          setImageUrlEdit(downloadURL);
        });
      })
      .catch((error: any) => {
        console.warn(error);
      });
  };

  React.useEffect(() => {
    imageChange && uploadFile(imageChange);
  }, [imageChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageChange(e.target.files[0]);
    }
  };

  const editPost = async () => {
    handleClose();

    const requestData: any = {};
    if (imageUrlEdit) requestData.imageUrl = imageUrlEdit;
    if (descEdit) requestData.desc = descEdit;
    if (tagsEdit) requestData.tags = tagsEdit;

    if (Object.keys(requestData).length === 0) {
      return;
    }

    const res = await axios.patch(`/post/edit/${id}`, requestData);
    return res.data;
  };

  return (
    <Box sx={style}>
      <div style={{ textAlign: 'center' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Редактирование поста
        </Typography>
      </div>
      <div className="edit-container">
        <div className="image-edit-place">
          <AddPhotoAlternateIcon
            onClick={() => fileRef.current?.click()}
            sx={{ color: 'blue', position: 'absolute', fontSize: '3.5rem', cursor: 'pointer' }}
          />
          <input ref={fileRef} type="file" onChange={handleChange} hidden />
          <img src={imageUrlEdit ? imageUrlEdit : imageUrl} alt="edit image" />
        </div>
        <div className="edit-inputs">
          <TextField
            sx={{ marginTop: '-10px' }}
            id="standard-basic"
            variant="standard"
            multiline
            onChange={(e) => setDescEdit(e.target.value)}
            rows={4}
            defaultValue={desc}
            placeholder="Добавьте подпись"
            InputProps={{
              disableUnderline: true,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              sx={{ marginTop: '40px' }}
              id="outlined-textarea"
              placeholder="Добавьте теги"
              onChange={(e) => setTagsEdit(e.target.value)}
              multiline
              defaultValue={tags}
              maxRows={4}
            />
            <Button
              onClick={editPost}
              variant="contained"
              sx={{ height: '40px', marginTop: '39px' }}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default EditPost;
