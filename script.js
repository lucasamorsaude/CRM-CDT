// Dados mockados
const mockData = {
    vendedores: [
        { id: 1, nome: 'M1', leads: 18, vendas: 9, negociacao: 4, aguardando: 4, perdidos: 4, conversao: 28 },
        { id: 2, nome: 'Everton', leads: 185, vendas: 25, negociacao: 34, aguardando: 100, perdidos: 34, conversao: 26 },
        { id: 3, nome: 'Tiago', leads: 14, vendas: 0, negociacao: 1, aguardando: 8, perdidos: 1, conversao: 0 },
        { id: 4, nome: 'Heida', leads: 106, vendas: 14, negociacao: 12, aguardando: 44, perdidos: 12, conversao: 15 },
        { id: 5, nome: 'Carla', leads: 21, vendas: 6, negociacao: 3, aguardando: 5, perdidos: 3, conversao: 38 },
        { id: 6, nome: 'Bruna', leads: 113, vendas: 26, negociacao: 7, aguardando: 63, perdidos: 7, conversao: 26 },
        { id: 7, nome: 'Luma', leads: 136, vendas: 37, negociacao: 21, aguardando: 43, perdidos: 21, conversao: 27 }
    ],
    leads: [
        { id: 1, vendedor: 'Carla', nome: 'Leonardo Amaral', telefone: '(32) 3859-3686', email: 'leonardo@email.com', origem: 'Tráfego Pago', status: 'aguardando', observacao: 'Retorno', data: '2023-10-15' },
        { id: 2, vendedor: 'Everton', nome: 'Ana Silva', telefone: '(32) 3859-3687', email: 'ana@email.com', origem: 'HubSpot', status: 'negociacao', observacao: 'Em contato', data: '2023-10-14' },
        { id: 3, vendedor: 'Bruna', nome: 'Sônia Oliveira', telefone: '(32) 3859-3688', email: 'sonia@email.com', origem: 'Remarketing', status: 'venda', observacao: '', data: '2023-10-13' },
        { id: 4, vendedor: 'Heida', nome: 'Vilma Santos', telefone: '(32) 3859-3689', email: 'vilma@email.com', origem: 'HubSpot', status: 'perdido', observacao: 'Contato inexistente', data: '2023-10-12' },
        { id: 5, vendedor: 'Luma', nome: 'Pedro Augusto', telefone: '(32) 3859-3690', email: 'pedro@email.com', origem: 'Recepção', status: 'negociacao', observacao: 'Em contato', data: '2023-10-11' },
        { id: 6, vendedor: 'Everton', nome: 'João Carlos', telefone: '(32) 3859-3691', email: 'joao@email.com', origem: 'WhatsApp', status: 'aguardando', observacao: 'Aguardando retorno', data: '2023-10-10' },
        { id: 7, vendedor: 'Carla', nome: 'Maria Santos', telefone: '(32) 3859-3692', email: 'maria@email.com', origem: 'Indicação', status: 'venda', observacao: '', data: '2023-10-09' },
        { id: 8, vendedor: 'Bruna', nome: 'Carlos Eduardo', telefone: '(32) 3859-3693', email: 'carlos@email.com', origem: 'Tráfego Pago', status: 'negociacao', observacao: 'Enviou proposta', data: '2023-10-08' }
    ],
    totais: {
        leads: 557,
        vendas: 116,
        negociacao: 82,
        aguardando: 260,
        perdidos: 94
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Configurar navegação
    setupNavigation();
    
    // Carregar dados iniciais
    loadDashboardData();
    loadLeadsData();
    loadVendedoresData();
    loadRelatoriosData();
    
    // Configurar eventos
    setupEventListeners();
}

// Navegação entre páginas
function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Atualizar menu ativo
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar página correspondente
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === `${targetPage}-page`) {
                    page.classList.add('active');
                }
            });
            
            // Atualizar título da página
            const pageTitles = {
                'dashboard': 'Dashboard de Leads',
                'leads': 'Gestão de Leads',
                'vendedores': 'Performance dos Vendedores',
                'relatorios': 'Relatórios e Análises',
                'configuracoes': 'Configurações'
            };
            
            pageTitle.textContent = pageTitles[targetPage];
        });
    });
}

