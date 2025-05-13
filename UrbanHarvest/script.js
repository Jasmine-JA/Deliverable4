// Modified document.addEventListener section to include our new pagination function
document.addEventListener('DOMContentLoaded', function() {
    // Navigation - Page switching
    setupNavigation();
    
    // Form submission handling
    setupFormSubmissions();
    
    // Cart functionality
    setupCartFunctionality();
    
    // Search and filter functionality 
    setupSearchAndFilter();
    
    // Pagination functionality for produce and farms pages
    setupPagination();
    
    // Clear pre-existing cart items on page load
    clearPreExistingCartItems();
});

/**
 * Clear any pre-existing cart items
 */
function clearPreExistingCartItems() {
    // Clear all cart items
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
    }
    
    // Reset cart count to 0
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = '0';
    }
    
    // Update cart summary
    updateCartSummary();
}

/**
 * Sets up navigation between different pages
 */
function setupNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target page ID
            const targetPageId = this.getAttribute('href').replace('.html', '-page');
            
            // Hide all pages
            document.querySelectorAll('main section').forEach(section => {
                section.classList.remove('active-page');
                section.classList.add('hidden-page');
            });
            
            // Show the target page
            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.classList.remove('hidden-page');
                targetPage.classList.add('active-page');
            } else if (targetPageId === 'index-page') {
                // Show homepage if index.html is clicked
                document.getElementById('homepage').classList.remove('hidden-page');
                document.getElementById('homepage').classList.add('active-page');
            }
        });
    });
    
    // Setup other navigation buttons
    const registerBtn = document.querySelector('.user-actions a[href="register.html"]');
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('register-page');
        });
    }
    
    const loginBtn = document.querySelector('.user-actions a[href="login.html"]');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('login-page');
        });
    }
    
    const cartBtn = document.querySelector('.user-actions a[href="cart.html"]');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('cart-page');
        });
    }
    
    // Setup other page buttons
    const shopNowBtn = document.querySelector('.hero .btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('produce-page');
        });
    }
}

/**
 * Helper function to show a specific page
 * @param {string} pageId - ID of the page to display
 */
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active-page');
        section.classList.add('hidden-page');
    });
    
    // Show the requested page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden-page');
        targetPage.classList.add('active-page');
    }
}

/**
 * Sets up pagination functionality for produce and farms pages
 */
function setupPagination() {
    // Get all pagination containers
    const paginationContainers = document.querySelectorAll('.pagination');
    
    paginationContainers.forEach(container => {
        // Get all pagination links within this container
        const paginationLinks = container.querySelectorAll('a:not(.next)');
        
        // Add click event listeners to pagination links
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the page number
                const pageNumber = parseInt(this.textContent);
                
                // Remove active class from all pagination links in this container
                container.querySelectorAll('a').forEach(paginationLink => 
                    paginationLink.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Determine which page we're on - produce or farms
                const isProducePage = container.closest('#produce-page') !== null;
                const pageName = isProducePage ? 'produce' : 'farms';
                
                // Show the appropriate content for the selected page
                showPageContent(pageName, pageNumber);
            });
        });
        
        // Add click event for "Next" button
        const nextButton = container.querySelector('.next');
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Find the currently active page
                const activePage = container.querySelector('a.active');
                if (!activePage) return;
                
                // Get the current page number
                const currentPage = parseInt(activePage.textContent);
                
                // If we're not on the last page, go to next page
                if (currentPage < 3) { // assuming 3 pages max
                    const nextPage = container.querySelector(`a:not(.next):nth-child(${currentPage + 1})`);
                    if (nextPage) {
                        nextPage.click();
                    }
                }
            });
        }
    });
    
    // Initialize by showing page 1 content for both produce and farms
    showPageContent('produce', 1);
    showPageContent('farms', 1);
}

/**
 * Shows the content for a specific page of either produce or farms
 * @param {string} type - 'produce' or 'farms'
 * @param {number} pageNumber - The page number to show
 */
