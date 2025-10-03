// Customers Management JavaScript

// Function to load customers page
async function loadCustomers() {
    const customersContainer = document.getElementById('customers-container');
    
    // Create customers page content
    customersContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Customer Management</h2>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCustomerModal">
                <i class="fas fa-plus"></i> Add Customer
            </button>
        </div>
        
        <!-- Search and Filter -->
        <div class="row mb-4">
            <div class="col-md-8">
                <div class="input-group">
                    <input type="text" class="form-control" id="customerSearch" placeholder="Search customers...">
                    <button class="btn btn-outline-secondary" type="button" id="searchCustomerBtn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-4">
                <select class="form-select" id="statusFilter">
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
        
        <!-- Customers Table -->
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Total Purchases</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="customersTableBody">
                    <!-- Will be populated with data -->
                </tbody>
            </table>
            
            <!-- Pagination -->
            <nav aria-label="Customers pagination">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <!-- Add Customer Modal -->
        <div class="modal fade" id="addCustomerModal" tabindex="-1" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCustomerModalLabel">Add New Customer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addCustomerForm">
                            <div class="mb-3">
                                <label for="customerName" class="form-label">Company/Customer Name</label>
                                <input type="text" class="form-control" id="customerName" required>
                            </div>
                            <div class="mb-3">
                                <label for="customerEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="customerEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="customerPhone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="customerPhone" required>
                            </div>
                            <div class="mb-3">
                                <label for="customerStatus" class="form-label">Status</label>
                                <select class="form-select" id="customerStatus" required>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="addCustomer()">Add Customer</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Edit Customer Modal -->
        <div class="modal fade" id="editCustomerModal" tabindex="-1" aria-labelledby="editCustomerModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editCustomerModalLabel">Edit Customer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editCustomerForm">
                            <input type="hidden" id="editCustomerId">
                            <div class="mb-3">
                                <label for="editCustomerName" class="form-label">Company/Customer Name</label>
                                <input type="text" class="form-control" id="editCustomerName" required>
                            </div>
                            <div class="mb-3">
                                <label for="editCustomerEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="editCustomerEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="editCustomerPhone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="editCustomerPhone" required>
                            </div>
                            <div class="mb-3">
                                <label for="editCustomerStatus" class="form-label">Status</label>
                                <select class="form-select" id="editCustomerStatus" required>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="updateCustomer()">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteCustomerModal" tabindex="-1" aria-labelledby="deleteCustomerModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteCustomerModalLabel">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this customer? This action cannot be undone.</p>
                        <input type="hidden" id="deleteCustomerId">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" onclick="deleteCustomer()">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load customers data
    await loadCustomersData();
    
    // Add event listeners for search and filters
    document.getElementById('searchCustomerBtn').addEventListener('click', filterCustomers);
    document.getElementById('customerSearch').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterCustomers();
        }
    });
    document.getElementById('statusFilter').addEventListener('change', filterCustomers);
}

// Function to load customers data
async function loadCustomersData() {
    const customers = await fetchData('customers');
    const tableBody = document.getElementById('customersTableBody');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td><span class="badge ${customer.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${customer.status}</span></td>
                <td>${formatCurrency(customer.totalPurchases)}</td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="viewCustomer(${customer.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary me-1" onclick="editCustomerModal(${customer.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteCustomer(${customer.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Function to filter customers
function filterCustomers() {
    const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    const rows = document.getElementById('customersTableBody').getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName('td')[1];
        const emailCell = rows[i].getElementsByTagName('td')[2];
        const phoneCell = rows[i].getElementsByTagName('td')[3];
        const statusCell = rows[i].getElementsByTagName('td')[4];
        
        if (nameCell && emailCell && phoneCell && statusCell) {
            const name = nameCell.textContent || nameCell.innerText;
            const email = emailCell.textContent || emailCell.innerText;
            const phone = phoneCell.textContent || phoneCell.innerText;
            const status = statusCell.textContent || statusCell.innerText;
            
            const matchesSearch = name.toLowerCase().includes(searchTerm) || 
                                 email.toLowerCase().includes(searchTerm) ||
                                 phone.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === '' || status === statusFilter;
            
            if (matchesSearch && matchesStatus) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Function to view customer details
function viewCustomer(id) {
    // In a real application, you would fetch the customer details from the server
    // For demo purposes, we'll redirect to a profile page
    loadPage('profile');
}

// Function to open edit customer modal
async function editCustomerModal(id) {
    const customers = await fetchData('customers');
    const customer = customers.find(cust => cust.id === id);
    
    if (customer) {
        document.getElementById('editCustomerId').value = customer.id;
        document.getElementById('editCustomerName').value = customer.name;
        document.getElementById('editCustomerEmail').value = customer.email;
        document.getElementById('editCustomerPhone').value = customer.phone;
        document.getElementById('editCustomerStatus').value = customer.status;
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('editCustomerModal'));
        modal.show();
    }
}

// Function to update customer
function updateCustomer() {
    const id = document.getElementById('editCustomerId').value;
    const name = document.getElementById('editCustomerName').value;
    const email = document.getElementById('editCustomerEmail').value;
    const phone = document.getElementById('editCustomerPhone').value;
    const status = document.getElementById('editCustomerStatus').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('customersTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (idCell && idCell.textContent === id) {
            rows[i].getElementsByTagName('td')[1].textContent = name;
            rows[i].getElementsByTagName('td')[2].textContent = email;
            rows[i].getElementsByTagName('td')[3].textContent = phone;
            rows[i].getElementsByTagName('td')[4].innerHTML = `<span class="badge ${status === 'Active' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;
            break;
        }
    }
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editCustomerModal'));
    modal.hide();
    
    // Show success message
    alert('Customer updated successfully');
}

// Function to confirm delete customer
function confirmDeleteCustomer(id) {
    document.getElementById('deleteCustomerId').value = id;
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('deleteCustomerModal'));
    modal.show();
}

// Function to delete customer
function deleteCustomer() {
    const id = document.getElementById('deleteCustomerId').value;
    
    // In a real application, you would send this request to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('customersTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (idCell && idCell.textContent === id) {
            tableBody.removeChild(rows[i]);
            break;
        }
    }
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteCustomerModal'));
    modal.hide();
    
    // Show success message
    alert('Customer deleted successfully');
}

// Function to add new customer
function addCustomer() {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const status = document.getElementById('customerStatus').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('customersTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const newId = rows.length + 1;
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newId}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td><span class="badge ${status === 'Active' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
        <td>${formatCurrency(0)}</td>
        <td>
            <button class="btn btn-sm btn-info me-1" onclick="viewCustomer(${newId})">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-primary me-1" onclick="editCustomerModal(${newId})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="confirmDeleteCustomer(${newId})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(newRow);
    
    // Reset form
    document.getElementById('addCustomerForm').reset();
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addCustomerModal'));
    modal.hide();
    
    // Show success message
    alert('Customer added successfully');
}