import React, { useState } from 'react';

const LoginPage = ({ showPage, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please check your credentials.');
            }

            alert(`Login successful for ${data.user?.name || email}!`); 

            if (data.token && data.user) {
                localStorage.setItem('authToken', data.token); 
                localStorage.setItem('currentUser', JSON.stringify(data.user)); 
                onLoginSuccess(data.token, data.user); 
            } else {
                throw new Error('Login response did not include token or user data.');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred during login.');
            }
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <section id="login-page">
      <div className="form-container">
        <h2>Hi,<br/>Please Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form id="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Email:</label>
            <input type="email" id="login-email" name="login-email" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading}/>
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input type="password" id="login-password" name="login-password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading}/>
          </div>
          <div className="form-options">
            <div className="checkbox-group">
              {/* <input type="checkbox" id="remember" name="remember" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} disabled={isLoading}/>
              <label htmlFor="remember">Keep me signed in</label> */}
            </div>
            <a href="#" className="forgot-password" onClick={(e) => {e.preventDefault(); alert('Forgot password clicked'); /* TODO: Implement forgot password */}}>Forgot password?</a>
          </div>
          <div className="login-options">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'LOGIN'}
            </button>
            <div className="social-login">
              <button type="button" className="btn-social facebook" onClick={() => alert('Facebook login clicked')} disabled={isLoading}><i className="fab fa-facebook-f"></i></button>
              <button type="button" className="btn-social google" onClick={() => alert('Google login clicked')} disabled={isLoading}><i className="fab fa-google"></i></button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default LoginPage;