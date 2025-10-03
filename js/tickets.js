// Ticketing/Tasks Management JavaScript

// Function to load tickets page
async function loadTickets() {
    const ticketsContainer = document.getElementById('tickets-container');
    
    // Create tickets page content
    ticketsContainer.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-8">
                <h2>Ticketing System</h2>
            </div>
            <div class="col-md-4 text-end">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTicketModal">
                    <i class="fas fa-plus"></i> Create Ticket
                </button>
            </div>
        </div>
        
        <!-- Tickets Dashboard -->
        <div class="row mb-4">
            <div class="col-md-6 col-lg-3 mb-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <h5 class="card-title">Open Tickets</h5>
                        <h2 class="card-text" id="openTickets">0</h2>
                        <p class="card-text text-danger"><i class="fas fa-arrow-up"></i> 5% from last week</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 mb-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <h5 class="card-title">In Progress</h5>
                        <h2 class="card-text" id="inProgressTickets">0</h2>
                        <p class="card-text text-success"><i class="fas fa-arrow-up"></i> 10% from last week</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 mb-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <h5 class="card-title">Resolved</h5>
                        <h2 class="card-text" id="resolvedTickets">0</h2>
                        <p class="card-text text-success"><i class="fas fa-arrow-up"></i> 15% from last week</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 mb-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <h5 class="card-title">Avg. Resolution Time</h5>
                        <h2 class="card-text" id="avgResolutionTime">0h</h2>
                        <p class="card-text text-success"><i class="fas fa-arrow-down"></i> 8% from last week</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Search and Filter -->
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="input-group">
                    <input type="text" class="form-control" id="ticketSearch" placeholder="Search tickets...">
                    <button class="btn btn-outline-secondary" type="button" id="searchTicketBtn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-3">
                <select class="form-select" id="statusFilter">
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="form-select" id="priorityFilter">
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select" id="assigneeFilter">
                    <option value="">All Assignees</option>
                    <!-- Will be populated with employees -->
                </select>
            </div>
        </div>
        
        <!-- Tickets Table -->
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Title</th>
                        <th>Reported By</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="ticketsTableBody">
                    <!-- Will be populated with data -->
                </tbody>
            </table>
            
            <!-- Pagination -->
            <nav aria-label="Tickets pagination">
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
        
        <!-- Add Ticket Modal -->
        <div class="modal fade" id="addTicketModal" tabindex="-1" aria-labelledby="addTicketModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addTicketModalLabel">Create New Ticket</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addTicketForm">
                            <div class="row mb-3">
                                <div class="col-md-8">
                                    <label for="ticketTitle" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="ticketTitle" required>
                                </div>
                                <div class="col-md-4">
                                    <label for="ticketPriority" class="form-label">Priority</label>
                                    <select class="form-select" id="ticketPriority" required>
                                        <option value="Low">Low</option>
                                        <option value="Medium" selected>Medium</option>
                                        <option value="High">High</option>
                                        <option value="Critical">Critical</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="ticketReporter" class="form-label">Reported By</label>
                                    <input type="text" class="form-control" id="ticketReporter" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="ticketAssignee" class="form-label">Assign To</label>
                                    <select class="form-select" id="ticketAssignee">
                                        <option value="">Unassigned</option>
                                        <!-- Will be populated with employees -->
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="ticketDescription" class="form-label">Description</label>
                                <textarea class="form-control" id="ticketDescription" rows="5" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="ticketAttachment" class="form-label">Attachments (Optional)</label>
                                <input type="file" class="form-control" id="ticketAttachment">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="addTicket()">Create Ticket</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- View Ticket Modal -->
        <div class="modal fade" id="viewTicketModal" tabindex="-1" aria-labelledby="viewTicketModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewTicketModalLabel">Ticket Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="ticketDetails">
                        <!-- Will be populated with ticket details -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" id="updateStatusBtn">Update Status</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Update Status Modal -->
        <div class="modal fade" id="updateStatusModal" tabindex="-1" aria-labelledby="updateStatusModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateStatusModalLabel">Update Ticket Status</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="updateStatusForm">
                            <div class="mb-3">
                                <label for="newStatus" class="form-label">New Status</label>
                                <select class="form-select" id="newStatus" required>
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="statusComment" class="form-label">Comment</label>
                                <textarea class="form-control" id="statusComment" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="updateTicketStatus()">Update</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load tickets data
    await loadTicketsData();
    
    // Load employees for assignee dropdown
    await loadEmployeesForDropdown();
    
    // Add event listeners
    document.getElementById('searchTicketBtn').addEventListener('click', filterTickets);
    document.getElementById('ticketSearch').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterTickets();
        }
    });
    document.getElementById('statusFilter').addEventListener('change', filterTickets);
    document.getElementById('priorityFilter').addEventListener('change', filterTickets);
    document.getElementById('assigneeFilter').addEventListener('change', filterTickets);
    
    // Add event listener for update status button
    document.getElementById('updateStatusBtn').addEventListener('click', function() {
        const ticketId = document.getElementById('ticketDetails').dataset.ticketId;
        const currentStatus = document.getElementById('ticketDetails').dataset.status;
        
        // Set current status in dropdown
        document.getElementById('newStatus').value = currentStatus;
        
        // Show update status modal
        const modal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
        modal.show();
    });
}

