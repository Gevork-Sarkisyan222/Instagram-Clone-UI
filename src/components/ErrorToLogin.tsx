import React from 'react';
import { Link } from 'react-router-dom';

function ErrorToLogin() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        marginTop: '205px',
      }}>
      <h2>Пожалуйста пройдите авторизацию</h2>
      <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">
        Войти
      </Link>
    </div>
  );
}

export default ErrorToLogin;
