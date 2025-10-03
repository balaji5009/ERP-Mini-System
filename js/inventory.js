// Inventory Management JavaScript

// Function to load inventory page
async function loadInventory() {
    const inventoryContainer = document.getElementById('inventory-container');
    
    // Create inventory page content
    inventoryContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Inventory Management</h2>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItemModal">
                <i class="fas fa-plus"></i> Add Item
            </button>
        </div>
        
        <!-- Search and Filter -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="input-group">
                    <input type="text" class="form-control" id="inventorySearch" placeholder="Search inventory...">
                    <button class="btn btn-outline-secondary" type="button" id="searchInventoryBtn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-3">
                <select class="form-select" id="categoryFilter">
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="IT Equipment">IT Equipment</option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="form-select" id="statusFilter">
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
            </div>
        </div>
        
        <!-- Inventory Table -->
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="inventoryTableBody">
                    <!-- Will be populated with data -->
                </tbody>
            </table>
            
            <!-- Pagination -->
            <nav aria-label="Inventory pagination">
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
        
        <!-- Add Item Modal -->
        <div class="modal fade" id="addItemModal" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addItemModalLabel">Add New Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addItemForm">
                            <div class="mb-3">
                                <label for="itemName" class="form-label">Item Name</label>
                                <input type="text" class="form-control" id="itemName" required>
                            </div>
                            <div class="mb-3">
                                <label for="itemCategory" class="form-label">Category</label>
                                <select class="form-select" id="itemCategory" required>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Office Supplies">Office Supplies</option>
                                    <option value="IT Equipment">IT Equipment</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="itemQuantity" class="form-label">Quantity</label>
                                <input type="number" class="form-control" id="itemQuantity" min="1" required>
                            </div>
                            <div class="mb-3">
                                <label for="itemAssignedTo" class="form-label">Assigned To</label>
                                <select class="form-select" id="itemAssignedTo">
                                    <option value="">Not Assigned</option>
                                    <!-- Will be populated with employees -->
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="itemStatus" class="form-label">Status</label>
                                <select class="form-select" id="itemStatus" required>
                                    <option value="Available">Available</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="addInventoryItem()">Add Item</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Edit Item Modal -->
        <div class="modal fade" id="editItemModal" tabindex="-1" aria-labelledby="editItemModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editItemModalLabel">Edit Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editItemForm">
                            <input type="hidden" id="editItemId">
                            <div class="mb-3">
                                <label for="editItemName" class="form-label">Item Name</label>
                                <input type="text" class="form-control" id="editItemName" required>
                            </div>
                            <div class="mb-3">
                                <label for="editItemCategory" class="form-label">Category</label>
                                <select class="form-select" id="editItemCategory" required>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Office Supplies">Office Supplies</option>
                                    <option value="IT Equipment">IT Equipment</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editItemQuantity" class="form-label">Quantity</label>
                                <input type="number" class="form-control" id="editItemQuantity" min="1" required>
                            </div>
                            <div class="mb-3">
                                <label for="editItemAssignedTo" class="form-label">Assigned To</label>
                                <select class="form-select" id="editItemAssignedTo">
                                    <option value="">Not Assigned</option>
                                    <!-- Will be populated with employees -->
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editItemStatus" class="form-label">Status</label>
                                <select class="form-select" id="editItemStatus" required>
                                    <option value="Available">Available</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="updateInventoryItem()">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteItemModal" tabindex="-1" aria-labelledby="deleteItemModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteItemModalLabel">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                        <input type="hidden" id="deleteItemId">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" onclick="deleteInventoryItem()">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load inventory data
    await loadInventoryData();
    
    // Load employees for assignment dropdown
    await loadEmployeesForDropdown();
    
    // Add event listeners for search and filters
    document.getElementById('searchInventoryBtn').addEventListener('click', filterInventory);
    document.getElementById('inventorySearch').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterInventory();
        }
    });
    document.getElementById('categoryFilter').addEventListener('change', filterInventory);
    document.getElementById('statusFilter').addEventListener('change', filterInventory);
}

