import React from 'react';

const Header = ({ activePage, cartCount, showPage, isAuthenticated, currentUser, onLogout }) => {
  const handleNavClick = (e, page) => {
    e.preventDefault();
    showPage(page);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <header>
      <div className="logo-container">
        <img src="/images/logo.jpg" alt="Urban Harvest Hub Logo" className="logo" />
        <h1>URBAN HARVEST HUB</h1>
        <p className="tagline">Connecting Communities to Fresh Local Food</p>
      </div>
      <nav>
        <ul>
          <li><a href="#" onClick={(e) => handleNavClick(e, 'homepage')} className={activePage === 'homepage' ? 'active' : ''}>HOME</a></li>
          <li><a href="#" onClick={(e) => handleNavClick(e, 'produce')} className={activePage === 'produce' ? 'active' : ''}>PRODUCE</a></li>
          <li><a href="#" onClick={(e) => handleNavClick(e, 'farms')} className={activePage === 'farms' ? 'active' : ''}>FARMS</a></li>
          <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className={activePage === 'about' ? 'active' : ''}>ABOUT US</a></li>
        </ul>
      </nav>
      <div className="user-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {isAuthenticated ? (
          <>
            {currentUser && currentUser.firstName && (
              <span style={{ color: 'white', marginRight: '5px' }}>
                Hi, {currentUser.firstName}!
              </span>
            )}
            <a href="#" onClick={handleLogoutClick} className="btn btn-secondary"> {/* Standard button class */}
              LOGOUT
            </a>
          </>
        ) : (
          <>
            <a href="#" onClick={(e) => handleNavClick(e, 'login')} className="btn btn-secondary"> {/* Login (often secondary action) */}
              LOGIN
            </a>
            <a href="#" onClick={(e) => handleNavClick(e, 'register')} className="btn btn-primary"> {/* Register (often primary action for new users) */}
              REGISTER
            </a>
          </>
        )}

        <a
          href="#"
          onClick={(e) => handleNavClick(e, 'cart')}
          className="cart-icon"
          title="View Cart"
          style={{
            textDecoration: 'none',
            color: 'white',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '5px'
          }}
        >
          <i
            className="fas fa-shopping-cart"
            style={{
              fontSize: '1.3em',
              marginRight: '5px'
            }}
            aria-hidden="true"
          ></i>
          <span
            className="cart-count"
            style={{
              fontSize: '0.9em',
              fontWeight: 'bold',
              backgroundColor: cartCount > 0 ? '#007bff' : 'transparent',
              color: 'white',
              borderRadius: '10px',
              padding: cartCount > 0 ? '2px 6px' : '0px',
              minWidth: '18px',
              textAlign: 'center',
              lineHeight: '1.2',
              transition: 'background-color 0.3s ease'
            }}
          >
            {cartCount}
          </span>
        </a>
      </div>
    </header>
  );
};
export default Header;