function showPageContent(type, pageNumber) {
    const containerSelector = type === 'produce' ? '.produce-grid' : '.farms-grid';
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Get all items
    const allItems = container.querySelectorAll(type === 'produce' ? '.produce-item' : '.farm-item');
    
    // Items per page
    const itemsPerPage = 9; // You can adjust this number
    
    // Calculate start and end indices for the current page
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Hide all items first
    allItems.forEach(item => {
        item.style.display = 'none';
    });
    
    // Show only items for the current page
    for (let i = startIndex; i < endIndex && i < allItems.length; i++) {
        if (allItems[i]) {
            allItems[i].style.display = 'block';
        }
    }
    
    // Update the page indicator
    const paginationContainer = container.closest('section').querySelector('.pagination');
    if (paginationContainer) {
        const pageLinks = paginationContainer.querySelectorAll('a:not(.next)');
        pageLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = paginationContainer.querySelector(`a:nth-child(${pageNumber})`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

/**
 * Sets up all form submission handlers
 */
function setupFormSubmissions() {
    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirm-password').value;
            const userType = this.querySelector('#user-type').value;
            
            // Validate form data
            if (!name || !email || !password) {
                alert('Please fill out all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate form submission
            alert(`Registration successful for ${name} (${email}) as a ${userType}`);
            
            // Reset form
            this.reset();
            
            // Redirect to login page
            showPage('login-page');
        });
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector('#login-email').value;
            const password = this.querySelector('#login-password').value;
            
            // Validate form data
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            // Simulate login
            alert(`Login successful for ${email}`);
            
            // Reset form
            this.reset();
            
            // Redirect to homepage
            showPage('homepage');
        });
    }
    
    // Feedback form
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('#feedback-name').value;
            const email = this.querySelector('#feedback-email').value;
            const feedbackType = this.querySelector('#feedback-type').value;
            const message = this.querySelector('#feedback-message').value;
            
            // Validate form data
            if (!message) {
                alert('Please provide feedback message');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you for your ${feedbackType} feedback!`);
            
            // Reset form
            this.reset();
            
            // Redirect to homepage
            showPage('homepage');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Validate email
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Simulate subscription
            alert(`Thank you for subscribing to our newsletter with ${email}`);
            
            // Reset form
            this.reset();
        });
    }
}

/**
 * Sets up cart functionality
 */
function setupCartFunctionality() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.produce-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.price').textContent;
            const productImage = productItem.querySelector('img').getAttribute('src');
            const farmName = productItem.querySelector('.farm-name').textContent;
            
            // Add item to cart
            addItemToCart(productName, productPrice, productImage, farmName);
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
            
            // Notify user
            alert(`${productName} (${productPrice}) added to cart`);
        });
    });
    
    // Setup event delegation for cart item events (for dynamically added items)
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            // Handle quantity buttons
            if (e.target.classList.contains('quantity-btn')) {
                const button = e.target;
                const input = button.parentElement.querySelector('input');
                let value = parseInt(input.value);
                
                if (button.classList.contains('plus')) {
                    if (value < parseInt(input.max)) {
                        input.value = value + 1;
                    }
                } else if (button.classList.contains('minus')) {
                    if (value > parseInt(input.min)) {
                        input.value = value - 1;
                    }
                }
                
                // Update item total
                updateCartItemTotal(button.closest('.cart-item'));
                
                // Update cart summary
                updateCartSummary();
            }
            
            // Handle remove buttons
            if (e.target.classList.contains('fa-trash') || e.target.classList.contains('remove-item')) {
                const button = e.target.classList.contains('remove-item') ? e.target : e.target.parentElement;
                const cartItem = button.closest('.cart-item');
                
                // Update cart count
                const cartCount = document.querySelector('.cart-count');
                cartCount.textContent = Math.max(0, parseInt(cartCount.textContent) - 1);
                
                // Remove item from cart
                cartItem.remove();
                
                // Update cart summary
                updateCartSummary();
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Proceeding to checkout...');
        });
    }
    
    // Update cart summary initially to ensure empty state is handled properly
    updateCartSummary();
}
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Proceeding to checkout...');
        });
    }
    
    // Update cart summary initially
    updateCartSummary();

/**
 * Add an item to the cart with proper price calculation
 * @param {string} name - Product name
 * @param {string} price - Product price
 * @param {string} imageSrc - Product image source
 * @param {string} farmName - Farm name
 */
function addItemToCart(name, price, imageSrc, farmName) {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    
    // Extract numeric price from price string (e.g., "$4.99" -> 4.99)
    // Using a more reliable regex to extract price
    const priceRegex = /(\d+\.\d+|\d+)/;
    const priceMatch = price.match(priceRegex);
    const numericPrice = priceMatch ? parseFloat(priceMatch[0]) : 0;
    
    // Debugging
    console.log(`Adding item: ${name}, Price text: ${price}, Extracted price: ${numericPrice}`);
    
    // Create cart item HTML
    const cartItemHTML = `
        <div class="cart-item">
            <img src="${imageSrc}" alt="${name}">
            <div class="item-details">
                <h3>${name}</h3>
                <p class="farm-name">${farmName}</p>
            </div>
            <div class="item-price">${price}</div>
            <div class="item-quantity">
                <button class="quantity-btn minus">-</button>
                <input type="number" value="1" min="1" max="10">
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="item-total">$${numericPrice.toFixed(2)}</div>
            <button class="remove-item"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    // Add to cart container
    cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    
    // Update cart summary with the new item
    updateCartSummary();
}

/**
 * Update the total price for a cart item
 * @param {HTMLElement} cartItem - The cart item element
 */
function updateCartItemTotal(cartItem) {
    // Get the price text and extract numeric value using a more reliable regex
    const priceText = cartItem.querySelector('.item-price').textContent;
    const priceRegex = /(\d+\.\d+|\d+)/;
    const priceMatch = priceText.match(priceRegex);
    const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
    
    // Get the quantity
    const quantity = parseInt(cartItem.querySelector('.item-quantity input').value);
    const totalElement = cartItem.querySelector('.item-total');
    
    // Calculate total by multiplying price by quantity
    const total = price * quantity;
    console.log(`Updating item total: Price ${price} × Quantity ${quantity} = ${total}`);
    
    // Update the total display
    totalElement.textContent = `$${total.toFixed(2)}`;
}

/**
 * Update the cart summary totals
 */
function updateCartSummary() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    console.log(`Updating cart summary. Found ${cartItems.length} items.`);
    
    // Calculate subtotal by adding up each item's total
    cartItems.forEach((item, index) => {
        const totalText = item.querySelector('.item-total').textContent;
        const priceRegex = /(\d+\.\d+|\d+)/;
        const priceMatch = totalText.match(priceRegex);
        const total = priceMatch ? parseFloat(priceMatch[0]) : 0;
        
        subtotal += total;
        console.log(`Item ${index + 1} total: ${total}, Running subtotal: ${subtotal}`);
    });
    
    // Fixed delivery cost for demo - only apply if cart has items
    const deliveryCost = cartItems.length > 0 ? 3.00 : 0.00;
    
    console.log(`Final subtotal: ${subtotal}, Delivery cost: ${deliveryCost}`);
    
    // Update subtotal display - ensure it's $0.00 when cart is empty
    const subtotalElement = document.querySelector('.summary-row:first-child span:last-child');
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Update delivery cost display
    const deliveryElement = document.querySelector('.summary-row:nth-child(2) span:last-child');
    if (deliveryElement) {
        deliveryElement.textContent = `$${deliveryCost.toFixed(2)}`;
    }
    
    // Update total (subtotal + delivery)
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    if (totalElement) {
        const total = subtotal + deliveryCost;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Show appropriate message if cart is empty
    const cartEmptyMessage = document.querySelector('.cart-empty-message');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (cartEmptyMessage && cartSummary) {
        if (cartItems.length === 0) {
            cartEmptyMessage.style.display = 'block';
            cartSummary.style.display = 'none';
            
            // Force reset all summary values to $0.00 when cart is empty
            if (subtotalElement) subtotalElement.textContent = '$0.00';
            if (deliveryElement) deliveryElement.textContent = '$0.00';
            if (totalElement) totalElement.textContent = '$0.00';
        } else {
            cartEmptyMessage.style.display = 'none';
            cartSummary.style.display = 'block';
        }
    }
}

/**
 * Clear any pre-existing cart items
 */
function clearPreExistingCartItems() {
    // Clear all cart items
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
    }
    
    // Reset cart count to 0
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = '0';
    }
    
    // Explicitly reset all summary values to $0.00
    const subtotalElement = document.querySelector('.summary-row:first-child span:last-child');
    if (subtotalElement) {
        subtotalElement.textContent = '$0.00';
    }
    
    const deliveryElement = document.querySelector('.summary-row:nth-child(2) span:last-child');
    if (deliveryElement) {
        deliveryElement.textContent = '$0.00';
    }
    
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    if (totalElement) {
        totalElement.textContent = '$0.00';
    }
    
    // Update cart summary
    updateCartSummary();
    
    // Show empty cart message and hide cart summary
    const cartEmptyMessage = document.querySelector('.cart-empty-message');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (cartEmptyMessage && cartSummary) {
        cartEmptyMessage.style.display = 'block';
        cartSummary.style.display = 'none';
    }
}

