// Authentication JavaScript

// Function to initialize authentication
function initAuth() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('erpLoggedIn');
    
    if (!isLoggedIn) {
        // Show login page
        showLoginPage();
    } else {
        // User is already logged in, update UI
        const userRole = localStorage.getItem('erpUserRole') || 'guest';
        updateNavbarByRole(userRole);
    }
}

// Function to handle login form submission
function handleLogin(event) {
    if (event) event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    if (!username || !password) {
        showAlert('Please enter both username and password', 'danger');
        return;
    }
    
    // In a real application, you would validate credentials against a backend
    // For demo purposes, we'll just set the user as logged in
    localStorage.setItem('erpLoggedIn', 'true');
    localStorage.setItem('erpUsername', username);
    localStorage.setItem('erpUserRole', role);
    
    // Redirect to dashboard
    window.location.href = 'index.html';
}

// Function to handle signup form submission
function handleSignup(event) {
    if (event) event.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('newRole').value;
    
    if (!fullname || !email || !username || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Validate email format
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // In a real application, you would send this data to a backend
    // For demo purposes, we'll just set the user as logged in
    localStorage.setItem('erpLoggedIn', 'true');
    localStorage.setItem('erpUsername', username);
    localStorage.setItem('erpUserRole', role);
    
    // Redirect to dashboard
    window.location.href = 'index.html';
}

// Function to handle logout
function handleLogout() {
    // Clear local storage
    localStorage.removeItem('erpLoggedIn');
    localStorage.removeItem('erpUsername');
    localStorage.removeItem('erpUserRole');
    
    // Redirect to login page
    window.location.href = 'index.html';
}

// Function to validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Function to show alert message
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alertContainer.removeChild(alert);
        }, 150);
    }, 5000);
}

// Function to toggle between login and signup forms
function toggleAuthForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}