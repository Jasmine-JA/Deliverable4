import { useState, useEffect, useCallback } from 'react';
import './App.css';
import './index.css';


import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './components/HomePage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import ProducePage from './components/ProducePage.jsx';
import FarmsPage from './components/FarmsPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import CartPage from './components/CartPage.jsx';
import FeedbackPage from './components/FeedbackPage.jsx';


const AUTH_TOKEN_KEY = 'authToken_urbanHarvest';
const CURRENT_USER_KEY = 'currentUser_urbanHarvest';
const GUEST_CART_KEY = 'guestCart_urbanHarvest';
const USER_CART_PREFIX = 'userCart_urbanHarvest_';


const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; 


function App() {
  const [activePage, setActivePage] = useState('homepage');
  const [cartItems, setCartItems] = useState([]);
  const [initialAuthCheckComplete, setInitialAuthCheckComplete] = useState(false);

  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [inactivityTimer, setInactivityTimer] = useState(null);

  
  const performLogout = useCallback((message = 'You have been logged out.') => {
    console.log(`Logout initiated. Reason: ${message}`);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    setAuthToken(null);
    setCurrentUser(null);
    setActivePage('homepage');
    if (inactivityTimer) clearTimeout(inactivityTimer);
    setInactivityTimer(null);
    alert(message);
  }, [inactivityTimer]);

  const handleLogout = useCallback((message = 'You have been logged out.') => {
      if (cartItems.length > 0) {
          try {
              localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cartItems));
              console.log('Cart items saved to guest cart during logout:', cartItems);
          } catch (error) {
              console.error("Error saving guest cart during logout:", error);
          }
      } else {
          localStorage.removeItem(GUEST_CART_KEY);
      }
      performLogout(message);
  }, [cartItems, performLogout]);


  
  useEffect(() => {
    if (!authToken) {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        setInactivityTimer(null);
      }
      return;
    }

    let currentTimer = null;
    const resetTimer = () => {
      if (currentTimer) clearTimeout(currentTimer);
      currentTimer = setTimeout(() => {
        performLogout('You have been logged out due to inactivity.');
      }, INACTIVITY_TIMEOUT_MS);
    };

    const activityListener = () => {
      resetTimer();
    };

    const activityEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => window.addEventListener(event, activityListener, { passive: true }));
    resetTimer();

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, activityListener));
      if (currentTimer) clearTimeout(currentTimer);
    };
  }, [authToken, performLogout]);


  
  useEffect(() => {
    console.log("App.jsx: Initial auth check effect running.");
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userJson = localStorage.getItem(CURRENT_USER_KEY);

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        setAuthToken(token);
        setCurrentUser(user);
        console.log('User session restored from localStorage:', user);
      } catch (error) {
        console.error('Error parsing stored user data during initial load:', error);
        performLogout('Session data corrupted. Please log in again.');
      }
    }
    setInitialAuthCheckComplete(true);
  }, [performLogout]);

  
  const persistCart = useCallback((itemsToPersist) => {
    if (currentUser?.id && authToken) {
      localStorage.setItem(`${USER_CART_PREFIX}${currentUser.id}`, JSON.stringify(itemsToPersist));
    } else {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(itemsToPersist));
    }
  }, [currentUser, authToken]);

  
  useEffect(() => {
    if (!initialAuthCheckComplete) {
      console.log("App.jsx: Cart loading waiting for initial auth check.");
      return;
    }

    console.log("App.jsx: Cart loading. AuthToken:", !!authToken, "User:", currentUser?.id); 
    let loadedCartItems = [];
    if (currentUser?.id && authToken) {
      const userCartKey = `${USER_CART_PREFIX}${currentUser.id}`;
      const storedUserCartJson = localStorage.getItem(userCartKey);
      const guestCartJson = localStorage.getItem(GUEST_CART_KEY);
      let guestCartItems = [];

      if (guestCartJson) try { guestCartItems = JSON.parse(guestCartJson); } catch (e) { localStorage.removeItem(GUEST_CART_KEY); }

      if (storedUserCartJson) {
        try {
          loadedCartItems = JSON.parse(storedUserCartJson);
          if (guestCartItems.length > 0) {
            const combinedItemsMap = new Map();
            loadedCartItems.forEach(item => combinedItemsMap.set(item.id, {...item}));
            guestCartItems.forEach(guestItem => {
                const existing = combinedItemsMap.get(guestItem.id);
                if (existing) {
                    combinedItemsMap.set(guestItem.id, {...existing, quantity: existing.quantity + guestItem.quantity });
                } else {
                    combinedItemsMap.set(guestItem.id, {...guestItem});
                }
            });
            loadedCartItems = Array.from(combinedItemsMap.values());
            persistCart(loadedCartItems);
            localStorage.removeItem(GUEST_CART_KEY);
          }
        } catch (e) { if (guestCartItems.length > 0) loadedCartItems = guestCartItems; }
      } else if (guestCartItems.length > 0) {
        loadedCartItems = guestCartItems;
        persistCart(loadedCartItems);
        localStorage.removeItem(GUEST_CART_KEY);
      }
    } else {
      const guestCartJson = localStorage.getItem(GUEST_CART_KEY);
      if (guestCartJson) try { loadedCartItems = JSON.parse(guestCartJson); } catch (e) { localStorage.removeItem(GUEST_CART_KEY); }
    }
    setCartItems(loadedCartItems);
    console.log("App.jsx: Cart items set:", loadedCartItems); //
  }, [currentUser, authToken, persistCart, initialAuthCheckComplete]);


  // --- Authentication Callbacks ---
  const handleLoginSuccess = (token, user) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setAuthToken(token);
    setCurrentUser(user);
    console.log(`Login success for user: ${user.firstName} ${user.lastName} (ID: ${user.id})`);
  };

  // --- Page Navigation (Stable) ---
  const showPage = useCallback((page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  }, []);


  // --- Redirection Logic Effect ---
  useEffect(() => {
    if (!initialAuthCheckComplete) return;

    const protectedPages = ['produce', 'cart', 'feedback'];
    let targetPage = null;

    if (authToken) {
      if (activePage === 'login' || activePage === 'register') {
        targetPage = 'produce';
      }
    } else {
      if (protectedPages.includes(activePage)) {
        targetPage = 'login';
      }
    }

    if (targetPage && targetPage !== activePage) {
      console.log(`Redirecting from ${activePage} to ${targetPage} based on auth status.`);
      setActivePage(targetPage);
    }
  }, [activePage, authToken, initialAuthCheckComplete]);


  // --- Cart Manipulation Functions ---
  const addToCart = (itemToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      let newCart;
      if (existingItem) {
        newCart = prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: existingItem.quantity + 1 } : item
        );
      } else {
        newCart = [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
      persistCart(newCart);
      return newCart;
    });
    alert(`${itemToAdd.name} added to cart!`);
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems(prevItems => {
      const newCart = prevItems
        .map(item => (item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter(item => item.quantity > 0);
      persistCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const newCart = prevItems.filter(item => item.id !== itemId);
      persistCart(newCart);
      return newCart;
    });
    alert('Item removed from cart.');
  };

  const clearCartAndCheckout = async () => {
    console.log('Simulating order placement with items:', cartItems);
    setCartItems([]);
    persistCart([]);
    alert('Your order has been placed. Thank you!');
    showPage('produce');
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // --- Page Rendering Logic ---
  const renderActivePage = () => {
    if (!initialAuthCheckComplete) {
      return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>Loading application...</div>;
    }

    switch (activePage) {
      case 'homepage': return <HomePage showPage={showPage} />;
      case 'produce':
        return authToken ? <ProducePage addToCart={addToCart} /> : <LoginPage showPage={showPage} onLoginSuccess={handleLoginSuccess} />;
      case 'farms': return <FarmsPage />;
      case 'about': return <AboutPage />;
      case 'register':
        return authToken ? null : <RegisterPage showPage={showPage} />;
      case 'login':
        return authToken ? null : <LoginPage showPage={showPage} onLoginSuccess={handleLoginSuccess} />;
      case 'cart':
        return authToken ? (
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
            showPage={showPage}
            onCheckout={clearCartAndCheckout}
          />
        ) : <LoginPage showPage={showPage} onLoginSuccess={handleLoginSuccess} />;
      case 'feedback':
        return authToken ? <FeedbackPage /> : <LoginPage showPage={showPage} onLoginSuccess={handleLoginSuccess} />;
      default:
        console.warn(`Unknown page: ${activePage}, attempting to default to homepage.`);
        if (activePage !== 'homepage') setActivePage('homepage');
        return <HomePage showPage={showPage} />;
    }
  };

  return (
    <>
      <Header
        activePage={activePage}
        cartCount={cartCount}
        showPage={showPage}
        isAuthenticated={!!authToken}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main>
        {renderActivePage()}
      </main>
      <Footer showPage={showPage} />
    </>
  );
}

export default App;