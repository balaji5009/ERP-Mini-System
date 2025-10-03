// Employees Management JavaScript

// Function to load employees page
async function loadEmployees() {
    const employeesContainer = document.getElementById('employees-container');
    
    // Create employees page content
    employeesContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Employee Management</h2>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                <i class="fas fa-plus"></i> Add Employee
            </button>
        </div>
        
        <!-- Search and Filter -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="input-group">
                    <input type="text" class="form-control" id="employeeSearch" placeholder="Search employees...">
                    <button class="btn btn-outline-secondary" type="button" id="searchEmployeeBtn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-3">
                <select class="form-select" id="departmentFilter">
                    <option value="">All Departments</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="form-select" id="statusFilter">
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
        
        <!-- Employees Table -->
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="employeesTableBody">
                    <!-- Will be populated with data -->
                </tbody>
            </table>
            
            <!-- Pagination -->
            <nav aria-label="Employees pagination">
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
        
        <!-- Add Employee Modal -->
        <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addEmployeeModalLabel">Add New Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addEmployeeForm">
                            <div class="mb-3">
                                <label for="employeeName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="employeeName" required>
                            </div>
                            <div class="mb-3">
                                <label for="employeeEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="employeeEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="employeeDepartment" class="form-label">Department</label>
                                <select class="form-select" id="employeeDepartment" required>
                                    <option value="">Select Department</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="employeePosition" class="form-label">Position</label>
                                <input type="text" class="form-control" id="employeePosition" required>
                            </div>
                            <div class="mb-3">
                                <label for="employeeStatus" class="form-label">Status</label>
                                <select class="form-select" id="employeeStatus" required>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="addEmployee()">Add Employee</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Edit Employee Modal -->
        <div class="modal fade" id="editEmployeeModal" tabindex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editEmployeeModalLabel">Edit Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editEmployeeForm">
                            <input type="hidden" id="editEmployeeId">
                            <div class="mb-3">
                                <label for="editEmployeeName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="editEmployeeName" required>
                            </div>
                            <div class="mb-3">
                                <label for="editEmployeeEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="editEmployeeEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="editEmployeeDepartment" class="form-label">Department</label>
                                <select class="form-select" id="editEmployeeDepartment" required>
                                    <option value="">Select Department</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editEmployeePosition" class="form-label">Position</label>
                                <input type="text" class="form-control" id="editEmployeePosition" required>
                            </div>
                            <div class="mb-3">
                                <label for="editEmployeeStatus" class="form-label">Status</label>
                                <select class="form-select" id="editEmployeeStatus" required>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="updateEmployee()">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteEmployeeModal" tabindex="-1" aria-labelledby="deleteEmployeeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteEmployeeModalLabel">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
                        <input type="hidden" id="deleteEmployeeId">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" onclick="deleteEmployee()">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load employees data
    await loadEmployeesData();
    
    // Add event listeners for search and filters
    document.getElementById('searchEmployeeBtn').addEventListener('click', filterEmployees);
    document.getElementById('employeeSearch').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterEmployees();
        }
    });
    document.getElementById('departmentFilter').addEventListener('change', filterEmployees);
    document.getElementById('statusFilter').addEventListener('change', filterEmployees);
}