// Function to load tickets data
async function loadTicketsData() {
    const tickets = await fetchData('tickets');
    const tableBody = document.getElementById('ticketsTableBody');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        // Calculate ticket metrics
        let openCount = 0;
        let inProgressCount = 0;
        let resolvedCount = 0;
        let totalResolutionTime = 0;
        let resolvedTicketsCount = 0;
        
        tickets.forEach(ticket => {
            // Add to metrics
            if (ticket.status === 'Open') {
                openCount++;
            } else if (ticket.status === 'In Progress') {
                inProgressCount++;
            } else if (ticket.status === 'Resolved') {
                resolvedCount++;
                
                // Calculate resolution time if we have created and resolved dates
                if (ticket.createdDate && ticket.resolvedDate) {
                    const created = new Date(ticket.createdDate);
                    const resolved = new Date(ticket.resolvedDate);
                    const resolutionTime = (resolved - created) / (1000 * 60 * 60); // in hours
                    totalResolutionTime += resolutionTime;
                    resolvedTicketsCount++;
                }
            }
            
            // Create table row
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticket.id}</td>
                <td>${ticket.title}</td>
                <td>${ticket.reporter}</td>
                <td>${ticket.assignee || 'Unassigned'}</td>
                <td><span class="badge ${getPriorityBadgeClass(ticket.priority)}">${ticket.priority}</span></td>
                <td><span class="badge ${getStatusBadgeClass(ticket.status)}">${ticket.status}</span></td>
                <td>${formatDate(ticket.createdDate)}</td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="viewTicket(${ticket.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTicket(${ticket.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Update dashboard metrics
        document.getElementById('openTickets').textContent = openCount;
        document.getElementById('inProgressTickets').textContent = inProgressCount;
        document.getElementById('resolvedTickets').textContent = resolvedCount;
        
        // Calculate average resolution time
        const avgResolutionTime = resolvedTicketsCount > 0 ? (totalResolutionTime / resolvedTicketsCount).toFixed(1) : 0;
        document.getElementById('avgResolutionTime').textContent = `${avgResolutionTime}h`;
    }
}

// Function to get priority badge class
function getPriorityBadgeClass(priority) {
    switch (priority) {
        case 'Low':
            return 'bg-success';
        case 'Medium':
            return 'bg-info';
        case 'High':
            return 'bg-warning';
        case 'Critical':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

// Function to get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'Open':
            return 'bg-danger';
        case 'In Progress':
            return 'bg-warning';
        case 'Resolved':
            return 'bg-success';
        default:
            return 'bg-secondary';
    }
}

// Function to load employees for dropdown
async function loadEmployeesForDropdown() {
    const employees = await fetchData('employees');
    const assigneeDropdown = document.getElementById('ticketAssignee');
    const filterDropdown = document.getElementById('assigneeFilter');
    
    if (assigneeDropdown && filterDropdown) {
        // Clear existing options except the first one
        while (assigneeDropdown.options.length > 1) {
            assigneeDropdown.remove(1);
        }
        
        while (filterDropdown.options.length > 1) {
            filterDropdown.remove(1);
        }
        
        // Add employee options
        employees.forEach(employee => {
            // For create ticket modal
            const option1 = document.createElement('option');
            option1.value = employee.name;
            option1.textContent = employee.name;
            assigneeDropdown.appendChild(option1);
            
            // For filter dropdown
            const option2 = document.createElement('option');
            option2.value = employee.name;
            option2.textContent = employee.name;
            filterDropdown.appendChild(option2);
        });
    }
}

