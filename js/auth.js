// Authentication functionality for Fafali Group website

// Check if user is logged in
function isLoggedIn() {
    const sessionData = localStorage.getItem('fafaliUserSession') || sessionStorage.getItem('fafaliUserSession');
    if (!sessionData) return false;
    
    try {
        const session = JSON.parse(sessionData);
        return session.isLoggedIn && session.id;
    } catch (e) {
        return false;
    }
}

// Get current user session
function getCurrentUser() {
    const sessionData = localStorage.getItem('fafaliUserSession') || sessionStorage.getItem('fafaliUserSession');
    if (!sessionData) return null;
    
    try {
        return JSON.parse(sessionData);
    } catch (e) {
        return null;
    }
}

// Sign out function
function signOut() {
    localStorage.removeItem('fafaliUserSession');
    sessionStorage.removeItem('fafaliUserSession');
    window.location.href = 'index.html';
}

// Check authentication status and redirect if not logged in
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'signin.html';
        return false;
    }
    return true;
}

// Update navigation based on authentication status
function updateNavigation() {
    const user = getCurrentUser();
    const authNavItems = document.querySelectorAll('.auth-nav');
    
    if (user && user.isLoggedIn) {
        // User is logged in - show dashboard link and user menu
        authNavItems.forEach(item => {
            const link = item.querySelector('a');
            if (link.href.includes('signin.html')) {
                link.textContent = 'Dashboard';
                link.href = 'dashboard.html';
            } else if (link.href.includes('signup.html')) {
                link.textContent = 'Profile';
                link.href = 'dashboard.html';
                link.className = 'nav-link';
            }
        });
        
        // Add user name to navigation if element exists
        const userNameElement = document.querySelector('#userName');
        if (userNameElement) {
            userNameElement.textContent = user.firstName || 'User';
        }
    } else {
        // User is not logged in - show sign in/sign up links
        authNavItems.forEach(item => {
            const link = item.querySelector('a');
            if (link.href.includes('signin.html')) {
                link.textContent = 'Sign In';
            } else if (link.href.includes('signup.html')) {
                link.textContent = 'Sign Up';
            }
        });
    }
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    
    // Check if user should be redirected (for protected pages)
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html'];
    
    if (protectedPages.includes(currentPage)) {
        requireAuth();
    }
});

// User registration function
function registerUser(userData) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        isActive: true,
        applications: [],
        bookings: []
    };
    
    // Remove confirmPassword before storing
    delete newUser.confirmPassword;
    
    // Save user
    users.push(newUser);
    localStorage.setItem('fafaliUsers', JSON.stringify(users));
    
    return newUser;
}

// User login function
function loginUser(email, password, rememberMe = false) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        throw new Error('Invalid email or password');
    }
    
    if (!user.isActive) {
        throw new Error('Account is deactivated');
    }
    
    // Create user session
    const userSession = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
    };
    
    // Store session
    if (rememberMe) {
        localStorage.setItem('fafaliUserSession', JSON.stringify(userSession));
    } else {
        sessionStorage.setItem('fafaliUserSession', JSON.stringify(userSession));
    }
    
    return userSession;
}

// Update user profile
function updateUserProfile(userId, profileData) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    // Update user data
    users[userIndex] = {
        ...users[userIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('fafaliUsers', JSON.stringify(users));
    
    // Update session data if it's the current user
    const currentSession = getCurrentUser();
    if (currentSession && currentSession.id === userId) {
        const updatedSession = {
            ...currentSession,
            firstName: profileData.firstName || currentSession.firstName,
            lastName: profileData.lastName || currentSession.lastName,
            email: profileData.email || currentSession.email
        };
        
        const sessionStorageKey = localStorage.getItem('fafaliUserSession') ? 'fafaliUserSession' : 'fafaliUserSession';
        const storageType = localStorage.getItem('fafaliUserSession') ? 'localStorage' : 'sessionStorage';
        
        if (storageType === 'localStorage') {
            localStorage.setItem('fafaliUserSession', JSON.stringify(updatedSession));
        } else {
            sessionStorage.setItem('fafaliUserSession', JSON.stringify(updatedSession));
        }
    }
    
    return users[userIndex];
}

// Add application to user
function addUserApplication(userId, applicationData) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    const newApplication = {
        id: Date.now().toString(),
        ...applicationData,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    
    if (!users[userIndex].applications) {
        users[userIndex].applications = [];
    }
    
    users[userIndex].applications.push(newApplication);
    localStorage.setItem('fafaliUsers', JSON.stringify(users));
    
    return newApplication;
}

// Add booking to user
function addUserBooking(userId, bookingData) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    const newBooking = {
        id: Date.now().toString(),
        ...bookingData,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
    };
    
    if (!users[userIndex].bookings) {
        users[userIndex].bookings = [];
    }
    
    users[userIndex].bookings.push(newBooking);
    localStorage.setItem('fafaliUsers', JSON.stringify(users));
    
    return newBooking;
}

// Get user applications
function getUserApplications(userId) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const user = users.find(u => u.id === userId);
    
    return user ? (user.applications || []) : [];
}

// Get user bookings
function getUserBookings(userId) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const user = users.find(u => u.id === userId);
    
    return user ? (user.bookings || []) : [];
}

// Delete user account
function deleteUserAccount(userId) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    // Remove user
    users.splice(userIndex, 1);
    localStorage.setItem('fafaliUsers', JSON.stringify(users));
    
    // Clear session
    localStorage.removeItem('fafaliUserSession');
    sessionStorage.removeItem('fafaliUserSession');
}

// Change user password
function changePassword(userId, currentPassword, newPassword) {
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    if (users[userIndex].password !== currentPassword) {
        throw new Error('Current password is incorrect');
    }
    
    // Update password
    users[userIndex].password = newPassword;
    users[userIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem('fafaliUsers', JSON.stringify(users));
}

// Export functions for use in other scripts
window.authFunctions = {
    isLoggedIn,
    getCurrentUser,
    signOut,
    requireAuth,
    updateNavigation,
    registerUser,
    loginUser,
    updateUserProfile,
    addUserApplication,
    addUserBooking,
    getUserApplications,
    getUserBookings,
    deleteUserAccount,
    changePassword
};