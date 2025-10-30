// js/leads.js
let currentPage = 1;
const leadsPerPage = 10;
let filteredLeads = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeLeadsPage();
});

function initializeLeadsPage() {
    loadLeadsData();
    setupEventListeners();
}

function loadLeadsData() {
    // Dados mockados
    const leadsData = [
        { id: 1, vendedor: 'Carla', nome: 'Leonardo Amaral', telefone: '(32) 3859-3686', email: 'leonardo@email.com', origem: 'Tráfego Pago', status: 'aguardando', observacao: 'Aguardando retorno', data: '2023-10-15' },
        { id: 2, vendedor: 'Everton', nome: 'Ana Silva', telefone: '(32) 3859-3687', email: 'ana@email.com', origem: 'HubSpot', status: 'negociacao', observacao: 'Enviou proposta', data: '2023-10-14' },
        { id: 3, vendedor: 'Bruna', nome: 'Sônia Oliveira', telefone: '(32) 3859-3688', email: 'sonia@email.com', origem: 'Remarketing', status: 'venda', observacao: 'Venda concluída', data: '2023-10-13' },
        { id: 4, vendedor: 'Heida', nome: 'Vilma Santos', telefone: '(32) 3859-3689', email: 'vilma@email.com', origem: 'HubSpot', status: 'perdido', observacao: 'Contato inexistente', data: '2023-10-12' },
        { id: 5, vendedor: 'Luma', nome: 'Pedro Augusto', telefone: '(32) 3859-3690', email: 'pedro@email.com', origem: 'Recepção', status: 'negociacao', observacao: 'Aguardando resposta', data: '2023-10-11' },
        { id: 6, vendedor: 'Everton', nome: 'João Carlos', telefone: '(32) 3859-3691', email: 'joao@email.com', origem: 'WhatsApp', status: 'aguardando', observacao: 'Primeiro contato', data: '2023-10-10' },
        { id: 7, vendedor: 'Carla', nome: 'Maria Santos', telefone: '(32) 3859-3692', email: 'maria@email.com', origem: 'Indicação', status: 'aguardando', observacao: 'Interessado no produto', data: '2023-10-09' },
        { id: 8, vendedor: 'Bruna', nome: 'Carlos Eduardo', telefone: '(32) 3859-3693', email: 'carlos@email.com', origem: 'Tráfego Pago', status: 'negociacao', observacao: 'Enviou proposta', data: '2023-10-08' },
        { id: 9, vendedor: 'Tiago', nome: 'Fernanda Lima', telefone: '(32) 3859-3694', email: 'fernanda@email.com', origem: 'Recepção', status: 'venda', observacao: 'Venda rápida', data: '2023-10-07' },
        { id: 10, vendedor: 'Heida', nome: 'Ricardo Alves', telefone: '(32) 3859-3695', email: 'ricardo@email.com', origem: 'WhatsApp', status: 'perdido', observacao: 'Não atende', data: '2023-10-06' },
        { id: 11, vendedor: 'M1', nome: 'Patrícia Gomes', telefone: '(32) 3859-3696', email: 'patricia@email.com', origem: 'Indicação', status: 'aguardando', observacao: 'Solicitou orçamento', data: '2023-10-05' },
        { id: 12, vendedor: 'Luma', nome: 'Roberto Silva', telefone: '(32) 3859-3697', email: 'roberto@email.com', origem: 'HubSpot', status: 'negociacao', observacao: 'Analisando proposta', data: '2023-10-04' }
    ];

    // Popular filtro de vendedores
    const vendedores = [...new Set(leadsData.map(lead => lead.vendedor))];
    const vendedorFilter = document.getElementById('vendedor-filter');
    
    vendedores.forEach(vendedor => {
        const option = document.createElement('option');
        option.value = vendedor;
        option.textContent = vendedor;
        vendedorFilter.appendChild(option);
    });

    filteredLeads = [...leadsData];
    renderLeadsTable();
}

