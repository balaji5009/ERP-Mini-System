

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('erpLoggedIn');
    const userRole = localStorage.getItem('erpUserRole') || 'guest';
    
    if (!isLoggedIn) {
        // Show login page
        showLoginPage();
    } else {
        // Initialize the dashboard
        updateNavbarByRole(userRole);
        loadPage('dashboard');
        
        // Initialize sidebar toggle
        document.getElementById('sidebarCollapse').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('active');
            document.getElementById('content').classList.toggle('active');
        });
    }
});

// Function to show login page
function showLoginPage() {
    // Hide sidebar and main content
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('content').style.width = '100%';
    
    // Show login container
    const loginContainer = document.getElementById('login-container');
    loginContainer.style.display = 'block';
    
    // Load login form
    loginContainer.innerHTML = `
        <div class="login-container">
            <h2 class="text-center mb-4">ERP Mini System</h2>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Enter username">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Enter password">
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select class="form-select" id="role">
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary w-100" onclick="login()">Login</button>
            <p class="text-center mt-3">Don't have an account? <a href="#" onclick="showSignupForm()">Sign up</a></p>
        </div>
    `;
}

// Function to show signup form
function showSignupForm() {
    const loginContainer = document.getElementById('login-container');
    loginContainer.innerHTML = `
        <div class="login-container">
            <h2 class="text-center mb-4">Create Account</h2>
            <div class="mb-3">
                <label for="fullname" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="fullname" placeholder="Enter full name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="mb-3">
                <label for="newUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="newUsername" placeholder="Choose username">
            </div>
            <div class="mb-3">
                <label for="newPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="newPassword" placeholder="Choose password">
            </div>
            <div class="mb-3">
                <label for="newRole" class="form-label">Role</label>
                <select class="form-select" id="newRole">
                    <option value="employee">Employee</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary w-100" onclick="signup()">Sign Up</button>
            <p class="text-center mt-3">Already have an account? <a href="#" onclick="showLoginPage()">Login</a></p>
        </div>
    `;
}

// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    if (username && password) {
        // In a real application, you would validate credentials against a backend
        // For demo purposes, we'll just set the user as logged in
        localStorage.setItem('erpLoggedIn', 'true');
        localStorage.setItem('erpUsername', username);
        localStorage.setItem('erpUserRole', role);
        
        // Show sidebar and update navbar
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('content').style.width = 'calc(100% - 250px)';
        document.getElementById('login-container').style.display = 'none';
        
        // Update navbar based on role
        updateNavbarByRole(role);
        
        // Load dashboard
        loadPage('dashboard');
        
        // Initialize sidebar toggle
        document.getElementById('sidebarCollapse').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('active');
            document.getElementById('content').classList.toggle('active');
        });
    } else {
        alert('Please enter both username and password');
    }
}

// Function to handle signup
function signup() {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('newRole').value;
    
    if (fullname && email && username && password) {
        // In a real application, you would send this data to a backend
        // For demo purposes, we'll just set the user as logged in
        localStorage.setItem('erpLoggedIn', 'true');
        localStorage.setItem('erpUsername', username);
        localStorage.setItem('erpUserRole', role);
        
        // Show sidebar and update navbar
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('content').style.width = 'calc(100% - 250px)';
        document.getElementById('login-container').style.display = 'none';
        
        // Update navbar based on role
        updateNavbarByRole(role);
        
        // Load dashboard
        loadPage('dashboard');
        
        // Initialize sidebar toggle
        document.getElementById('sidebarCollapse').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('active');
            document.getElementById('content').classList.toggle('active');
        });
    } else {
        alert('Please fill in all fields');
    }
}

// Function to handle logout
function logout() {
    // Clear local storage
    localStorage.removeItem('erpLoggedIn');
    localStorage.removeItem('erpUsername');
    localStorage.removeItem('erpUserRole');
    
    // Reload the page
    window.location.reload();
}

