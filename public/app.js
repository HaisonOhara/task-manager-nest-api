// Configuração da API
const API_BASE_URL = 'http://localhost:3000';

// Estado da aplicação
let tasks = [];
let categories = [];
let currentFilter = 'all';

// Elementos do DOM
const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');
const categorySelect = document.getElementById('category');
const filterButtons = document.querySelectorAll('.btn-filter');
const refreshBtn = document.getElementById('refresh-btn');

// Inicializa a aplicação
async function init() {
    console.log('🚀 Iniciando aplicação...');
    
    // Verifica conexão com API
    await checkAPIConnection();
    
    // Carrega dados iniciais
    await loadCategories();
    await loadTasks();
    
    // Event listeners
    taskForm.addEventListener('submit', handleCreateTask);
    refreshBtn.addEventListener('click', handleRefresh);
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            updateFilterButtons();
            renderTasks();
        });
    });
    
    console.log('✅ Aplicação iniciada com sucesso!');
}

// Verifica conexão com a API
async function checkAPIConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        if (response.ok) {
            updateStatus(true, 'Conectado à API');
            console.log('✅ API conectada:', data);
        } else {
            updateStatus(false, 'Erro na API');
        }
    } catch (error) {
        updateStatus(false, 'API desconectada - Verifique se o servidor está rodando');
        console.error('❌ Erro ao conectar na API:', error);
    }
}

// Atualiza indicador de status
function updateStatus(connected, message) {
    const indicator = document.getElementById('status-indicator');
    const text = document.getElementById('status-text');
    
    indicator.textContent = connected ? '🟢' : '🔴';
    text.textContent = message;
}

// Carrega categorias da API
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        categories = await response.json();
        
        // Popula o select de categorias
        categorySelect.innerHTML = '<option value="">Sem categoria</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = `${cat.name}`;
            categorySelect.appendChild(option);
        });
        
        console.log('📂 Categorias carregadas:', categories.length);
    } catch (error) {
        console.error('❌ Erro ao carregar categorias:', error);
        showMessage('Erro ao carregar categorias', 'error');
    }
}

// Carrega tarefas da API
async function loadTasks() {
    try {
        tasksContainer.innerHTML = '<div class="loading">Carregando tarefas...</div>';
        
        const response = await fetch(`${API_BASE_URL}/tasks`);
        tasks = await response.json();
        
        console.log('📋 Tarefas carregadas:', tasks.length);
        renderTasks();
        updateStats();
    } catch (error) {
        console.error('❌ Erro ao carregar tarefas:', error);
        tasksContainer.innerHTML = '<div class="error-message">Erro ao carregar tarefas. Verifique se a API está rodando.</div>';
    }
}

// Renderiza lista de tarefas
function renderTasks() {
    const filteredTasks = filterTasks(tasks);
    
    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>Nenhuma tarefa encontrada</p>
            </div>
        `;
        return;
    }
    
    tasksContainer.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                <div class="task-meta">
                    ${task.category ? `<span class="task-category" style="background-color: ${task.category.color}">${task.category.name}</span>` : ''}
                    <span>📅 ${formatDate(task.createdAt)}</span>
                </div>
            </div>
            <div class="task-actions">
                ${!task.completed ? `
                    <button class="btn-complete" onclick="toggleTask('${task.id}', true)">✓ Concluir</button>
                ` : `
                    <button class="btn-complete" onclick="toggleTask('${task.id}', false)">↩ Reabrir</button>
                `}
                <button class="btn-delete" onclick="deleteTask('${task.id}')">🗑 Deletar</button>
            </div>
        </div>
    `).join('');
}

// Filtra tarefas baseado no filtro atual
function filterTasks(tasks) {
    switch(currentFilter) {
        case 'completed':
            return tasks.filter(t => t.completed);
        case 'pending':
            return tasks.filter(t => !t.completed);
        default:
            return tasks;
    }
}

// Atualiza botões de filtro
function updateFilterButtons() {
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    });
}

// Atualiza estatísticas
function updateStats() {
    document.getElementById('total-tasks').textContent = tasks.length;
    document.getElementById('pending-tasks').textContent = tasks.filter(t => !t.completed).length;
    document.getElementById('completed-tasks').textContent = tasks.filter(t => t.completed).length;
}

// Cria nova tarefa
async function handleCreateTask(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const categoryId = document.getElementById('category').value;
    
    const taskData = {
        title,
        description: description || undefined,
        categoryId: categoryId || undefined
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        if (response.ok) {
            const newTask = await response.json();
            console.log('✅ Tarefa criada:', newTask);
            
            showMessage('Tarefa criada com sucesso!', 'success');
            taskForm.reset();
            await loadTasks(); // Recarrega lista
        } else {
            const error = await response.json();
            showMessage(`Erro: ${error.message}`, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao criar tarefa:', error);
        showMessage('Erro ao criar tarefa. Verifique sua conexão.', 'error');
    }
}

// Marca/desmarca tarefa como concluída
async function toggleTask(taskId, completed) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
        
        if (response.ok) {
            console.log(`✅ Tarefa ${completed ? 'concluída' : 'reaberta'}`);
            await loadTasks();
        } else {
            showMessage('Erro ao atualizar tarefa', 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao atualizar tarefa:', error);
        showMessage('Erro ao atualizar tarefa', 'error');
    }
}

// Deleta tarefa
async function deleteTask(taskId) {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            console.log('✅ Tarefa deletada');
            showMessage('Tarefa deletada com sucesso!', 'success');
            await loadTasks();
        } else {
            showMessage('Erro ao deletar tarefa', 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao deletar tarefa:', error);
        showMessage('Erro ao deletar tarefa', 'error');
    }
}

// Atualiza dados
async function handleRefresh() {
    console.log('🔄 Atualizando dados...');
    await checkAPIConnection();
    await loadCategories();
    await loadTasks();
}

// Mostra mensagem de feedback
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => messageDiv.remove(), 3000);
}

// Formata data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Escapa HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
