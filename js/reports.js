// Reports Module
function loadReportsPage() {
    const container = document.getElementById('reports-container');
    container.innerHTML = `
        <div class="container-fluid">
            <h2 class="mb-4"><i class="fas fa-chart-bar"></i> Reports</h2>
            
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-header">
                            <h5>Report Type</h5>
                        </div>
                        <div class="card-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action active" onclick="showReportOptions('financial')">Financial Reports</a>
                                <a href="#" class="list-group-item list-group-item-action" onclick="showReportOptions('employee')">Employee Reports</a>
                                <a href="#" class="list-group-item list-group-item-action" onclick="showReportOptions('ticket')">Ticket Reports</a>
                                <a href="#" class="list-group-item list-group-item-action" onclick="showReportOptions('inventory')">Inventory Reports</a>
                                <a href="#" class="list-group-item list-group-item-action" onclick="showReportOptions('customer')">Customer Reports</a>
                                <a href="#" class="list-group-item list-group-item-action" onclick="showReportOptions('custom')">Custom Report</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="report-options-title">Financial Report Options</h5>
                        </div>
                        <div class="card-body">
                            <form id="report-options-form">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="date-range" class="form-label">Date Range</label>
                                        <select class="form-select" id="date-range">
                                            <option value="last7">Last 7 Days</option>
                                            <option value="last30" selected>Last 30 Days</option>
                                            <option value="last90">Last 90 Days</option>
                                            <option value="year">This Year</option>
                                            <option value="custom">Custom Range</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="report-format" class="form-label">Format</label>
                                        <select class="form-select" id="report-format">
                                            <option value="pdf">PDF</option>
                                            <option value="csv">CSV</option>
                                            <option value="excel">Excel</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="row mb-3" id="custom-date-range" style="display: none;">
                                    <div class="col-md-6">
                                        <label for="start-date" class="form-label">Start Date</label>
                                        <input type="date" class="form-control" id="start-date">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="end-date" class="form-label">End Date</label>
                                        <input type="date" class="form-control" id="end-date">
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="group-by" class="form-label">Group By</label>
                                        <select class="form-select" id="group-by">
                                            <option value="day">Day</option>
                                            <option value="week">Week</option>
                                            <option value="month" selected>Month</option>
                                            <option value="quarter">Quarter</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="include-metrics" class="form-label">Include Metrics</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="metric-revenue" checked>
                                            <label class="form-check-label" for="metric-revenue">Revenue</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="metric-invoices" checked>
                                            <label class="form-check-label" for="metric-invoices">Invoices</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="metric-customers">
                                            <label class="form-check-label" for="metric-customers">Customers</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" class="btn btn-primary" onclick="generateReport()">Generate Report</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card mt-4" id="report-preview" style="display: none;">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5>Report Preview</h5>
                            <div>
                                <button class="btn btn-sm btn-primary" onclick="downloadReport()">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="report-content">
                                <!-- Report content will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize date range change event
    document.getElementById('date-range').addEventListener('change', function() {
        if (this.value === 'custom') {
            document.getElementById('custom-date-range').style.display = 'flex';
        } else {
            document.getElementById('custom-date-range').style.display = 'none';
        }
    });
    
    // Show financial report options by default
    showReportOptions('financial');
}

function showReportOptions(reportType) {
    // Update active report type
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.list-group-item[onclick="showReportOptions('${reportType}')"]`).classList.add('active');
    
    // Update title
    const titleMap = {
        'financial': 'Financial Report Options',
        'employee': 'Employee Report Options',
        'ticket': 'Ticket Report Options',
        'inventory': 'Inventory Report Options',
        'customer': 'Customer Report Options',
        'custom': 'Custom Report Options'
    };
    document.getElementById('report-options-title').textContent = titleMap[reportType];
    
    // Update metrics based on report type
    const metricsContainer = document.querySelector('[for="include-metrics"]').parentElement;
    let metricsHTML = '';
    
    switch(reportType) {
        case 'financial':
            metricsHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-revenue" checked>
                    <label class="form-check-label" for="metric-revenue">Revenue</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-invoices" checked>
                    <label class="form-check-label" for="metric-invoices">Invoices</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-customers">
                    <label class="form-check-label" for="metric-customers">Customers</label>
                </div>
            `;
            break;
        case 'employee':
            metricsHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-headcount" checked>
                    <label class="form-check-label" for="metric-headcount">Headcount</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-department" checked>
                    <label class="form-check-label" for="metric-department">Department</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-performance">
                    <label class="form-check-label" for="metric-performance">Performance</label>
                </div>
            `;
            break;
        case 'ticket':
            metricsHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-status" checked>
                    <label class="form-check-label" for="metric-status">Status</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-priority" checked>
                    <label class="form-check-label" for="metric-priority">Priority</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-resolution-time">
                    <label class="form-check-label" for="metric-resolution-time">Resolution Time</label>
                </div>
            `;
            break;
        case 'inventory':
            metricsHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-stock" checked>
                    <label class="form-check-label" for="metric-stock">Stock Levels</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-category" checked>
                    <label class="form-check-label" for="metric-category">Category</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-status">
                    <label class="form-check-label" for="metric-status">Status</label>
                </div>
            `;
            break;
        case 'customer':
            metricsHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-count" checked>
                    <label class="form-check-label" for="metric-count">Customer Count</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-revenue" checked>
                    <label class="form-check-label" for="metric-revenue">Revenue by Customer</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-activity">
                    <label class="form-check-label" for="metric-activity">Activity</label>
                </div>
            `;
            break;
        case 'custom':
            metricsHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-custom1" checked>
                    <label class="form-check-label" for="metric-custom1">Custom Metric 1</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-custom2">
                    <label class="form-check-label" for="metric-custom2">Custom Metric 2</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="metric-custom3">
                    <label class="form-check-label" for="metric-custom3">Custom Metric 3</label>
                </div>
            `;
            break;
    }
    
    metricsContainer.innerHTML = `<label for="include-metrics" class="form-label">Include Metrics</label>${metricsHTML}`;
    
    // Hide report preview
    document.getElementById('report-preview').style.display = 'none';
}