// Function to load inventory data
async function loadInventoryData() {
    const inventory = await fetchData('inventory');
    const tableBody = document.getElementById('inventoryTableBody');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        inventory.forEach(item => {
            const row = document.createElement('tr');
            
            // Highlight low stock items
            if (item.quantity < 10) {
                row.classList.add('table-danger');
            }
            
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>${item.assignedTo || 'Not Assigned'}</td>
                <td><span class="badge ${getStatusBadgeClass(item.status)}">${item.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary me-1" onclick="editInventoryItemModal(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteInventoryItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Function to get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'Available':
            return 'bg-success';
        case 'Assigned':
            return 'bg-primary';
        case 'Maintenance':
            return 'bg-warning';
        default:
            return 'bg-secondary';
    }
}

// Function to load employees for dropdown
async function loadEmployeesForDropdown() {
    const employees = await fetchData('employees');
    const addDropdown = document.getElementById('itemAssignedTo');
    const editDropdown = document.getElementById('editItemAssignedTo');
    
    if (addDropdown && editDropdown) {
        // Clear existing options except the first one
        while (addDropdown.options.length > 1) {
            addDropdown.remove(1);
        }
        
        while (editDropdown.options.length > 1) {
            editDropdown.remove(1);
        }
        
        // Add employee options
        employees.forEach(employee => {
            const addOption = document.createElement('option');
            addOption.value = employee.name;
            addOption.textContent = employee.name;
            addDropdown.appendChild(addOption);
            
            const editOption = document.createElement('option');
            editOption.value = employee.name;
            editOption.textContent = employee.name;
            editDropdown.appendChild(editOption);
        });
    }
}

// Function to filter inventory
function filterInventory() {
    const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const rows = document.getElementById('inventoryTableBody').getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName('td')[1];
        const categoryCell = rows[i].getElementsByTagName('td')[2];
        const statusCell = rows[i].getElementsByTagName('td')[5];
        
        if (nameCell && categoryCell && statusCell) {
            const name = nameCell.textContent || nameCell.innerText;
            const category = categoryCell.textContent || categoryCell.innerText;
            const status = statusCell.textContent || statusCell.innerText;
            
            const matchesSearch = name.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter === '' || category === categoryFilter;
            const matchesStatus = statusFilter === '' || status.includes(statusFilter);
            
            if (matchesSearch && matchesCategory && matchesStatus) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Function to open edit item modal
async function editInventoryItemModal(id) {
    const inventory = await fetchData('inventory');
    const item = inventory.find(i => i.id === id);
    
    if (item) {
        document.getElementById('editItemId').value = item.id;
        document.getElementById('editItemName').value = item.name;
        document.getElementById('editItemCategory').value = item.category;
        document.getElementById('editItemQuantity').value = item.quantity;
        document.getElementById('editItemAssignedTo').value = item.assignedTo || '';
        document.getElementById('editItemStatus').value = item.status;
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('editItemModal'));
        modal.show();
    }
}

// Function to update inventory item
function updateInventoryItem() {
    const id = document.getElementById('editItemId').value;
    const name = document.getElementById('editItemName').value;
    const category = document.getElementById('editItemCategory').value;
    const quantity = document.getElementById('editItemQuantity').value;
    const assignedTo = document.getElementById('editItemAssignedTo').value;
    const status = document.getElementById('editItemStatus').value;
    
    if (!name || !category || !quantity) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('inventoryTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (idCell && idCell.textContent === id) {
            const row = rows[i];
            
            // Update row data
            row.getElementsByTagName('td')[1].textContent = name;
            row.getElementsByTagName('td')[2].textContent = category;
            row.getElementsByTagName('td')[3].textContent = quantity;
            row.getElementsByTagName('td')[4].textContent = assignedTo || 'Not Assigned';
            row.getElementsByTagName('td')[5].innerHTML = `<span class="badge ${getStatusBadgeClass(status)}">${status}</span>`;
            
            // Update row class for low stock
            if (parseInt(quantity) < 10) {
                row.classList.add('table-danger');
            } else {
                row.classList.remove('table-danger');
            }
            
            break;
        }
    }
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editItemModal'));
    modal.hide();
    
    // Show success message
    alert('Item updated successfully');
}

// Function to confirm delete inventory item
function confirmDeleteInventoryItem(id) {
    document.getElementById('deleteItemId').value = id;
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('deleteItemModal'));
    modal.show();
}

// Function to delete inventory item
function deleteInventoryItem() {
    const id = document.getElementById('deleteItemId').value;
    
    // In a real application, you would send this request to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('inventoryTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (idCell && idCell.textContent === id) {
            tableBody.removeChild(rows[i]);
            break;
        }
    }
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteItemModal'));
    modal.hide();
    
    // Show success message
    alert('Item deleted successfully');
}

// Function to add new inventory item
function addInventoryItem() {
    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const quantity = document.getElementById('itemQuantity').value;
    const assignedTo = document.getElementById('itemAssignedTo').value;
    const status = document.getElementById('itemStatus').value;
    
    if (!name || !category || !quantity) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('inventoryTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const newId = rows.length + 1;
    
    const newRow = document.createElement('tr');
    
    // Add low stock class if needed
    if (parseInt(quantity) < 10) {
        newRow.classList.add('table-danger');
    }
    
    newRow.innerHTML = `
        <td>${newId}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td>${quantity}</td>
        <td>${assignedTo || 'Not Assigned'}</td>
        <td><span class="badge ${getStatusBadgeClass(status)}">${status}</span></td>
        <td>
            <button class="btn btn-sm btn-primary me-1" onclick="editInventoryItemModal(${newId})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="confirmDeleteInventoryItem(${newId})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(newRow);
    
    
    document.getElementById('addItemForm').reset();
    
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addItemModal'));
    modal.hide();
    
    
    alert('Item added successfully');
}