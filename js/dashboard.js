// Dashboard functionality for Fafali Group website

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!window.authFunctions || !window.authFunctions.requireAuth()) {
        return;
    }
    
    // Load user data
    loadUserData();
    
    // Initialize dashboard sections
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
});

// Load user data into dashboard
function loadUserData() {
    const currentUser = window.authFunctions.getCurrentUser();
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const user = users.find(u => u.id === currentUser.id);
    
    if (!user) return;
    
    // Update user name in navigation and welcome message
    const userName = `${user.firstName} ${user.lastName}`;
    document.getElementById('userName').textContent = user.firstName;
    document.getElementById('welcomeUserName').textContent = user.firstName;
    
    // Update profile section
    updateProfileSection(user);
    
    // Update statistics
    updateStatistics(user);
    
    // Load applications and bookings
    loadApplications(user);
    loadBookings(user);
}

// Update profile section
function updateProfileSection(user) {
    // Profile header
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileCountry').textContent = user.country || 'Not specified';
    
    // Profile details
    document.getElementById('detailFullName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('detailEmail').textContent = user.email;
    document.getElementById('detailPhone').textContent = user.phone || 'Not provided';
    document.getElementById('detailCountry').textContent = user.country || 'Not specified';
    
    // Member since
    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('memberSince').textContent = memberSince;
    
    // Pre-fill edit form
    document.getElementById('editFirstName').value = user.firstName || '';
    document.getElementById('editLastName').value = user.lastName || '';
    document.getElementById('editEmail').value = user.email || '';
    document.getElementById('editPhone').value = user.phone || '';
    document.getElementById('editCountry').value = user.country || '';
}

// Update dashboard statistics
function updateStatistics(user) {
    const applications = user.applications || [];
    const bookings = user.bookings || [];
    
    // Count statistics
    const activeApplications = applications.filter(app => app.status !== 'completed').length;
    const totalBookings = bookings.length;
    const completedServices = applications.filter(app => app.status === 'completed').length + 
                            bookings.filter(booking => booking.status === 'completed').length;
    
    // Update display
    document.getElementById('applicationsCount').textContent = activeApplications;
    document.getElementById('bookingsCount').textContent = totalBookings;
    document.getElementById('completedCount').textContent = completedServices;
}

// Load user applications
function loadApplications(user) {
    const applications = user.applications || [];
    const container = document.getElementById('applicationsContainer');
    
    if (applications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>No Applications Yet</h3>
                <p>Start by creating your first visa application</p>
                <a href="visa-application.html" class="btn btn-primary">Apply Now</a>
            </div>
        `;
        return;
    }
    
    let html = '<div class="applications-grid">';
    
    applications.forEach(application => {
        const statusClass = getStatusClass(application.status);
        const statusIcon = getStatusIcon(application.status);
        
        html += `
            <div class="application-card ${statusClass}">
                <div class="application-header">
                    <h4>${application.visaType || 'Visa Application'}</h4>
                    <span class="application-status">
                        <i class="${statusIcon}"></i>
                        ${application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                </div>
                <div class="application-details">
                    <p><strong>Destination:</strong> ${application.destination || 'Not specified'}</p>
                    <p><strong>Applied on:</strong> ${new Date(application.createdAt).toLocaleDateString()}</p>
                    ${application.travelDate ? `<p><strong>Travel Date:</strong> ${new Date(application.travelDate).toLocaleDateString()}</p>` : ''}
                    ${application.notes ? `<p><strong>Notes:</strong> ${application.notes}</p>` : ''}
                </div>
                <div class="application-actions">
                    <button class="btn btn-outline btn-sm" onclick="viewApplication('${application.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    ${application.status === 'pending' ? `
                        <button class="btn btn-secondary btn-sm" onclick="editApplication('${application.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Load user bookings
function loadBookings(user) {
    const bookings = user.bookings || [];
    const container = document.getElementById('bookingsContainer');
    
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-check"></i>
                <h3>No Bookings Yet</h3>
                <p>Make your first booking to get started</p>
                <a href="bookings.html" class="btn btn-primary">Book Now</a>
            </div>
        `;
        return;
    }
    
    let html = '<div class="bookings-grid">';
    
    bookings.forEach(booking => {
        const statusClass = getStatusClass(booking.status);
        const statusIcon = getStatusIcon(booking.status);
        
        html += `
            <div class="booking-card ${statusClass}">
                <div class="booking-header">
                    <h4>${booking.bookingType || 'Booking'}</h4>
                    <span class="booking-status">
                        <i class="${statusIcon}"></i>
                        ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                </div>
                <div class="booking-details">
                    ${booking.destination ? `<p><strong>Destination:</strong> ${booking.destination}</p>` : ''}
                    ${booking.checkIn ? `<p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>` : ''}
                    ${booking.checkOut ? `<p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>` : ''}
                    ${booking.flightDate ? `<p><strong>Flight Date:</strong> ${new Date(booking.flightDate).toLocaleDateString()}</p>` : ''}
                    <p><strong>Booked on:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
                    ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
                </div>
                <div class="booking-actions">
                    <button class="btn btn-outline btn-sm" onclick="viewBooking('${booking.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    ${booking.status === 'confirmed' ? `
                        <button class="btn btn-secondary btn-sm" onclick="modifyBooking('${booking.id}')">
                            <i class="fas fa-edit"></i> Modify
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Get status CSS class
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'status-pending';
        case 'approved':
        case 'confirmed':
            return 'status-approved';
        case 'rejected':
        case 'cancelled':
            return 'status-rejected';
        case 'completed':
            return 'status-completed';
        default:
            return 'status-pending';
    }
}

// Get status icon
function getStatusIcon(status) {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'fas fa-clock';
        case 'approved':
        case 'confirmed':
            return 'fas fa-check-circle';
        case 'rejected':
        case 'cancelled':
            return 'fas fa-times-circle';
        case 'completed':
            return 'fas fa-check-double';
        default:
            return 'fas fa-clock';
    }
}

// Show dashboard section
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Toggle edit profile mode
function toggleEditProfile() {
    const profileCard = document.querySelector('.profile-card');
    const editForm = document.getElementById('editProfileForm');
    const toggleBtn = document.querySelector('.section-header .btn');
    
    if (editForm.style.display === 'none') {
        profileCard.style.display = 'none';
        editForm.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    } else {
        profileCard.style.display = 'block';
        editForm.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
    }
}

// Cancel edit profile
function cancelEditProfile() {
    toggleEditProfile();
}

// Initialize dashboard
function initializeDashboard() {
    // Set default section
    showSection('profile');
    
    // Load notification preferences
    loadNotificationSettings();
}

// Set up event listeners
function setupEventListeners() {
    // Profile edit form
    document.getElementById('profileEditForm').addEventListener('submit', handleProfileUpdate);
    
    // Password change form
    document.getElementById('passwordChangeForm').addEventListener('submit', handlePasswordChange);
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const currentUser = window.authFunctions.getCurrentUser();
    if (!currentUser) return;
    
    const formData = {
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        country: document.getElementById('editCountry').value
    };
    
    try {
        window.authFunctions.updateUserProfile(currentUser.id, formData);
        
        // Reload user data
        loadUserData();
        
        // Show success message
        alert('Profile updated successfully!');
        
        // Exit edit mode
        cancelEditProfile();
    } catch (error) {
        alert('Error updating profile: ' + error.message);
    }
}

// Handle password change
function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentUser = window.authFunctions.getCurrentUser();
    if (!currentUser) return;
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    try {
        window.authFunctions.changePassword(currentUser.id, currentPassword, newPassword);
        
        // Clear form
        document.getElementById('passwordChangeForm').reset();
        
        alert('Password changed successfully!');
    } catch (error) {
        alert('Error changing password: ' + error.message);
    }
}

// Load notification settings
function loadNotificationSettings() {
    const currentUser = window.authFunctions.getCurrentUser();
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('fafaliUsers') || '[]');
    const user = users.find(u => u.id === currentUser.id);
    
    if (user && user.notificationSettings) {
        document.getElementById('emailNotifications').checked = user.notificationSettings.email || true;
        document.getElementById('bookingNotifications').checked = user.notificationSettings.booking || true;
        document.getElementById('marketingEmails').checked = user.notificationSettings.marketing || false;
    }
}

