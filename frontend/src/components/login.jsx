import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // 여기에 실제 클라이언트 ID를 입력하세요.

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    // 이메일과 비밀번호를 처리하는 로직을 추가하세요.
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful:', data);
        // 로그인 성공 시 추가 작업을 여기에 추가하세요.
        alert('Logged in successfully.');
      } else {
        console.log('Login Failed:', response.statusText);
        alert('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google Login Success:', response);
    alert('Logged in successfully with Google. 🥳');
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    alert('Failed to login with Google. 😢 Please try again later.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={styles.loginContainer}>
        <h2><b>Login</b></h2>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.formGroup}>
            <label>ID(Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>PW</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <h3></h3>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

const styles = {
  loginContainer: {
    border: '1px solid #ccc',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  },
  loginForm: {
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '15px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#102766',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export default Login;