// Function to load employees data
async function loadEmployeesData() {
    const employees = await fetchData('employees');
    const tableBody = document.getElementById('employeesTableBody');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td><span class="badge ${employee.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${employee.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="viewEmployee(${employee.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary me-1" onclick="editEmployeeModal(${employee.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteEmployee(${employee.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Function to filter employees
function filterEmployees() {
    const searchTerm = document.getElementById('employeeSearch').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const rows = document.getElementById('employeesTableBody').getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName('td')[1];
        const emailCell = rows[i].getElementsByTagName('td')[2];
        const departmentCell = rows[i].getElementsByTagName('td')[3];
        const statusCell = rows[i].getElementsByTagName('td')[5];
        
        if (nameCell && emailCell && departmentCell && statusCell) {
            const name = nameCell.textContent || nameCell.innerText;
            const email = emailCell.textContent || emailCell.innerText;
            const department = departmentCell.textContent || departmentCell.innerText;
            const status = statusCell.textContent || statusCell.innerText;
            
            const matchesSearch = name.toLowerCase().includes(searchTerm) || 
                                 email.toLowerCase().includes(searchTerm);
            const matchesDepartment = departmentFilter === '' || department === departmentFilter;
            const matchesStatus = statusFilter === '' || status === statusFilter;
            
            if (matchesSearch && matchesDepartment && matchesStatus) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Function to view employee details
function viewEmployee(id) {
    // In a real application, you would fetch the employee details from the server
    // For demo purposes, we'll redirect to a profile page
    loadPage('profile');
}

// Function to open edit employee modal
async function editEmployeeModal(id) {
    const employees = await fetchData('employees');
    const employee = employees.find(emp => emp.id === id);
    
    if (employee) {
        document.getElementById('editEmployeeId').value = employee.id;
        document.getElementById('editEmployeeName').value = employee.name;
        document.getElementById('editEmployeeEmail').value = employee.email;
        document.getElementById('editEmployeeDepartment').value = employee.department;
        document.getElementById('editEmployeePosition').value = employee.position;
        document.getElementById('editEmployeeStatus').value = employee.status;
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
        modal.show();
    }
}

// Function to update employee
function updateEmployee() {
    const id = document.getElementById('editEmployeeId').value;
    const name = document.getElementById('editEmployeeName').value;
    const email = document.getElementById('editEmployeeEmail').value;
    const department = document.getElementById('editEmployeeDepartment').value;
    const position = document.getElementById('editEmployeePosition').value;
    const status = document.getElementById('editEmployeeStatus').value;
    
    if (!name || !email || !department || !position) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('employeesTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (idCell && idCell.textContent === id) {
            rows[i].getElementsByTagName('td')[1].textContent = name;
            rows[i].getElementsByTagName('td')[2].textContent = email;
            rows[i].getElementsByTagName('td')[3].textContent = department;
            rows[i].getElementsByTagName('td')[4].textContent = position;
            rows[i].getElementsByTagName('td')[5].innerHTML = `<span class="badge ${status === 'Active' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;
            break;
        }
    }
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal'));
    modal.hide();
    
    // Show success message
    alert('Employee updated successfully');
}

// Function to confirm delete employee
function confirmDeleteEmployee(id) {
    document.getElementById('deleteEmployeeId').value = id;
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('deleteEmployeeModal'));
    modal.show();
}

// Function to delete employee
function deleteEmployee() {
    const id = document.getElementById('deleteEmployeeId').value;
    
    // In a real application, you would send this request to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('employeesTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (idCell && idCell.textContent === id) {
            tableBody.removeChild(rows[i]);
            break;
        }
    }
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteEmployeeModal'));
    modal.hide();
    
    // Show success message
    alert('Employee deleted successfully');
}

// Function to add new employee
function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const email = document.getElementById('employeeEmail').value;
    const department = document.getElementById('employeeDepartment').value;
    const position = document.getElementById('employeePosition').value;
    const status = document.getElementById('employeeStatus').value;
    
    if (!name || !email || !department || !position) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('employeesTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const newId = rows.length + 1;
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newId}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${department}</td>
        <td>${position}</td>
        <td><span class="badge ${status === 'Active' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
        <td>
            <button class="btn btn-sm btn-info me-1" onclick="viewEmployee(${newId})">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-primary me-1" onclick="editEmployeeModal(${newId})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="confirmDeleteEmployee(${newId})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(newRow);
    
    // Reset form
    document.getElementById('addEmployeeForm').reset();
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
    modal.hide();
    
    // Show success message
    alert('Employee added successfully');
}