// Configurar eventos
function setupEventListeners() {
    // Botão para adicionar lead
    document.getElementById('add-lead-btn').addEventListener('click', openLeadModal);
    
    // Fechar modal
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeLeadModal);
    });
    
    // Formulário de lead
    document.getElementById('lead-form').addEventListener('submit', saveLead);
    
    // Filtros
    document.getElementById('status-filter').addEventListener('change', filterLeads);
    document.getElementById('vendedor-filter').addEventListener('change', filterLeads);
    document.getElementById('search-lead').addEventListener('input', filterLeads);
    
    // Exportar dados
    document.getElementById('export-data').addEventListener('click', exportData);
}

// Carregar dados do dashboard
function loadDashboardData() {
    // Atualizar cards
    document.querySelector('.card:nth-child(1) .card-value').textContent = mockData.totais.leads;
    document.querySelector('.card:nth-child(2) .card-value').textContent = mockData.totais.vendas;
    document.querySelector('.card:nth-child(3) .card-value').textContent = mockData.totais.negociacao;
    document.querySelector('.card:nth-child(4) .card-value').textContent = mockData.totais.perdidos;
    
    // Carregar leads recentes
    const recentLeadsContainer = document.getElementById('recent-leads');
    recentLeadsContainer.innerHTML = '';
    
    mockData.leads.slice(0, 5).forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.vendedor}</td>
            <td>${lead.nome}</td>
            <td>${lead.telefone}</td>
            <td>${lead.origem}</td>
            <td><span class="status ${lead.status}">${getStatusText(lead.status)}</span></td>
            <td>${formatDate(lead.data)}</td>
        `;
        recentLeadsContainer.appendChild(row);
    });
    
    // Inicializar gráficos
    initCharts();
}

// Inicializar gráficos
function initCharts() {
    // Gráfico de desempenho por vendedor
    const vendedorCtx = document.getElementById('vendedorChart').getContext('2d');
    new Chart(vendedorCtx, {
        type: 'bar',
        data: {
            labels: mockData.vendedores.map(v => v.nome),
            datasets: [
                {
                    label: 'Leads',
                    data: mockData.vendedores.map(v => v.leads),
                    backgroundColor: 'rgba(67, 97, 238, 0.7)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Conversão (%)',
                    data: mockData.vendedores.map(v => v.conversao),
                    backgroundColor: 'rgba(76, 201, 240, 0.7)',
                    borderColor: 'rgba(76, 201, 240, 1)',
                    borderWidth: 1,
                    type: 'line',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de Leads'
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Taxa de Conversão (%)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
    
    // Gráfico de status dos leads
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Venda', 'Negociação', 'Aguardando', 'Perdido'],
            datasets: [{
                data: [
                    mockData.totais.vendas,
                    mockData.totais.negociacao,
                    mockData.totais.aguardando,
                    mockData.totais.perdidos
                ],
                backgroundColor: [
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(114, 9, 183, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(230, 57, 70, 0.7)'
                ],
                borderColor: [
                    'rgba(76, 201, 240, 1)',
                    'rgba(114, 9, 183, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(230, 57, 70, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Carregar dados da página de leads
function loadLeadsData() {
    const leadsContainer = document.getElementById('all-leads');
    const vendedorFilter = document.getElementById('vendedor-filter');
    
    // Popular filtro de vendedores
    vendedorFilter.innerHTML = '<option value="">Todos os Vendedores</option>';
    mockData.vendedores.forEach(vendedor => {
        const option = document.createElement('option');
        option.value = vendedor.nome;
        option.textContent = vendedor.nome;
        vendedorFilter.appendChild(option);
    });
    
    // Carregar todos os leads
    renderLeadsTable(mockData.leads);
}

// Renderizar tabela de leads
function renderLeadsTable(leads) {
    const leadsContainer = document.getElementById('all-leads');
    const leadsInfo = document.getElementById('leads-info');
    
    leadsContainer.innerHTML = '';
    
    leads.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.vendedor}</td>
            <td>${lead.nome}</td>
            <td>${lead.telefone}</td>
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
    
    // Atualizar informações de paginação
    leadsInfo.textContent = `Mostrando ${leads.length} de ${leads.length} leads`;
    
    // Adicionar eventos aos botões de ação
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

// Filtrar leads
function filterLeads() {
    const statusFilter = document.getElementById('status-filter').value;
    const vendedorFilter = document.getElementById('vendedor-filter').value;
    const searchFilter = document.getElementById('search-lead').value.toLowerCase();
    
    const filteredLeads = mockData.leads.filter(lead => {
        const statusMatch = !statusFilter || lead.status === statusFilter;
        const vendedorMatch = !vendedorFilter || lead.vendedor === vendedorFilter;
        const searchMatch = !searchFilter || 
            lead.nome.toLowerCase().includes(searchFilter) ||
            lead.telefone.includes(searchFilter) ||
            lead.origem.toLowerCase().includes(searchFilter);
        
        return statusMatch && vendedorMatch && searchMatch;
    });
    
    renderLeadsTable(filteredLeads);
}

// Carregar dados da página de vendedores
function loadVendedoresData() {
    const vendedoresContainer = document.getElementById('vendedores-table');
    const cardsContainer = document.querySelector('#vendedores-page .cards-container');
    
    // Limpar containers
    vendedoresContainer.innerHTML = '';
    cardsContainer.innerHTML = '';
    
    // Adicionar cards de vendedores
    mockData.vendedores.forEach(vendedor => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${vendedor.nome}</div>
                <div class="card-icon leads">
                    <i class="fas fa-user-tie"></i>
                </div>
            </div>
            <div class="card-value">${vendedor.leads}</div>
            <div class="card-footer">
                Taxa de conversão: <strong>${vendedor.conversao}%</strong>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
    
    // Adicionar tabela de performance
    mockData.vendedores.forEach(vendedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vendedor.nome}</td>
            <td>${vendedor.leads}</td>
            <td>${vendedor.vendas}</td>
            <td>${vendedor.negociacao}</td>
            <td>${vendedor.aguardando}</td>
            <td>${vendedor.perdidos}</td>
            <td><strong>${vendedor.conversao}%</strong></td>
        `;
        vendedoresContainer.appendChild(row);
    });
}

