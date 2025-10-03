// Dashboard JavaScript

// Function to load dashboard
async function loadDashboard() {
    const dashboardContainer = document.getElementById('dashboard-container');
    
    // Fetch stats data
    const stats = await fetchData('stats');
    const revenueByMonth = await fetchData('revenueByMonth');
    const employeesByDepartment = await fetchData('employeesByDepartment');
    const ticketsByStatus = await fetchData('ticketsByStatus');
    
    // Create dashboard content
    dashboardContainer.innerHTML = `
        <h2 class="mb-4">Dashboard</h2>
        
        <!-- Stats Cards -->
        <div class="row">
            <div class="col-md-3 mb-4">
                <div class="stat-card primary">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">Total Employees</h6>
                            <div class="stat-number">${stats.totalEmployees}</div>
                        </div>
                        <i class="fas fa-users"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="stat-card success">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">Total Customers</h6>
                            <div class="stat-number">${stats.totalCustomers}</div>
                        </div>
                        <i class="fas fa-user-tie"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="stat-card warning">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">Open Tickets</h6>
                            <div class="stat-number">${stats.openTickets + stats.inProgressTickets}</div>
                        </div>
                        <i class="fas fa-ticket-alt"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="stat-card danger">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">Low Stock Items</h6>
                            <div class="stat-number">${stats.lowStockItems}</div>
                        </div>
                        <i class="fas fa-boxes"></i>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Charts Row -->
        <div class="row">
            <!-- Revenue Chart -->
            <div class="col-md-8 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Monthly Revenue</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Department Distribution -->
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Employees by Department</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="departmentChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Second Row of Charts/Tables -->
        <div class="row">
            <!-- Ticket Status -->
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Tickets by Status</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="ticketChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Recent Invoices -->
            <div class="col-md-8 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Recent Invoices</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Invoice ID</th>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="recentInvoicesTable">
                                    <!-- Will be populated with data -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Populate recent invoices table
    populateRecentInvoices();
    
    // Create charts
    createRevenueChart(revenueByMonth);
    createDepartmentChart(employeesByDepartment);
    createTicketChart(ticketsByStatus);
}

// Function to populate recent invoices table
async function populateRecentInvoices() {
    const invoices = await fetchData('invoices');
    const tableBody = document.getElementById('recentInvoicesTable');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        // Get the 5 most recent invoices
        const recentInvoices = invoices.slice(0, 5);
        
        recentInvoices.forEach(invoice => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${invoice.id}</td>
                <td>${invoice.customer}</td>
                <td>${formatCurrency(invoice.amount)}</td>
                <td>${formatDate(invoice.date)}</td>
                <td><span class="badge ${invoice.status === 'Paid' ? 'bg-success' : 'bg-warning'}">${invoice.status}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Function to create revenue chart
function createRevenueChart(data) {
    const ctx = document.getElementById('revenueChart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'Revenue',
                    data: data.map(item => item.revenue),
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

// Function to create department chart
function createDepartmentChart(data) {
    const ctx = document.getElementById('departmentChart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(item => item.department),
                datasets: [{
                    data: data.map(item => item.count),
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(155, 89, 182, 0.7)',
                        'rgba(52, 73, 94, 0.7)',
                        'rgba(241, 196, 15, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(52, 73, 94, 1)',
                        'rgba(241, 196, 15, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}

// Function to create ticket chart
function createTicketChart(data) {
    const ctx = document.getElementById('ticketChart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.status),
                datasets: [{
                    data: data.map(item => item.count),
                    backgroundColor: [
                        'rgba(243, 156, 18, 0.7)',
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(46, 204, 113, 0.7)'
                    ],
                    borderColor: [
                        'rgba(243, 156, 18, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}