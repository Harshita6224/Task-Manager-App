# 📋 Advanced Task Manager

An advanced, feature-rich to-do list application built with pure HTML, CSS, and JavaScript. TaskMaster Pro offers a modern, intuitive interface for managing your daily tasks with powerful productivity features.

---

# ✨ Features
# Core Functionality

Task Management: Add, edit, delete, and complete tasks with ease
Priority System: Three-level priority system (Low, Medium, High) with color coding
Due Dates: Set and track due dates with smart formatting
Progress Tracking: Visual progress bar showing completion percentage
Task Descriptions: Optional detailed descriptions for tasks

# Advanced Features

Real-time Search: Instantly search through tasks by title or description
Smart Filtering: Filter tasks by status (All, Pending, Completed) or priority
Dark/Light Theme: Toggle between themes with smooth transitions
Data Persistence: Automatic saving to browser's local storage
Responsive Design: Optimized for desktop, tablet, and mobile devices

# User Experience

Modern UI: Clean, professional interface with subtle animations
Visual Feedback: Hover effects and smooth state transitions
Smart Date Handling: Shows "Due today", "Overdue by X days", etc.
Empty State: Helpful messaging when no tasks are found
Sample Data: Pre-loaded sample tasks for first-time users

# 🚀 Getting Started
Prerequisites

Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
No additional dependencies required

## 🛠️ Technologies Used

- **HTML5** – Page structure
- **CSS3** – Styling, layout, responsive design, and dark mode
- **JavaScript (ES6)** – App logic, e
---

# 📖 Usage
# Adding Tasks

Fill in the task title (required)
Select priority level (Low/Medium/High)
Set due date (optional)
Add description (optional)
Click "Add Task" button

# Managing Tasks

Complete Task: Click the checkmark button to mark as completed
Edit Task: Click the edit button to modify task details
Delete Task: Click the delete button to remove the task
Undo Completion: Click "Undo" to mark completed tasks as pending

# Search and Filter

Search: Type in the search bar to find tasks by title or description
Filter by Status: Use "All", "Pending", or "Completed" filters
Filter by Priority: Use "High Priority" filter to see urgent tasks

# Theme Toggle
Click the moon/sun icon in the top-right corner to switch between light and dark themes.
# 🛠️ Technical Details
Architecture
TaskMaster Pro/
├── index.html          # Main HTML structure
├── styles/             # CSS styles (embedded)
│   ├── variables       # CSS custom properties
│   ├── layout          # Grid and flexbox layouts
│   ├── components      # UI component styles
│   └── responsive      # Media queries
├── scripts/            # JavaScript functionality (embedded)
│   ├── TodoApp class   # Main application logic
│   ├── DOM manipulation # Event handling and rendering
│   └── Storage API     # Local storage operations
└── README.md          # Project documentation