/**
 * Update the total price for a cart item
 * @param {HTMLElement} cartItem - The cart item element
 */
function updateCartItemTotal(cartItem) {
    const priceText = cartItem.querySelector('.item-price').textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const quantity = parseInt(cartItem.querySelector('.item-quantity input').value);
    const totalElement = cartItem.querySelector('.item-total');
    
    // Calculate total by multiplying price by quantity
    const total = price * quantity;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

/**
 * Update the cart summary totals
 */
function updateCartSummary() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    // Calculate subtotal by adding up each item's total
    // (which is price × quantity as calculated by updateCartItemTotal)
    cartItems.forEach(item => {
        const totalText = item.querySelector('.item-total').textContent;
        const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));
        subtotal += total;
    });
    
    // Fixed delivery cost for demo - only apply if cart has items
    const deliveryCost = cartItems.length > 0 ? 3.00 : 0.00;
    
    // Update subtotal
    const subtotalElement = document.querySelector('.summary-row:first-child span:last-child');
    if (subtotalElement) {
        subtotalElement.textContent = `${subtotal.toFixed(2)}`;
    }
    
    // Update delivery cost - hide or show based on cart items
    const deliveryElement = document.querySelector('.summary-row:nth-child(2) span:last-child');
    if (deliveryElement) {
        deliveryElement.textContent = cartItems.length > 0 ? `${deliveryCost.toFixed(2)}` : '$0.00';
    }
    
    // Update total
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    if (totalElement) {
        const total = subtotal + deliveryCost;
        totalElement.textContent = `${total.toFixed(2)}`;
    }
    
    // Show appropriate message if cart is empty
    const cartEmptyMessage = document.querySelector('.cart-empty-message');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (cartEmptyMessage && cartSummary) {
        if (cartItems.length === 0) {
            cartEmptyMessage.style.display = 'block';
            cartSummary.style.display = 'none';
        } else {
            cartEmptyMessage.style.display = 'none';
            cartSummary.style.display = 'block';
        }
    }
}

