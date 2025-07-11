
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const priorityFilter = document.getElementById('priorityFilter');
const statusFilter = document.getElementById('statusFilter');
const clearCompletedBtn = document.getElementById('clearCompleted');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editText = document.getElementById('editText');
const editPriority = document.getElementById('editPriority');
todoForm.addEventListener('submit', function(e) {
    const inputValue = todoInput.value.trim();
    if (!inputValue) {
        e.preventDefault();
        alert('Please enter a task before submitting!');
        todoInput.focus();
        return false;
    }
});

function filterTodos() {
    const priorityValue = priorityFilter.value;
    const statusValue = statusFilter.value;
    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach(item => {
        const priority = item.dataset.priority;
        const completed = item.dataset.completed === 'true';
        
        let showByPriority = priorityValue === 'all' || priority === priorityValue;
        let showByStatus = statusValue === 'all' || 
                          (statusValue === 'completed' && completed) ||
                          (statusValue === 'pending' && !completed);

        if (showByPriority && showByStatus) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

priorityFilter.addEventListener('change', filterTodos);
statusFilter.addEventListener('change', filterTodos);
// Clear completed functionality is now handled server-side via form submission

document.addEventListener('click', function(e) {
    if (e.target.closest('.edit-btn')) {
        const editBtn = e.target.closest('.edit-btn');
        const todoId = editBtn.dataset.id;
        const todoText = editBtn.dataset.text;
        const todoPriority = editBtn.dataset.priority;

        editText.value = todoText;
        editPriority.value = todoPriority;
        editForm.action = `/edit/${todoId}`;
        editModal.style.display = 'block';
    }
});

function closeEditModal() {
    editModal.style.display = 'none';
}

window.addEventListener('click', function(e) {
    if (e.target === editModal) {
        closeEditModal();
    }
});
editForm.addEventListener('submit', function(e) {
    const inputValue = editText.value.trim();
    if (!inputValue) {
        e.preventDefault();
        alert('Please enter a task before saving!');
        editText.focus();
        return false;
    }
});

function confirmDelete() {
    return confirm('Are you sure you want to delete this task?');
}

document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.toggle-form')) {
        e.target.closest('.toggle-form').submit();
    }
});

function handleResponsive() {
    const isMobile = window.innerWidth <= 768;
    const todoItems = document.querySelectorAll('.todo-item');
    
    todoItems.forEach(item => {
        if (isMobile) {
            item.classList.add('mobile-layout');
        } else {
            item.classList.remove('mobile-layout');
        }
    });
}

handleResponsive();
window.addEventListener('resize', handleResponsive);

document.addEventListener('DOMContentLoaded', function() {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement === todoInput) {
            todoForm.submit();
        } else if (document.activeElement === editText) {
            editForm.submit();
        }
    }
    
    if (e.key === 'Escape' && editModal.style.display === 'block') {
        closeEditModal();
    }
});

todoInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        todoForm.submit();
    }
});

todoForm.addEventListener('submit', function() {
    const submitBtn = todoForm.querySelector('.submit');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
});

editForm.addEventListener('submit', function() {
    const saveBtn = editForm.querySelector('.save-btn');
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;
}); 