function renderLeadsTable() {
    const leadsContainer = document.getElementById('leads-table');
    const leadsInfo = document.getElementById('leads-info');
    
    // Calcular paginação
    const startIndex = (currentPage - 1) * leadsPerPage;
    const endIndex = startIndex + leadsPerPage;
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
    
    leadsContainer.innerHTML = '';
    
    if (paginatedLeads.length === 0) {
        leadsContainer.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px;">
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>Nenhum lead encontrado</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        paginatedLeads.forEach(lead => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lead.vendedor}</td>
                <td>${lead.nome}</td>
                <td>${lead.telefone}</td>
                <td>${lead.email || '-'}</td>
                <td>${lead.origem}</td>
                <td><span class="status ${lead.status}">${getStatusText(lead.status)}</span></td>
                <td>${formatDate(lead.data)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" data-id="${lead.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" data-id="${lead.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            leadsContainer.appendChild(row);
        });
    }
    
    // Atualizar informações de paginação
    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
    leadsInfo.textContent = `Mostrando ${paginatedLeads.length} de ${filteredLeads.length} leads - Página ${currentPage} de ${totalPages}`;
    
    // Atualizar controles de paginação
    updatePaginationControls(totalPages);
    
    // Adicionar eventos aos botões de ação
    setupActionButtons();
}

function setupActionButtons() {
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const leadId = this.getAttribute('data-id');
            editLead(leadId);
        });
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const leadId = this.getAttribute('data-id');
            deleteLead(leadId);
        });
    });
}

function updatePaginationControls(totalPages) {
    const paginationControls = document.querySelector('.pagination-controls');
    paginationControls.innerHTML = '';
    
    // Botão anterior
    const prevBtn = document.createElement('a');
    prevBtn.href = '#';
    prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderLeadsTable();
        }
    });
    paginationControls.appendChild(prevBtn);
    
    // Páginas
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('a');
        pageBtn.href = '#';
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage = i;
            renderLeadsTable();
        });
        paginationControls.appendChild(pageBtn);
    }
    
    // Botão próximo
    const nextBtn = document.createElement('a');
    nextBtn.href = '#';
    nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderLeadsTable();
        }
    });
    paginationControls.appendChild(nextBtn);
}

function setupEventListeners() {
    // Botão para adicionar lead
    document.getElementById('add-lead-btn').addEventListener('click', openLeadModal);
    
    // Filtros
    document.getElementById('status-filter').addEventListener('change', filterLeads);
    document.getElementById('vendedor-filter').addEventListener('change', filterLeads);
    document.getElementById('search-lead').addEventListener('input', filterLeads);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
    
    // Modal
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeLeadModal);
    });
    
    document.getElementById('lead-form').addEventListener('submit', saveLead);
}

function filterLeads() {
    const statusFilter = document.getElementById('status-filter').value;
    const vendedorFilter = document.getElementById('vendedor-filter').value;
    const searchFilter = document.getElementById('search-lead').value.toLowerCase();
    
    // Recarregar dados originais primeiro
    loadLeadsData();
    
    filteredLeads = filteredLeads.filter(lead => {
        const statusMatch = !statusFilter || lead.status === statusFilter;
        const vendedorMatch = !vendedorFilter || lead.vendedor === vendedorFilter;
        const searchMatch = !searchFilter || 
            lead.nome.toLowerCase().includes(searchFilter) ||
            lead.telefone.includes(searchFilter) ||
            lead.email.toLowerCase().includes(searchFilter) ||
            lead.origem.toLowerCase().includes(searchFilter);
        
        return statusMatch && vendedorMatch && searchMatch;
    });
    
    currentPage = 1;
    renderLeadsTable();
}

function clearFilters() {
    document.getElementById('status-filter').value = '';
    document.getElementById('vendedor-filter').value = '';
    document.getElementById('search-lead').value = '';
    filterLeads();
}

// Funções do Modal (similar às do CRM)
function openLeadModal(leadId = null) {
    const modal = document.getElementById('lead-modal');
    const modalTitle = document.getElementById('modal-title');
    
    if (leadId) {
        modalTitle.textContent = 'Editar Lead';
        // Preencher dados do lead
    } else {
        modalTitle.textContent = 'Adicionar Novo Lead';
        document.getElementById('lead-form').reset();
    }
    
    modal.classList.add('active');
}

function closeLeadModal() {
    document.getElementById('lead-modal').classList.remove('active');
}

function saveLead(e) {
    e.preventDefault();
    // Implementar salvar lead
    closeLeadModal();
    showNotification('Lead salvo com sucesso!', 'success');
    filterLeads();
}

function editLead(leadId) {
    openLeadModal(leadId);
}

function deleteLead(leadId) {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
        filteredLeads = filteredLeads.filter(lead => lead.id != leadId);
        renderLeadsTable();
        showNotification('Lead excluído com sucesso!', 'success');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getStatusText(status) {
    const statusMap = {
        'aguardando': 'Aguardando',
        'negociacao': 'Negociação',
        'venda': 'Venda',
        'perdido': 'Perdido'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}