// Function to update navbar based on user role
function updateNavbarByRole(role) {
    const username = localStorage.getItem('erpUsername') || 'User';
    document.getElementById('userDropdown').innerHTML = `<i class="fas fa-user-circle"></i> ${username} (${role.charAt(0).toUpperCase() + role.slice(1)})`;
    
    // Update sidebar based on role
    const sidebarItems = document.querySelectorAll('#sidebar ul li');
    
    // Show/hide menu items based on role
    if (role === 'admin' || role === 'manager') {
        // Admin and Manager have access to everything
        sidebarItems.forEach(item => item.style.display = 'block');
    } else if (role === 'employee') {
        // Employees don't have access to reports
        sidebarItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.textContent.includes('Reports')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    } else if (role === 'customer') {
        // Customers only have access to dashboard, tickets, and their profile
        sidebarItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && (link.textContent.includes('Dashboard') || 
                         link.textContent.includes('Tickets') || 
                         link.textContent.includes('Profile'))) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Function to load different pages
function loadPage(page) {
    // Hide all containers
    const containers = document.querySelectorAll('[id$="-container"]');
    containers.forEach(container => {
        container.style.display = 'none';
    });
    
    // Show the selected container
    const selectedContainer = document.getElementById(`${page}-container`);
    if (selectedContainer) {
        selectedContainer.style.display = 'block';
        
        // Load content based on the page
        switch(page) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'employees':
                loadEmployees();
                break;
            case 'customers':
                loadCustomers();
                break;
            case 'inventory':
                loadInventory();
                break;
            case 'finance':
                loadFinance();
                break;
            case 'tickets':
                loadTickets();
                break;
            case 'reports':
                loadReports();
                break;
            case 'profile':
                loadProfile();
                break;
            case 'settings':
                loadSettings();
                break;
        }
        
        // Update active menu item
        const menuItems = document.querySelectorAll('#sidebar ul li');
        menuItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.textContent.toLowerCase().includes(page)) {
                item.classList.add('active');
            }
        });
    }
}