/**
 * Sets up search and filter functionality
 */
function setupSearchAndFilter() {
    // Search functionality for produce
    const produceSearchBox = document.querySelector('#produce-page .search-box input');
    if (produceSearchBox) {
        produceSearchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const produceItems = document.querySelectorAll('.produce-item');
            
            produceItems.forEach(item => {
                const name = item.querySelector('h3').textContent.toLowerCase();
                const farm = item.querySelector('.farm-name').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || farm.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Search functionality for farms
    const farmsSearchBox = document.querySelector('#farms-page .search-box input');
    if (farmsSearchBox) {
        farmsSearchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const farmItems = document.querySelectorAll('.farm-item');
            
            farmItems.forEach(item => {
                const name = item.querySelector('h3').textContent.toLowerCase();
                const location = item.querySelector('.location').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || location.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Filter functionality for produce
    const produceFilters = document.querySelectorAll('#produce-page .filter-select');
    produceFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            const categoryFilter = document.querySelector('#produce-page .filter-select:first-child').value;
            const seasonFilter = document.querySelector('#produce-page .filter-select:last-child').value;
            
            const produceItems = document.querySelectorAll('.produce-item');
            
            produceItems.forEach(item => {
                // For demo purposes, we'll just simulate filtering
                // In a real app, each item would have data attributes for category and season
                let showItem = true;
                
                if (categoryFilter && !item.classList.contains(categoryFilter)) {
                    showItem = false;
                }
                
                if (seasonFilter && !item.classList.contains(seasonFilter)) {
                    showItem = false;
                }
                
                item.style.display = showItem ? 'block' : 'none';
            });
        });
    });
    
    // Filter functionality for farms
    const farmFilters = document.querySelectorAll('#farms-page .filter-select');
    farmFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            const locationFilter = document.querySelector('#farms-page .filter-select:first-child').value;
            const typeFilter = document.querySelector('#farms-page .filter-select:last-child').value;
            
            const farmItems = document.querySelectorAll('.farm-item');
            
            farmItems.forEach(item => {
                // For demo purposes, we'll just simulate filtering
                // In a real app, each item would have data attributes for location and type
                let showItem = true;
                
                if (locationFilter && !item.classList.contains(locationFilter)) {
                    showItem = false;
                }
                
                if (typeFilter && !item.classList.contains(typeFilter)) {
                    showItem = false;
                }
                
                item.style.display = showItem ? 'block' : 'none';
            });
        });
    });
    
    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pagination links
            paginationLinks.forEach(paginationLink => paginationLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real app, this would load different page content
            alert(`Loading page ${this.textContent}`);
        });
    });
}