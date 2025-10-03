# ERP-Mini-System
This system is designed as a showcase project for Full-Stack Java Developers and covers multiple real-world business domains including Employee &amp; Customer Management, Inventory, Finance, Ticketing, and Reports.
📌 Features
🔑 Authentication & Roles

Secure Login & Signup with role-based access.

Roles: Admin, Manager, Employee, Customer.

Dynamic sidebar & navbar based on user role.

📊 Dashboard

Overview of key metrics: Employees, Customers, Revenue, Inventory, Pending Tickets.

Simple charts (Bar, Pie, Line) for data visualization.

👨‍💼 Employee & Customer Management

CRUD operations (Add, Edit, Delete, View).

Search, filter, and pagination.

Individual profile pages.

📦 Inventory & Assets

Manage items with fields: Item Name, Category, Quantity, Assigned To, Status.

Low-stock alerts (highlight in red if quantity < 10).

💰 Finance & Invoices

Create and manage invoices.

Track status: Paid, Pending.

Download invoices as PDF.

Finance dashboard: Total Revenue, Pending Invoices.

🛠 Ticketing & Tasks

Create and assign tickets/tasks.

Workflow: Open → In Progress → Resolved.

Filter tickets by status and priority.

📑 Reports

Download reports as CSV or PDF.

Graphical summaries: Monthly Revenue, Employee Count by Department, Open Tickets.

🖥️ Tech Stack

Frontend: React.js, Tailwind CSS (or Bootstrap)

Charts: Recharts.js / Chart.js

Icons: Lucide / FontAwesome

PDF/CSV: jsPDF, FileSaver.js

Dummy API: JSON Server / Mock REST APIs

Responsive Design: Fully mobile-friendly

📂 Project Structure
ERP-Mini-System/
│── public/              # Static assets
│── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Module pages (Dashboard, Employees, Inventory, etc.)
│   ├── services/        # API service placeholders
│   ├── utils/           # Helper functions
│   ├── App.js           # Main app with routes
│   └── index.js         # Entry point
│── package.json
│── README.md

⚡ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/erp-mini-system.git
cd erp-mini-system

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm start

4️⃣ (Optional) Run Dummy Backend (JSON Server)
npm install -g json-server
json-server --watch db.json --port 5000

🎯 Demo Data

Example Employees:

{
  "id": 1,
  "name": "John Doe",
  "role": "Manager",
  "department": "HR",
  "email": "john.doe@company.com"
}


Example Invoice:

{
  "id": "INV-1001",
  "customer": "Acme Corp",
  "amount": 1200,
  "status": "Pending",
  "date": "2025-09-10"
}