// Function to fetch data from API
async function fetchData(endpoint) {
    try {
        // In a real application, this would be a real API call
        // For demo purposes, we'll return mock data
        return getMockData(endpoint);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to get mock data
function getMockData(endpoint) {
    const mockData = {
        'employees': [
            { id: 1, name: 'John Doe', email: 'john@example.com', department: 'IT', position: 'Developer', status: 'Active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'HR', position: 'Manager', status: 'Active' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Finance', position: 'Accountant', status: 'Active' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'Marketing', position: 'Specialist', status: 'Active' },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', department: 'IT', position: 'System Admin', status: 'Inactive' }
        ],
        'customers': [
            { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '123-456-7890', status: 'Active', totalPurchases: 15000 },
            { id: 2, name: 'Globex Inc', email: 'info@globex.com', phone: '234-567-8901', status: 'Active', totalPurchases: 8500 },
            { id: 3, name: 'Initech LLC', email: 'support@initech.com', phone: '345-678-9012', status: 'Inactive', totalPurchases: 3200 },
            { id: 4, name: 'Umbrella Corp', email: 'sales@umbrella.com', phone: '456-789-0123', status: 'Active', totalPurchases: 12000 },
            { id: 5, name: 'Stark Industries', email: 'info@stark.com', phone: '567-890-1234', status: 'Active', totalPurchases: 25000 }
        ],
        'inventory': [
            { id: 1, name: 'Laptop', category: 'Electronics', quantity: 25, assignedTo: 'IT Department', status: 'In Stock' },
            { id: 2, name: 'Office Desk', category: 'Furniture', quantity: 15, assignedTo: 'Office Management', status: 'In Stock' },
            { id: 3, name: 'Printer Ink', category: 'Supplies', quantity: 8, assignedTo: 'Admin Department', status: 'Low Stock' },
            { id: 4, name: 'Monitors', category: 'Electronics', quantity: 12, assignedTo: 'IT Department', status: 'In Stock' },
            { id: 5, name: 'Office Chairs', category: 'Furniture', quantity: 5, assignedTo: 'Office Management', status: 'Low Stock' }
        ],
        'invoices': [
            { id: 'INV-001', customer: 'Acme Corp', amount: 2500, status: 'Paid', date: '2023-05-15' },
            { id: 'INV-002', customer: 'Globex Inc', amount: 1800, status: 'Pending', date: '2023-05-20' },
            { id: 'INV-003', customer: 'Umbrella Corp', amount: 3200, status: 'Paid', date: '2023-05-22' },
            { id: 'INV-004', customer: 'Stark Industries', amount: 4500, status: 'Pending', date: '2023-05-25' },
            { id: 'INV-005', customer: 'Initech LLC', amount: 1200, status: 'Paid', date: '2023-05-28' }
        ],
        'tickets': [
            { id: 'TKT-001', title: 'System Access Issue', description: 'Unable to access the CRM system', status: 'Open', priority: 'High', assignedTo: 'John Doe', createdBy: 'Jane Smith', createdDate: '2023-05-15' },
            { id: 'TKT-002', title: 'Printer Not Working', description: 'Office printer showing error code E502', status: 'In Progress', priority: 'Medium', assignedTo: 'Bob Johnson', createdBy: 'Alice Brown', createdDate: '2023-05-18' },
            { id: 'TKT-003', title: 'New Software Request', description: 'Need design software for marketing team', status: 'Open', priority: 'Low', assignedTo: 'Unassigned', createdBy: 'Charlie Wilson', createdDate: '2023-05-20' },
            { id: 'TKT-004', title: 'Website Down', description: 'Company website returning 500 error', status: 'In Progress', priority: 'High', assignedTo: 'John Doe', createdBy: 'Acme Corp', createdDate: '2023-05-22' },
            { id: 'TKT-005', title: 'Invoice Correction', description: 'Invoice INV-002 has incorrect amount', status: 'Resolved', priority: 'Medium', assignedTo: 'Bob Johnson', createdBy: 'Globex Inc', createdDate: '2023-05-25' }
        ],
        'stats': {
            'totalEmployees': 5,
            'totalCustomers': 5,
            'totalInventory': 65,
            'lowStockItems': 2,
            'totalRevenue': 13200,
            'pendingInvoices': 2,
            'openTickets': 2,
            'inProgressTickets': 2,
            'resolvedTickets': 1
        },
        'revenueByMonth': [
            { month: 'Jan', revenue: 8500 },
            { month: 'Feb', revenue: 9200 },
            { month: 'Mar', revenue: 7800 },
            { month: 'Apr', revenue: 10500 },
            { month: 'May', revenue: 13200 },
            { month: 'Jun', revenue: 0 },
            { month: 'Jul', revenue: 0 },
            { month: 'Aug', revenue: 0 },
            { month: 'Sep', revenue: 0 },
            { month: 'Oct', revenue: 0 },
            { month: 'Nov', revenue: 0 },
            { month: 'Dec', revenue: 0 }
        ],
        'employeesByDepartment': [
            { department: 'IT', count: 2 },
            { department: 'HR', count: 1 },
            { department: 'Finance', count: 1 },
            { department: 'Marketing', count: 1 }
        ],
        'ticketsByStatus': [
            { status: 'Open', count: 2 },
            { status: 'In Progress', count: 2 },
            { status: 'Resolved', count: 1 }
        ]
    };
    
    return mockData[endpoint] || [];
}

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to create a PDF
function generatePDF(elementId, filename) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text(filename, 10, 10);
    doc.save(`${filename}.pdf`);
    
    alert(`${filename} has been generated and is ready for download.`);
}

// Helper function to export to CSV
function exportToCSV(data, filename) {
    if (!data || !data.length) {
        alert('No data to export');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            return `"${value}"`;
        });
        csvRows.push(values.join(','));
    }
    
    // Create CSV content
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    alert(`${filename} has been generated and is ready for download.`);
}