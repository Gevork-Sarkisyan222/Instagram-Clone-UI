import React from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import app from '../../firebase';
import axios from '../../axios';
import { fetchRegisterUser } from '../../redux/slices/user.slice';
import { useDispatch } from 'react-redux';
import { isAuthenticated } from '../../redux/slices/user.slice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Register() {
  const isAuthenticatedUser = useSelector(isAuthenticated);
  // send poles
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // =======================================
  const [avatar, setAvatar] = React.useState<any>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const uploadFile = (file: File | null) => {
    if (!file) return;

    const storage = getStorage(app);
    const newFile = new Date().getMinutes() + file?.name;
    const storageRef = ref(storage, newFile);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL: any) => {
          setAvatarUrl(downloadURL);
        });
      })
      .catch((error: any) => {
        console.warn(error);
      });
  };

  React.useEffect(() => {
    avatar && uploadFile(avatar);
  }, [avatar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const dispatch = useDispatch();

  const registerUser = async () => {
    try {
      const data = { avatarUrl, userName, email, password };
      const userData = await dispatch(fetchRegisterUser(data));

      if (!userData.payload) {
        alert('Не удалось зарегистрироваться');
      }

      if ('token' in userData.payload) {
        localStorage.setItem('token', userData.payload.token);
      }
    } catch (err) {
      console.warn(err);
      alert('Не удалось создать аккаунт');
    }
  };

  if (isAuthenticatedUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="Register-Container">
        <div className="container">
          <div className="content">
            <i
              style={{
                backgroundImage:
                  'url("https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png")',
                backgroundPosition: '0px -52px',
                backgroundSize: 'auto',
                width: '175px',
                height: '51px',
                backgroundRepeat: 'no-repeat',
                display: 'inline-block',
              }}
              role="img"
              aria-label="Instagram"
              data-visualcompletion="css-img"></i>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '17px',
              }}>
              <span className="text">
                Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
              </span>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  onClick={() => fileRef.current?.click()}
                  sx={{ cursor: 'pointer', width: '80px', height: '80px' }}
                  src={avatarUrl ? avatarUrl : '/broken-image.jpg'}
                />
                <input
                  onChangeCapture={(e: any) => setAvatarUrl(e.target.value)}
                  ref={fileRef}
                  type="file"
                  onChange={handleChange}
                  hidden
                />
              </div>
            </div>
            <div className="content__form">
              <div className="content__inputs">
                <label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    className="type-input"
                    required
                    type="text"
                  />
                  <span>Имя пользователья</span>
                </label>
                <label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                  {!email && <span>Почта</span>}
                </label>
                <label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="type-input"
                    required
                    type="password"
                  />
                  <span>Пароль</span>
                </label>
              </div>
              <button onClick={registerUser}>Регестрация</button>
            </div>
            <div className="content__or-text">
              <span></span>
              <span>ИЛИ</span>
              <span></span>
            </div>
            <div className="content__forgot-buttons">
              <button>
                <span>
                  <svg
                    className="facebook-svg"
                    xmlSpace="preserve"
                    // style={{ enableBackground: 'new 0 0 512 512' }}
                    viewBox="0 0 408.788 408.788"
                    height={512}
                    width={512}
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path
                        fill="#475993"
                        d="M353.701 0H55.087C24.665 0 .002 24.662.002 55.085v298.616c0 30.423 24.662 55.085 55.085 55.085h147.275l.251-146.078h-37.951a8.954 8.954 0 0 1-8.954-8.92l-.182-47.087a8.955 8.955 0 0 1 8.955-8.989h37.882v-45.498c0-52.8 32.247-81.55 79.348-81.55h38.65a8.955 8.955 0 0 1 8.955 8.955v39.704a8.955 8.955 0 0 1-8.95 8.955l-23.719.011c-25.615 0-30.575 12.172-30.575 30.035v39.389h56.285c5.363 0 9.524 4.683 8.892 10.009l-5.581 47.087a8.955 8.955 0 0 1-8.892 7.901h-50.453l-.251 146.078h87.631c30.422 0 55.084-24.662 55.084-55.084V55.085C408.786 24.662 384.124 0 353.701 0z"></path>
                    </g>
                  </svg>
                </span>
                <span>Войти через Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="register-container">
        <div className="container">
          <span>
            Есть аккаунт? <Link to="/login">Вход</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
