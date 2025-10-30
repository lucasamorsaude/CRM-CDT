// js/relatorios.js
document.addEventListener('DOMContentLoaded', function() {
    initializeRelatorios();
});

function initializeRelatorios() {
    loadMetricsData();
    initCharts();
    loadPerformanceTable();
    setupEventListeners();
}

function loadMetricsData() {
    // Dados mockados para as métricas
    const metricsData = {
        taxaConversao: '24.5%',
        ticketMedio: 'R$ 1.250',
        tempoConversao: '18 dias',
        custoLead: 'R$ 45'
    };

    document.getElementById('taxa-conversao').textContent = metricsData.taxaConversao;
    document.getElementById('ticket-medio').textContent = metricsData.ticketMedio;
    document.getElementById('tempo-conversao').textContent = metricsData.tempoConversao;
    document.getElementById('custo-lead').textContent = metricsData.custoLead;
}

function initCharts() {
    // Gráfico de Leads por Origem
    const origemCtx = document.getElementById('origemChart').getContext('2d');
    new Chart(origemCtx, {
        type: 'doughnut',
        data: {
            labels: ['Tráfego Pago', 'HubSpot', 'Recepção', 'WhatsApp', 'Indicação', 'Remarketing'],
            datasets: [{
                data: [180, 120, 95, 70, 45, 47],
                backgroundColor: [
                    'rgba(49, 180, 71, 0.8)',
                    'rgba(76, 201, 240, 0.8)',
                    'rgba(114, 9, 183, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(230, 57, 70, 0.8)',
                    'rgba(56, 176, 0, 0.8)'
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

    // Gráfico de Conversão por Mês
    const conversaoCtx = document.getElementById('conversaoChart').getContext('2d');
    new Chart(conversaoCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
            datasets: [{
                label: 'Taxa de Conversão (%)',
                data: [18, 22, 19, 25, 23, 26, 24, 28, 26, 30],
                borderColor: 'rgba(49, 180, 71, 1)',
                backgroundColor: 'rgba(49, 180, 71, 0.1)',
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

    // Gráfico de Evolução de Vendas
    const vendasCtx = document.getElementById('vendasChart').getContext('2d');
    new Chart(vendasCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
            datasets: [
                {
                    label: 'Leads',
                    data: [420, 480, 510, 520, 530, 540, 550, 560, 570, 580],
                    backgroundColor: 'rgba(76, 201, 240, 0.7)'
                },
                {
                    label: 'Vendas',
                    data: [80, 95, 105, 110, 115, 120, 125, 130, 135, 140],
                    backgroundColor: 'rgba(49, 180, 71, 0.7)'
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

    // Gráfico de Status ao Longo do Tempo
    const statusCtx = document.getElementById('statusTimelineChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
            datasets: [
                {
                    label: 'Aguardando',
                    data: [320, 300, 280, 260, 250, 240, 230, 220, 210, 200],
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'Negociação',
                    data: [60, 65, 70, 75, 80, 82, 85, 88, 90, 95],
                    borderColor: 'rgba(114, 9, 183, 1)',
                    backgroundColor: 'rgba(114, 9, 183, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'Vendas',
                    data: [80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
                    borderColor: 'rgba(76, 201, 240, 1)',
                    backgroundColor: 'rgba(76, 201, 240, 0.1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true
        }
    });
}

function loadPerformanceTable() {
    const performanceData = [
        { canal: 'Tráfego Pago', leads: 180, vendas: 45, conversao: '25%', custoLead: 'R$ 60', roi: '208%' },
        { canal: 'HubSpot', leads: 120, vendas: 32, conversao: '26.7%', custoLead: 'R$ 35', roi: '357%' },
        { canal: 'Recepção', leads: 95, vendas: 28, conversao: '29.5%', custoLead: 'R$ 15', roi: '833%' },
        { canal: 'WhatsApp', leads: 70, vendas: 18, conversao: '25.7%', custoLead: 'R$ 8', roi: '1562%' },
        { canal: 'Indicação', leads: 45, vendas: 15, conversao: '33.3%', custoLead: 'R$ 0', roi: '∞' },
        { canal: 'Remarketing', leads: 47, vendas: 12, conversao: '25.5%', custoLead: 'R$ 25', roi: '500%' }
    ];

    const tableBody = document.getElementById('performance-table');
    tableBody.innerHTML = '';

    performanceData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.canal}</strong></td>
            <td>${item.leads}</td>
            <td>${item.vendas}</td>
            <td><span class="status ${parseFloat(item.conversao) > 25 ? 'venda' : 'negociacao'}">${item.conversao}</span></td>
            <td>${item.custoLead}</td>
            <td><strong>${item.roi}</strong></td>
        `;
        tableBody.appendChild(row);
    });
}

function setupEventListeners() {
    // Filtro de período
    document.getElementById('periodo-filter').addEventListener('change', function() {
        // Recarregar dados com base no período selecionado
        showNotification(`Período alterado para: ${this.options[this.selectedIndex].text}`, 'success');
    });

    // Botão exportar
    document.getElementById('export-relatorio').addEventListener('click', function() {
        exportRelatorio();
    });
}

function exportRelatorio() {
    // Simular exportação de relatório
    showNotification('Relatório exportado com sucesso!', 'success');
    
    // Em uma implementação real, aqui seria feita a geração do PDF/Excel
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = '#'; // URL do relatório gerado
        link.download = `relatorio_leads_${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
    }, 1000);
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