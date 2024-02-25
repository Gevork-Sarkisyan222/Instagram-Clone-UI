import React from 'react';
import './login.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchLoginUser, isAuthenticated } from '../../redux/slices/user.slice';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  // poles
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();
  const isAuthenticatedUser = useSelector(isAuthenticated);

  const loginUser = async () => {
    try {
      const data = { userName, password };
      const userData = await dispatch(fetchLoginUser(data));

      if (!userData.payload) {
        alert('Не удалось войти в аккаунт попробуйте позже');
      }

      if ('token' in userData.payload) {
        localStorage.setItem('token', userData.payload.token);
      }
    } catch (err) {
      console.warn(err);
      alert('Не удалось войти в аккаунт попробуйте позже');
    }
  };

  if (isAuthenticatedUser) {
    return <Navigate to="/" />;
  }


  const handleSignInWithFacebook = async () => {
    signInWithPopup(auth, provider).then((result) => { console.log(result) }).catch((err) => {
      console.warn(err)
    })
  }

  return (
    <>
      <div className="Login-Container">
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
            <div className="content__form">
              <div className="content__inputs">
                <label>
                  <input onChange={(e) => setUserName(e.target.value)} required type="text" />
                  <span>Имя пользователья</span>
                </label>
                <label>
                  <input onChange={(e) => setPassword(e.target.value)} required type="password" />
                  <span>Пароль</span>
                </label>
              </div>
              <button onClick={loginUser}>Войти</button>
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
                    className=""
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
                <span onClick={handleSignInWithFacebook}>Войти через Facebook</span>
              </button>
              <button>Забыли пароль?</button>
            </div>
          </div>
        </div>
      </div>
      <div className="register-container">
        <div className="container">
          <span>
            У вас ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