// Carregar dados da página de relatórios
function loadRelatoriosData() {
    // Gráfico de leads por origem
    const origemCtx = document.getElementById('origemChart').getContext('2d');
    new Chart(origemCtx, {
        type: 'pie',
        data: {
            labels: ['HubSpot', 'Tráfego Pago', 'Recepção', 'WhatsApp', 'Indicação', 'Remarketing'],
            datasets: [{
                data: [120, 180, 95, 70, 45, 47],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(114, 9, 183, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(230, 57, 70, 0.7)',
                    'rgba(56, 176, 0, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Gráfico de conversão por mês
    const conversaoCtx = document.getElementById('conversaoChart').getContext('2d');
    new Chart(conversaoCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
            datasets: [{
                label: 'Taxa de Conversão (%)',
                data: [18, 22, 19, 25, 23, 26, 24, 28, 26, 30],
                borderColor: 'rgba(67, 97, 238, 1)',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40
                }
            }
        }
    });
    
    // Gráfico de evolução mensal
    const evolucaoCtx = document.getElementById('evolucaoChart').getContext('2d');
    new Chart(evolucaoCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
            datasets: [
                {
                    label: 'Leads',
                    data: [420, 480, 510, 520, 530, 540, 550, 560, 570, 580],
                    backgroundColor: 'rgba(67, 97, 238, 0.7)'
                },
                {
                    label: 'Vendas',
                    data: [80, 95, 105, 110, 115, 120, 125, 130, 135, 140],
                    backgroundColor: 'rgba(76, 201, 240, 0.7)'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    stacked: false
                }
            }
        }
    });
}

// Abrir modal de lead
function openLeadModal(leadId = null) {
    const modal = document.getElementById('lead-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('lead-form');
    
    // Popular seletor de vendedores
    const vendedorSelect = document.getElementById('lead-vendedor');
    vendedorSelect.innerHTML = '<option value="">Selecione um vendedor</option>';
    mockData.vendedores.forEach(vendedor => {
        const option = document.createElement('option');
        option.value = vendedor.nome;
        option.textContent = vendedor.nome;
        vendedorSelect.appendChild(option);
    });
    
    if (leadId) {
        // Modo edição
        modalTitle.textContent = 'Editar Lead';
        const lead = mockData.leads.find(l => l.id == leadId);
        
        if (lead) {
            document.getElementById('lead-nome').value = lead.nome;
            document.getElementById('lead-telefone').value = lead.telefone;
            document.getElementById('lead-email').value = lead.email;
            document.getElementById('lead-vendedor').value = lead.vendedor;
            document.getElementById('lead-status').value = lead.status;
            document.getElementById('lead-origem').value = lead.origem;
            document.getElementById('lead-observacao').value = lead.observacao;
            
            form.setAttribute('data-edit-id', leadId);
        }
    } else {
        // Modo criação
        modalTitle.textContent = 'Adicionar Novo Lead';
        form.reset();
        form.removeAttribute('data-edit-id');
    }
    
    modal.classList.add('active');
}

// Fechar modal de lead
function closeLeadModal() {
    document.getElementById('lead-modal').classList.remove('active');
}

// Salvar lead
function saveLead(e) {
    e.preventDefault();
    
    const form = document.getElementById('lead-form');
    const isEdit = form.hasAttribute('data-edit-id');
    
    const leadData = {
        nome: document.getElementById('lead-nome').value,
        telefone: document.getElementById('lead-telefone').value,
        email: document.getElementById('lead-email').value,
        vendedor: document.getElementById('lead-vendedor').value,
        status: document.getElementById('lead-status').value,
        origem: document.getElementById('lead-origem').value,
        observacao: document.getElementById('lead-observacao').value,
        data: new Date().toISOString().split('T')[0]
    };
    
    if (isEdit) {
        // Atualizar lead existente
        const leadId = form.getAttribute('data-edit-id');
        const leadIndex = mockData.leads.findIndex(l => l.id == leadId);
        
        if (leadIndex !== -1) {
            mockData.leads[leadIndex] = {
                ...mockData.leads[leadIndex],
                ...leadData
            };
        }
    } else {
        // Adicionar novo lead
        const newId = Math.max(...mockData.leads.map(l => l.id)) + 1;
        mockData.leads.unshift({
            id: newId,
            ...leadData
        });
    }
    
    closeLeadModal();
    
    // Recarregar dados
    loadDashboardData();
    loadLeadsData();
    
    // Mostrar mensagem de sucesso
    alert(`Lead ${isEdit ? 'atualizado' : 'adicionado'} com sucesso!`);
}

// Editar lead
function editLead(leadId) {
    openLeadModal(leadId);
}

// Excluir lead
function deleteLead(leadId) {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
        const leadIndex = mockData.leads.findIndex(l => l.id == leadId);
        
        if (leadIndex !== -1) {
            mockData.leads.splice(leadIndex, 1);
            
            // Recarregar dados
            loadDashboardData();
            loadLeadsData();
            
            alert('Lead excluído com sucesso!');
        }
    }
}

// Exportar dados
function exportData() {
    // Criar CSV
    let csv = 'Vendedor,Nome,Telefone,Email,Origem,Status,Observação,Data\n';
    
    mockData.leads.forEach(lead => {
        csv += `"${lead.vendedor}","${lead.nome}","${lead.telefone}","${lead.email}","${lead.origem}","${getStatusText(lead.status)}","${lead.observacao}","${lead.data}"\n`;
    });
    
    // Criar arquivo e fazer download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Funções auxiliares
function getStatusText(status) {
    const statusMap = {
        'venda': 'Venda',
        'negociacao': 'Negociação',
        'aguardando': 'Aguardando',
        'perdido': 'Perdido'
    };
    
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}