import React, { useState } from 'react';

const RegisterPage = ({ showPage }) => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); 

    if (!firstName || !lastName || !email || !password) { 
      setError('Please fill out all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register. Please try again.');
      }

      alert(`Registration successful for ${firstName} ${lastName}! Please login.`); 
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserType('customer');
      showPage('login'); 

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during registration.');
      }
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="register-page">
      <div className="form-container">
        <h2>Register</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form id="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
          </div>
          <div className="form-group">
            <label htmlFor="user-type">Account Type:</label>
            <select id="user-type" name="user-type" value={userType} onChange={(e) => setUserType(e.target.value)} disabled={isLoading}>
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'SIGN UP'}
          </button>
        </form>
      </div>
    </section>
  );
};
export default RegisterPage;