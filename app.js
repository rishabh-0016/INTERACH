// INTERACH - Interactive Learning Platform
// JavaScript functionality for responsive navigation, modals, and user interaction

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const searchInput = document.querySelector('.search-input');
    const materialCards = document.querySelectorAll('.material-card');

    // Modal close elements
    const loginClose = document.getElementById('login-close');
    const signupClose = document.getElementById('signup-close');
    const loginOverlay = document.getElementById('login-overlay');
    const signupOverlay = document.getElementById('signup-overlay');

    // Modal switching elements
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    // User data storage (in memory for demo)
    let users = [];
    let currentUser = null;

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Modal Functions
    function openModal(modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Login Modal Events
    if (loginBtn) {
        loginBtn.addEventListener('click', () => openModal(loginModal));
    }

    if (loginClose) {
        loginClose.addEventListener('click', () => closeModal(loginModal));
    }

    if (loginOverlay) {
        loginOverlay.addEventListener('click', () => closeModal(loginModal));
    }

    // Signup Modal Events
    if (signupBtn) {
        signupBtn.addEventListener('click', () => openModal(signupModal));
    }

    if (signupClose) {
        signupClose.addEventListener('click', () => closeModal(signupModal));
    }

    if (signupOverlay) {
        signupOverlay.addEventListener('click', () => closeModal(signupModal));
    }

    // Modal Switching
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (!loginModal.classList.contains('hidden')) {
                closeModal(loginModal);
            }
            if (!signupModal.classList.contains('hidden')) {
                closeModal(signupModal);
            }
        }
    });

    // Form Validation Functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showError(input, message) {
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--space-4)';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
        input.style.borderColor = 'var(--color-error)';
    }

    function clearError(input) {
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = 'var(--color-border)';
    }

    function showSuccess(message) {
        // Create success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--color-success);
            color: white;
            padding: var(--space-12) var(--space-16);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
        `;
        successDiv.textContent = message;

        // Add animation keyframes
        if (!document.querySelector('#success-animation-style')) {
            const style = document.createElement('style');
            style.id = 'success-animation-style';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(successDiv);

        // Remove notification after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Login Form Validation and Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            let isValid = true;

            // Clear previous errors
            clearError(email);
            clearError(password);

            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email or username is required');
                isValid = false;
            }

            // Validate password
            if (!password.value.trim()) {
                showError(password, 'Password is required');
                isValid = false;
            } else if (!validatePassword(password.value)) {
                showError(password, 'Password must be at least 6 characters');
                isValid = false;
            }

            if (isValid) {
                // Simulate login process
                const user = users.find(u => 
                    (u.email === email.value || u.name.toLowerCase().replace(' ', '') === email.value.toLowerCase()) && 
                    u.password === password.value
                );

                if (user) {
                    currentUser = user;
                    closeModal(loginModal);
                    showSuccess(`Welcome back, ${user.name}!`);
                    updateUIForLoggedInUser();
                    loginForm.reset();
                } else {
                    showError(password, 'Invalid credentials. Please try again.');
                }
            }
        });
    }

    // Signup Form Validation and Submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('signup-name');
            const email = document.getElementById('signup-email');
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('confirm-password');
            const userRole = document.getElementById('user-role');
            const termsAgreement = document.getElementById('terms-agreement');
            let isValid = true;

            // Clear previous errors
            clearError(name);
            clearError(email);
            clearError(password);
            clearError(confirmPassword);

            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Full name is required');
                isValid = false;
            }

            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else if (users.some(u => u.email === email.value)) {
                showError(email, 'Email already exists');
                isValid = false;
            }

            // Validate password
            if (!password.value.trim()) {
                showError(password, 'Password is required');
                isValid = false;
            } else if (!validatePassword(password.value)) {
                showError(password, 'Password must be at least 6 characters');
                isValid = false;
            }

            // Validate confirm password
            if (!confirmPassword.value.trim()) {
                showError(confirmPassword, 'Please confirm your password');
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }

            // Validate terms agreement
            if (!termsAgreement.checked) {
                showError(termsAgreement, 'You must agree to the Terms & Conditions');
                isValid = false;
            }

            if (isValid) {
                // Create new user
                const newUser = {
                    id: users.length + 1,
                    name: name.value.trim(),
                    email: email.value.trim(),
                    password: password.value,
                    role: userRole.value,
                    joinDate: new Date().toISOString()
                };

                users.push(newUser);
                currentUser = newUser;
                closeModal(signupModal);
                showSuccess(`Welcome to INTERACH, ${newUser.name}!`);
                updateUIForLoggedInUser();
                signupForm.reset();
            }
        });
    }

    // Update UI for logged in user
    function updateUIForLoggedInUser() {
        if (currentUser) {
            loginBtn.textContent = currentUser.name;
            loginBtn.onclick = () => {
                // Show user menu or logout
                if (confirm('Do you want to logout?')) {
                    currentUser = null;
                    loginBtn.textContent = 'Login';
                    loginBtn.onclick = () => openModal(loginModal);
                    signupBtn.style.display = 'inline-flex';
                    showSuccess('Logged out successfully!');
                }
            };
            signupBtn.style.display = 'none';
        }
    }

    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            materialCards.forEach(card => {
                const title = card.querySelector('.card__title').textContent.toLowerCase();
                const description = card.querySelector('.card__description').textContent.toLowerCase();
                const topics = Array.from(card.querySelectorAll('.topic-tag'))
                    .map(tag => tag.textContent.toLowerCase())
                    .join(' ');
                
                const matchesSearch = title.includes(searchTerm) || 
                                    description.includes(searchTerm) || 
                                    topics.includes(searchTerm);
                
                if (matchesSearch || searchTerm === '') {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show message if no results found
            const visibleCards = Array.from(materialCards).filter(card => !card.classList.contains('hidden'));
            const existingMessage = document.querySelector('.no-results-message');
            
            if (visibleCards.length === 0 && searchTerm !== '') {
                if (!existingMessage) {
                    const message = document.createElement('div');
                    message.className = 'no-results-message';
                    message.style.cssText = `
                        text-align: center;
                        padding: var(--space-32);
                        color: var(--color-text-secondary);
                        font-size: var(--font-size-lg);
                        grid-column: 1 / -1;
                    `;
                    message.textContent = `No results found for "${searchTerm}". Try a different search term.`;
                    document.querySelector('.materials-grid').appendChild(message);
                }
            } else if (existingMessage) {
                existingMessage.remove();
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button Click Handlers
    const learnMoreButtons = document.querySelectorAll('.card__button');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.material-card');
            const title = card.querySelector('.card__title').textContent;
            
            if (currentUser) {
                showSuccess(`Starting ${title} course. Content will be available soon!`);
            } else {
                if (confirm(`You need to login to access ${title}. Would you like to login now?`)) {
                    openModal(loginModal);
                }
            }
        });
    });

    // Hero Action Buttons
    const heroButtons = document.querySelectorAll('.hero__actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.trim() === 'Start Learning') {
                if (currentUser) {
                    // Scroll to courses section
                    document.getElementById('courses').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    if (confirm('You need to create an account to start learning. Would you like to sign up now?')) {
                        openModal(signupModal);
                    }
                }
            } else if (this.textContent.trim() === 'Explore Courses') {
                // Scroll to courses section
                document.getElementById('courses').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Featured Topics Buttons
    const featuredButtons = document.querySelectorAll('.featured-card .btn');
    featuredButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.featured-card');
            const title = card.querySelector('h3').textContent;
            
            if (currentUser) {
                showSuccess(`Starting ${title}. Content will be available soon!`);
            } else {
                if (confirm(`You need to login to access ${title}. Would you like to login now?`)) {
                    openModal(loginModal);
                }
            }
        });
    });

    // Add some demo users for testing
    users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'student',
            joinDate: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'password123',
            role: 'professional',
            joinDate: new Date().toISOString()
        }
    ];

    // Initialize page
    console.log('INTERACH Learning Platform initialized successfully!');
    console.log('Demo users available: john@example.com / password123, jane@example.com / password123');
});