// Save notification settings
function saveNotificationSettings() {
    const currentUser = window.authFunctions.getCurrentUser();
    if (!currentUser) return;
    
    const notificationSettings = {
        email: document.getElementById('emailNotifications').checked,
        booking: document.getElementById('bookingNotifications').checked,
        marketing: document.getElementById('marketingEmails').checked
    };
    
    try {
        window.authFunctions.updateUserProfile(currentUser.id, { notificationSettings });
        alert('Notification preferences saved successfully!');
    } catch (error) {
        alert('Error saving preferences: ' + error.message);
    }
}

// Confirm delete account
function confirmDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
            const currentUser = window.authFunctions.getCurrentUser();
            if (currentUser) {
                window.authFunctions.deleteUserAccount(currentUser.id);
                alert('Account deleted successfully');
                window.location.href = 'index.html';
            }
        }
    }
}

// View application details (placeholder)
function viewApplication(applicationId) {
    alert('Application details view not implemented yet. Application ID: ' + applicationId);
}

// Edit application (placeholder)
function editApplication(applicationId) {
    alert('Application editing not implemented yet. Application ID: ' + applicationId);
}

// View booking details (placeholder)
function viewBooking(bookingId) {
    alert('Booking details view not implemented yet. Booking ID: ' + bookingId);
}

// Modify booking (placeholder)
function modifyBooking(bookingId) {
    alert('Booking modification not implemented yet. Booking ID: ' + bookingId);
}