// Generate report based on selected options
function generateReport() {
    // Show the report preview section
    document.getElementById('report-preview').style.display = 'block';
    
    // Get selected options
    const reportType = document.querySelector('.list-group-item.active').textContent.trim();
    const dateRange = document.getElementById('date-range').value;
    const format = document.getElementById('report-format').value;
    const groupBy = document.getElementById('group-by').value;
    
    // Get date range text
    let dateRangeText = '';
    switch(dateRange) {
        case 'last7':
            dateRangeText = 'Last 7 Days';
            break;
        case 'last30':
            dateRangeText = 'Last 30 Days';
            break;
        case 'last90':
            dateRangeText = 'Last 90 Days';
            break;
        case 'year':
            dateRangeText = 'This Year';
            break;
        case 'custom':
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            dateRangeText = `${startDate} to ${endDate}`;
            break;
    }
    
    // Get selected metrics
    const selectedMetrics = [];
    document.querySelectorAll('.form-check-input:checked').forEach(checkbox => {
        selectedMetrics.push(checkbox.nextElementSibling.textContent.trim());
    });
    
    // Generate sample report content
    const reportContent = document.getElementById('report-content');
    reportContent.innerHTML = `
        <div class="alert alert-info mb-4">
            <strong>Report Generated:</strong> ${reportType} for ${dateRangeText}
        </div>
        
        <div class="mb-4">
            <h6>Report Parameters:</h6>
            <ul>
                <li><strong>Format:</strong> ${format.toUpperCase()}</li>
                <li><strong>Group By:</strong> ${groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}</li>
                <li><strong>Metrics:</strong> ${selectedMetrics.join(', ')}</li>
            </ul>
        </div>
        
        <div class="mb-4">
            <h6>Sample Data:</h6>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Period</th>
                            ${selectedMetrics.map(metric => `<th>${metric}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${generateSampleTableRows(groupBy, selectedMetrics)}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="mb-4">
            <h6>Chart Preview:</h6>
            <div>
                <canvas id="reportChart" width="400" height="200"></canvas>
            </div>
        </div>
    `;
    
    // Generate chart
    generateReportChart(groupBy, selectedMetrics);
}

// Generate sample table rows for the report
function generateSampleTableRows(groupBy, metrics) {
    let rows = '';
    const periods = [];
    
    // Generate periods based on group by
    switch(groupBy) {
        case 'day':
            periods.push('2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05');
            break;
        case 'week':
            periods.push('Week 39', 'Week 40', 'Week 41', 'Week 42', 'Week 43');
            break;
        case 'month':
            periods.push('July 2023', 'August 2023', 'September 2023', 'October 2023', 'November 2023');
            break;
        case 'quarter':
            periods.push('Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023');
            break;
    }
    
    // Generate random data for each period and metric
    periods.forEach(period => {
        rows += `<tr><td>${period}</td>`;
        
        metrics.forEach(metric => {
            // Generate appropriate sample data based on metric type
            let value;
            if (metric.includes('Revenue')) {
                value = `$${(Math.random() * 10000).toFixed(2)}`;
            } else if (metric.includes('Count') || metric.includes('Headcount')) {
                value = Math.floor(Math.random() * 100);
            } else if (metric.includes('Time')) {
                value = `${(Math.random() * 24).toFixed(1)} hrs`;
            } else {
                value = Math.floor(Math.random() * 1000);
            }
            
            rows += `<td>${value}</td>`;
        });
        
        rows += `</tr>`;
    });
    
    return rows;
}

// Generate chart for the report
function generateReportChart(groupBy, metrics) {
    // Get periods based on group by
    const periods = [];
    switch(groupBy) {
        case 'day':
            periods.push('2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05');
            break;
        case 'week':
            periods.push('Week 39', 'Week 40', 'Week 41', 'Week 42', 'Week 43');
            break;
        case 'month':
            periods.push('July 2023', 'August 2023', 'September 2023', 'October 2023', 'November 2023');
            break;
        case 'quarter':
            periods.push('Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023');
            break;
    }
    
    // Generate datasets for each metric
    const datasets = [];
    const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];
    
    metrics.forEach((metric, index) => {
        const data = [];
        periods.forEach(() => {
            // Generate appropriate sample data based on metric type
            let value;
            if (metric.includes('Revenue')) {
                value = Math.random() * 10000;
            } else if (metric.includes('Count') || metric.includes('Headcount')) {
                value = Math.floor(Math.random() * 100);
            } else if (metric.includes('Time')) {
                value = Math.random() * 24;
            } else {
                value = Math.floor(Math.random() * 1000);
            }
            data.push(value);
        });
        
        datasets.push({
            label: metric,
            data: data,
            backgroundColor: colors[index % colors.length] + '40', // Add transparency
            borderColor: colors[index % colors.length],
            borderWidth: 2,
            fill: false
        });
    });
    
    // Create chart
    const ctx = document.getElementById('reportChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: periods,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Download the generated report
function downloadReport() {
    const format = document.getElementById('report-format').value;
    const reportType = document.querySelector('.list-group-item.active').textContent.trim();
    
    // Show download notification
    const notification = document.createElement('div');
    notification.className = 'position-fixed bottom-0 end-0 p-3';
    notification.style.zIndex = '5';
    notification.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="fas fa-file-download me-2"></i>
                <strong class="me-auto">Download Started</strong>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.parentElement.remove()"></button>
            </div>
            <div class="toast-body">
                Your ${reportType} report is being downloaded as ${format.toUpperCase()}.
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // In a real application, this would trigger the actual download
    console.log(`Downloading ${reportType} report as ${format}`);
    
    // For demo purposes, simulate PDF download using jsPDF if format is PDF
    if (format === 'pdf') {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${reportType} Report`, 20, 20);
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
        doc.text(`Format: ${format.toUpperCase()}`, 20, 40);
        doc.save(`${reportType.replace(/\s+/g, '_').toLowerCase()}_report.pdf`);
    }
}