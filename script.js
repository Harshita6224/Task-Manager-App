 class TodoApp {
            constructor() {
                this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                this.currentFilter = 'all';
                this.searchTerm = '';
                this.editingTaskId = null;
                this.theme = localStorage.getItem('theme') || 'light';
                
                this.initializeElements();
                this.bindEvents();
                this.applyTheme();
                this.render();
                this.updateProgress();
            }

            initializeElements() {
                this.taskForm = document.getElementById('taskForm');
                this.taskList = document.getElementById('taskList');
                this.searchBar = document.getElementById('searchBar');
                this.emptyState = document.getElementById('emptyState');
                this.themeToggle = document.getElementById('themeToggle');
                this.progressFill = document.getElementById('progressFill');
                this.progressStats = document.getElementById('progressStats');
                this.submitBtn = document.getElementById('submitBtn');
                
                this.inputs = {
                    title: document.getElementById('taskTitle'),
                    description: document.getElementById('taskDescription'),
                    priority: document.getElementById('taskPriority'),
                    dueDate: document.getElementById('taskDueDate')
                };
            }

            bindEvents() {
                this.taskForm.addEventListener('submit', (e) => this.handleSubmit(e));
                this.searchBar.addEventListener('input', (e) => this.handleSearch(e));
                this.themeToggle.addEventListener('click', () => this.toggleTheme());
                
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => this.handleFilter(e));
                });
            }

            generateId() {
                return Date.now().toString(36) + Math.random().toString(36).substr(2);
            }

            handleSubmit(e) {
                e.preventDefault();
                
                const taskData = {
                    title: this.inputs.title.value.trim(),
                    description: this.inputs.description.value.trim(),
                    priority: this.inputs.priority.value,
                    dueDate: this.inputs.dueDate.value,
                    completed: false,
                    createdAt: new Date().toISOString()
                };

                if (!taskData.title) return;

                if (this.editingTaskId) {
                    this.updateTask(this.editingTaskId, taskData);
                    this.editingTaskId = null;
                    this.submitBtn.innerHTML = '<span>➕</span> Add Task';
                } else {
                    taskData.id = this.generateId();
                    this.tasks.unshift(taskData);
                }

                this.saveToStorage();
                this.taskForm.reset();
                this.render();
                this.updateProgress();
            }

            updateTask(id, newData) {
                const index = this.tasks.findIndex(task => task.id === id);
                if (index !== -1) {
                    this.tasks[index] = { ...this.tasks[index], ...newData };
                }
            }

            deleteTask(id) {
                this.tasks = this.tasks.filter(task => task.id !== id);
                this.saveToStorage();
                this.render();
                this.updateProgress();
            }

            toggleTask(id) {
                const task = this.tasks.find(task => task.id === id);
                if (task) {
                    task.completed = !task.completed;
                    task.completedAt = task.completed ? new Date().toISOString() : null;
                    this.saveToStorage();
                    this.render();
                    this.updateProgress();
                }
            }

            editTask(id) {
                const task = this.tasks.find(task => task.id === id);
                if (task) {
                    this.inputs.title.value = task.title;
                    this.inputs.description.value = task.description || '';
                    this.inputs.priority.value = task.priority;
                    this.inputs.dueDate.value = task.dueDate || '';
                    
                    this.editingTaskId = id;
                    this.submitBtn.innerHTML = '<span>💾</span> Update Task';
                    
                    this.inputs.title.focus();
                    this.inputs.title.scrollIntoView({ behavior: 'smooth' });
                }
            }

            handleSearch(e) {
                this.searchTerm = e.target.value.toLowerCase();
                this.render();
            }

            handleFilter(e) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            }

            toggleTheme() {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                this.applyTheme();
                localStorage.setItem('theme', this.theme);
            }

            applyTheme() {
                document.body.dataset.theme = this.theme;
                this.themeToggle.textContent = this.theme === 'light' ? '🌙' : '☀️';
            }

            filterTasks(tasks) {
                let filtered = tasks.filter(task => {
                    const matchesSearch = task.title.toLowerCase().includes(this.searchTerm) ||
                                        (task.description && task.description.toLowerCase().includes(this.searchTerm));
                    
                    if (!matchesSearch) return false;

                    switch (this.currentFilter) {
                        case 'completed':
                            return task.completed;
                        case 'pending':
                            return !task.completed;
                        case 'high':
                            return task.priority === 'high';
                        default:
                            return true;
                    }
                });

                return filtered;
            }

            formatDate(dateString) {
                if (!dateString) return '';
                const date = new Date(dateString);
                const now = new Date();
                const diffTime = date.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 0) return 'Due today';
                if (diffDays === 1) return 'Due tomorrow';
                if (diffDays === -1) return 'Due yesterday';
                if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
                if (diffDays > 0) return `Due in ${diffDays} days`;
                
                return date.toLocaleDateString();
            }

            render() {
                const filteredTasks = this.filterTasks(this.tasks);
                
                if (filteredTasks.length === 0) {
                    this.taskList.style.display = 'none';
                    this.emptyState.style.display = 'block';
                    return;
                }

                this.taskList.style.display = 'flex';
                this.emptyState.style.display = 'none';

                this.taskList.innerHTML = filteredTasks.map(task => `
                    <div class="task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority slide-in">
                        <div class="task-header">
                            <div>
                                <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                                <div class="task-meta">
                                    <span class="task-priority priority-${task.priority}">${task.priority.toUpperCase()}</span>
                                    ${task.dueDate ? `<span>📅 ${this.formatDate(task.dueDate)}</span>` : ''}
                                    <span>📅 Created ${new Date(task.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div class="task-actions">
                                <button class="btn btn-small ${task.completed ? 'btn-warning' : 'btn-success'}" 
                                        onclick="app.toggleTask('${task.id}')">
                                    ${task.completed ? '↩️ Undo' : '✓ Complete'}
                                </button>
                                <button class="btn btn-small btn-primary" onclick="app.editTask('${task.id}')">
                                    ✏️ Edit
                                </button>
                                <button class="btn btn-small btn-danger" onclick="app.deleteTask('${task.id}')">
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                    </div>
                `).join('');
            }

            updateProgress() {
                const totalTasks = this.tasks.length;
                const completedTasks = this.tasks.filter(task => task.completed).length;
                const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                this.progressFill.style.width = `${percentage}%`;
                this.progressStats.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
            }

            saveToStorage() {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        }

        // Initialize the app
        const app = new TodoApp();

        // Add some sample tasks if none exist
        if (app.tasks.length === 0) {
            const sampleTasks = [
                {
                    id: 'sample1',
                    title: 'Welcome to TaskMaster Pro!',
                    description: 'This is a sample task to get you started. You can edit, complete, or delete it.',
                    priority: 'medium',
                    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'sample2',
                    title: 'Try the search and filter features',
                    description: 'Use the search bar and filter buttons to organize your tasks efficiently.',
                    priority: 'low',
                    completed: false,
                    createdAt: new Date().toISOString()
                }
            ];
            
            app.tasks = sampleTasks;
            app.saveToStorage();
            app.render();
            app.updateProgress();
        }
