// js/vendedores.js
document.addEventListener('DOMContentLoaded', function() {
    loadVendedoresData();
});

function loadVendedoresData() {
    const vendedoresData = [
        { nome: 'M1', leads: 18, vendas: 9, negociacao: 4, aguardando: 4, perdidos: 4, conversao: 28, meta: 25 },
        { nome: 'Everton', leads: 185, vendas: 25, negociacao: 34, aguardando: 100, perdidos: 34, conversao: 26, meta: 30 },
        { nome: 'Tiago', leads: 14, vendas: 0, negociacao: 1, aguardando: 8, perdidos: 1, conversao: 0, meta: 20 },
        { nome: 'Heida', leads: 106, vendas: 14, negociacao: 12, aguardando: 44, perdidos: 12, conversao: 15, meta: 25 },
        { nome: 'Carla', leads: 21, vendas: 6, negociacao: 3, aguardando: 5, perdidos: 3, conversao: 38, meta: 20 },
        { nome: 'Bruna', leads: 113, vendas: 26, negociacao: 7, aguardando: 63, perdidos: 7, conversao: 26, meta: 30 },
        { nome: 'Luma', leads: 136, vendas: 37, negociacao: 21, aguardando: 43, perdidos: 21, conversao: 27, meta: 35 }
    ];

    renderVendedoresCards(vendedoresData);
    renderVendedoresTable(vendedoresData);
}

function renderVendedoresCards(vendedores) {
    const container = document.getElementById('vendedores-cards');
    container.innerHTML = '';
    
    vendedores.forEach(vendedor => {
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
            <div class="card-footer ${vendedor.conversao >= vendedor.meta ? 'positive' : 'negative'}">
                Conversão: <strong>${vendedor.conversao}%</strong> | Meta: ${vendedor.meta}%
            </div>
        `;
        container.appendChild(card);
    });
}

function renderVendedoresTable(vendedores) {
    const container = document.getElementById('vendedores-table');
    container.innerHTML = '';
    
    vendedores.forEach(vendedor => {
        const row = document.createElement('tr');
        const metaAlcancada = vendedor.conversao >= vendedor.meta;
        
        row.innerHTML = `
            <td><strong>${vendedor.nome}</strong></td>
            <td>${vendedor.leads}</td>
            <td>${vendedor.vendas}</td>
            <td>${vendedor.negociacao}</td>
            <td>${vendedor.aguardando}</td>
            <td>${vendedor.perdidos}</td>
            <td>
                <span class="status ${metaAlcancada ? 'venda' : 'perdido'}">
                    ${vendedor.conversao}%
                </span>
            </td>
            <td>${vendedor.meta}%</td>
        `;
        container.appendChild(row);
    });
}