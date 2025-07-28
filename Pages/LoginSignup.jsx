import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const matchedUser = users.find(
      (user) => user.email === trimmedEmail && user.password === trimmedPassword
    );

    if (matchedUser) {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      setIsLoggedIn(true);
      alert('Login successful!');
      navigate('/home');
    } else {
      setErrorMessage('Invalid credentials, please try again.');
    }
  };

  // Handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find((user) => user.email === trimmedEmail);
    if (userExists) {
      setErrorMessage('User already exists. Please login.');
      return;
    }

    users.push({ email: trimmedEmail, password: trimmedPassword });
    localStorage.setItem('users', JSON.stringify(users));

    alert(`Signup successful for ${trimmedEmail}`);
    setMode('login');
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    alert('You have been logged out.');
    navigate('/login');
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {isLoggedIn ? (
          <div>
            <h1>Welcome Back!</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={mode === 'login' ? handleLogin : handleSignup}>
              <div className="loginsignup-fields">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
            </form>

            <p className="loginsignup-login">
              {mode === 'login' ? (
                <>
                  Don’t have an account?{' '}
                  <span onClick={toggleMode} className="link">Sign up here</span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span onClick={toggleMode} className="link">Login here</span>
                </>
              )}
            </p>

            <div className="loginsignup-agree">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