// Function to filter tickets
function filterTickets() {
    const searchTerm = document.getElementById('ticketSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    const assigneeFilter = document.getElementById('assigneeFilter').value;
    
    const rows = document.getElementById('ticketsTableBody').getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        const titleCell = rows[i].getElementsByTagName('td')[1];
        const reporterCell = rows[i].getElementsByTagName('td')[2];
        const assigneeCell = rows[i].getElementsByTagName('td')[3];
        const priorityCell = rows[i].getElementsByTagName('td')[4];
        const statusCell = rows[i].getElementsByTagName('td')[5];
        
        if (idCell && titleCell && reporterCell && assigneeCell && priorityCell && statusCell) {
            const id = idCell.textContent || idCell.innerText;
            const title = titleCell.textContent || titleCell.innerText;
            const reporter = reporterCell.textContent || reporterCell.innerText;
            const assignee = assigneeCell.textContent || assigneeCell.innerText;
            const priority = priorityCell.textContent || priorityCell.innerText;
            const status = statusCell.textContent || statusCell.innerText;
            
            const matchesSearch = id.toLowerCase().includes(searchTerm) || 
                                 title.toLowerCase().includes(searchTerm) ||
                                 reporter.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === '' || status.includes(statusFilter);
            const matchesPriority = priorityFilter === '' || priority.includes(priorityFilter);
            const matchesAssignee = assigneeFilter === '' || assignee.includes(assigneeFilter);
            
            if (matchesSearch && matchesStatus && matchesPriority && matchesAssignee) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Function to view ticket details
async function viewTicket(id) {
    const tickets = await fetchData('tickets');
    const ticket = tickets.find(t => t.id === id);
    
    if (ticket) {
        const detailsContainer = document.getElementById('ticketDetails');
        
        // Format the ticket details for viewing
        detailsContainer.innerHTML = `
            <div class="ticket-view">
                <div class="row mb-4">
                    <div class="col-md-8">
                        <h4>${ticket.title}</h4>
                        <p class="text-muted">Ticket #${ticket.id} - Created on ${formatDate(ticket.createdDate)}</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <span class="badge ${getStatusBadgeClass(ticket.status)} me-2">${ticket.status}</span>
                        <span class="badge ${getPriorityBadgeClass(ticket.priority)}">${ticket.priority}</span>
                    </div>
                </div>
                
                <div class="row mb-4">
                    <div class="col-md-6">
                        <p><strong>Reported By:</strong> ${ticket.reporter}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Assigned To:</strong> ${ticket.assignee || 'Unassigned'}</p>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Description</h5>
                    </div>
                    <div class="card-body">
                        <p>${ticket.description || 'No description provided.'}</p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Activity Log</h5>
                    </div>
                    <div class="card-body">
                        <ul class="timeline">
                            <li class="timeline-item">
                                <span class="timeline-point"></span>
                                <div class="timeline-content">
                                    <h6 class="mb-0">Ticket Created</h6>
                                    <p class="text-muted mb-0">${formatDate(ticket.createdDate)}</p>
                                    <p>Ticket was created by ${ticket.reporter}</p>
                                </div>
                            </li>
                            ${ticket.activities ? ticket.activities.map(activity => `
                                <li class="timeline-item">
                                    <span class="timeline-point"></span>
                                    <div class="timeline-content">
                                        <h6 class="mb-0">${activity.action}</h6>
                                        <p class="text-muted mb-0">${formatDate(activity.date)}</p>
                                        <p>${activity.comment || ''}</p>
                                    </div>
                                </li>
                            `).join('') : ''}
                            ${ticket.status === 'Resolved' ? `
                                <li class="timeline-item">
                                    <span class="timeline-point"></span>
                                    <div class="timeline-content">
                                        <h6 class="mb-0">Ticket Resolved</h6>
                                        <p class="text-muted mb-0">${formatDate(ticket.resolvedDate || ticket.createdDate)}</p>
                                        <p>Ticket was resolved by ${ticket.assignee || 'System'}</p>
                                    </div>
                                </li>
                            ` : ''}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Store the current ticket ID and status for status updates
        detailsContainer.dataset.ticketId = ticket.id;
        detailsContainer.dataset.status = ticket.status;
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('viewTicketModal'));
        modal.show();
    }
}

// Function to add new ticket
function addTicket() {
    const title = document.getElementById('ticketTitle').value;
    const priority = document.getElementById('ticketPriority').value;
    const reporter = document.getElementById('ticketReporter').value;
    const assignee = document.getElementById('ticketAssignee').value;
    const description = document.getElementById('ticketDescription').value;
    
    if (!title || !reporter || !description) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('ticketsTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const newId = rows.length + 1001;
    const createdDate = new Date().toISOString();
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newId}</td>
        <td>${title}</td>
        <td>${reporter}</td>
        <td>${assignee || 'Unassigned'}</td>
        <td><span class="badge ${getPriorityBadgeClass(priority)}">${priority}</span></td>
        <td><span class="badge bg-danger">Open</span></td>
        <td>${formatDate(createdDate)}</td>
        <td>
            <button class="btn btn-sm btn-info me-1" onclick="viewTicket(${newId})">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteTicket(${newId})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.insertBefore(newRow, tableBody.firstChild);
    
    // Update metrics
    const openCount = parseInt(document.getElementById('openTickets').textContent) + 1;
    document.getElementById('openTickets').textContent = openCount;
    
    // Reset form
    document.getElementById('addTicketForm').reset();
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTicketModal'));
    modal.hide();
    
    // Show success message
    alert('Ticket created successfully');
}

// Function to update ticket status
function updateTicketStatus() {
    const ticketId = document.getElementById('ticketDetails').dataset.ticketId;
    const currentStatus = document.getElementById('ticketDetails').dataset.status;
    const newStatus = document.getElementById('newStatus').value;
    const comment = document.getElementById('statusComment').value;
    
    if (currentStatus === newStatus) {
        alert('Status is already ' + newStatus);
        return;
    }
    
    // In a real application, you would send this data to the server
    // For demo purposes, we'll just update the UI
    const tableBody = document.getElementById('ticketsTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (idCell && idCell.textContent == ticketId) {
            const statusCell = rows[i].getElementsByTagName('td')[5];
            statusCell.innerHTML = `<span class="badge ${getStatusBadgeClass(newStatus)}">${newStatus}</span>`;
            
            // Update metrics
            updateTicketMetrics(currentStatus, newStatus);
            
            break;
        }
    }
    
    // Close the modals
    const statusModal = bootstrap.Modal.getInstance(document.getElementById('updateStatusModal'));
    statusModal.hide();
    
    const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewTicketModal'));
    viewModal.hide();
    
    // Show success message
    alert('Ticket status updated successfully');
}

// Function to update ticket metrics
function updateTicketMetrics(oldStatus, newStatus) {
    // Decrement old status count
    if (oldStatus === 'Open') {
        const openCount = parseInt(document.getElementById('openTickets').textContent) - 1;
        document.getElementById('openTickets').textContent = openCount >= 0 ? openCount : 0;
    } else if (oldStatus === 'In Progress') {
        const inProgressCount = parseInt(document.getElementById('inProgressTickets').textContent) - 1;
        document.getElementById('inProgressTickets').textContent = inProgressCount >= 0 ? inProgressCount : 0;
    } else if (oldStatus === 'Resolved') {
        const resolvedCount = parseInt(document.getElementById('resolvedTickets').textContent) - 1;
        document.getElementById('resolvedTickets').textContent = resolvedCount >= 0 ? resolvedCount : 0;
    }
    
    // Increment new status count
    if (newStatus === 'Open') {
        const openCount = parseInt(document.getElementById('openTickets').textContent) + 1;
        document.getElementById('openTickets').textContent = openCount;
    } else if (newStatus === 'In Progress') {
        const inProgressCount = parseInt(document.getElementById('inProgressTickets').textContent) + 1;
        document.getElementById('inProgressTickets').textContent = inProgressCount;
    } else if (newStatus === 'Resolved') {
        const resolvedCount = parseInt(document.getElementById('resolvedTickets').textContent) + 1;
        document.getElementById('resolvedTickets').textContent = resolvedCount;
    }
}

// Function to delete ticket
function deleteTicket(id) {
    if (confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
        const tableBody = document.getElementById('ticketsTableBody');
        const rows = tableBody.getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const idCell = rows[i].getElementsByTagName('td')[0];
            if (idCell && idCell.textContent == id) {
                // Get the status to update metrics
                const statusCell = rows[i].getElementsByTagName('td')[5];
                const status = statusCell.textContent || statusCell.innerText;
                
                // Update metrics
                if (status.includes('Open')) {
                    const openCount = parseInt(document.getElementById('openTickets').textContent) - 1;
                    document.getElementById('openTickets').textContent = openCount >= 0 ? openCount : 0;
                } else if (status.includes('In Progress')) {
                    const inProgressCount = parseInt(document.getElementById('inProgressTickets').textContent) - 1;
                    document.getElementById('inProgressTickets').textContent = inProgressCount >= 0 ? inProgressCount : 0;
                } else if (status.includes('Resolved')) {
                    const resolvedCount = parseInt(document.getElementById('resolvedTickets').textContent) - 1;
                    document.getElementById('resolvedTickets').textContent = resolvedCount >= 0 ? resolvedCount : 0;
                }
                
                // Remove the row
                tableBody.removeChild(rows[i]);
                
                break;
            }
        }
        
        // Show success message
        alert('Ticket deleted successfully');
    }
}