// js/dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    loadDashboardData();
    initCharts();
}

function loadDashboardData() {
    // Simular carregamento de dados
    const dashboardData = {
        totalLeads: 557,
        totalVendas: 116,
        totalNegociacao: 82,
        totalPerdidos: 94,
        variacaoLeads: 12,
        variacaoVendas: 8,
        variacaoNegociacao: 15,
        variacaoPerdidos: -5,
        recentLeads: [
            { vendedor: 'Carla', nome: 'Leonardo Amaral', telefone: '(32) 3859-3686', origem: 'Tráfego Pago', status: 'aguardando', data: '2023-10-15' },
            { vendedor: 'Everton', nome: 'Ana Silva', telefone: '(32) 3859-3687', origem: 'HubSpot', status: 'negociacao', data: '2023-10-14' },
            { vendedor: 'Bruna', nome: 'Sônia Oliveira', telefone: '(32) 3859-3688', origem: 'Remarketing', status: 'venda', data: '2023-10-13' },
            { vendedor: 'Heida', nome: 'Vilma Santos', telefone: '(32) 3859-3689', origem: 'HubSpot', status: 'perdido', data: '2023-10-12' },
            { vendedor: 'Luma', nome: 'Pedro Augusto', telefone: '(32) 3859-3690', origem: 'Recepção', status: 'negociacao', data: '2023-10-11' }
        ]
    };

    // Atualizar cards
    document.getElementById('total-leads').textContent = dashboardData.totalLeads;
    document.getElementById('total-vendas').textContent = dashboardData.totalVendas;
    document.getElementById('total-negociacao').textContent = dashboardData.totalNegociacao;
    document.getElementById('total-perdidos').textContent = dashboardData.totalPerdidos;
    
    document.getElementById('leads-variacao').textContent = dashboardData.variacaoLeads + '%';
    document.getElementById('vendas-variacao').textContent = dashboardData.variacaoVendas + '%';
    document.getElementById('negociacao-variacao').textContent = dashboardData.variacaoNegociacao + '%';
    document.getElementById('perdidos-variacao').textContent = Math.abs(dashboardData.variacaoPerdidos) + '%';

    // Carregar leads recentes
    const recentLeadsContainer = document.getElementById('recent-leads');
    recentLeadsContainer.innerHTML = '';
    
    dashboardData.recentLeads.forEach(lead => {
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
}

function initCharts() {
    // Dados mockados
    const vendedores = ['M1', 'Everton', 'Tiago', 'Heida', 'Carla', 'Bruna', 'Luma'];
    const leadsVendedores = [18, 185, 14, 106, 21, 113, 136];
    const conversaoVendedores = [28, 26, 0, 15, 38, 26, 27];
    
    // Gráfico de desempenho por vendedor
    const vendedorCtx = document.getElementById('vendedorChart').getContext('2d');
    new Chart(vendedorCtx, {
        type: 'bar',
        data: {
            labels: vendedores,
            datasets: [
                {
                    label: 'Leads',
                    data: leadsVendedores,
                    backgroundColor: 'rgba(49, 180, 71, 0.7)',
                    borderColor: 'rgba(49, 180, 71, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Conversão (%)',
                    data: conversaoVendedores,
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
                data: [116, 82, 260, 94],
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