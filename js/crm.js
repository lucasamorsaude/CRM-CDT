
        // Dados mockados
        const mockData = {
            vendedores: [
                { id: 1, nome: 'M1' },
                { id: 2, nome: 'Everton' },
                { id: 3, nome: 'Tiago' },
                { id: 4, nome: 'Heida' },
                { id: 5, nome: 'Carla' },
                { id: 6, nome: 'Bruna' },
                { id: 7, nome: 'Luma' }
            ],
            leads: [
                { 
                    id: 1, 
                    vendedor: 'Carla', 
                    nome: 'Leonardo Amaral', 
                    telefone: '(32) 3859-3686', 
                    email: 'leonardo@email.com', 
                    origem: 'Tráfego Pago', 
                    status: 'aguardando', 
                    observacao: 'Aguardando retorno', 
                    data: '2023-10-15' 
                },
                { 
                    id: 2, 
                    vendedor: 'Everton', 
                    nome: 'Ana Silva', 
                    telefone: '(32) 3859-3687', 
                    email: 'ana@email.com', 
                    origem: 'HubSpot', 
                    status: 'negociacao', 
                    observacao: 'Enviou proposta', 
                    data: '2023-10-14' 
                },
                { 
                    id: 3, 
                    vendedor: 'Bruna', 
                    nome: 'Sônia Oliveira', 
                    telefone: '(32) 3859-3688', 
                    email: 'sonia@email.com', 
                    origem: 'Remarketing', 
                    status: 'venda', 
                    observacao: 'Venda concluída', 
                    data: '2023-10-13' 
                },
                { 
                    id: 4, 
                    vendedor: 'Heida', 
                    nome: 'Vilma Santos', 
                    telefone: '(32) 3859-3689', 
                    email: 'vilma@email.com', 
                    origem: 'HubSpot', 
                    status: 'perdido', 
                    observacao: 'Contato inexistente', 
                    data: '2023-10-12' 
                },
                { 
                    id: 5, 
                    vendedor: 'Luma', 
                    nome: 'Pedro Augusto', 
                    telefone: '(32) 3859-3690', 
                    email: 'pedro@email.com', 
                    origem: 'Recepção', 
                    status: 'negociacao', 
                    observacao: 'Aguardando resposta', 
                    data: '2023-10-11' 
                },
                { 
                    id: 6, 
                    vendedor: 'Everton', 
                    nome: 'João Carlos', 
                    telefone: '(32) 3859-3691', 
                    email: 'joao@email.com', 
                    origem: 'WhatsApp', 
                    status: 'aguardando', 
                    observacao: 'Primeiro contato', 
                    data: '2023-10-10' 
                },
                { 
                    id: 7, 
                    vendedor: 'Carla', 
                    nome: 'Maria Santos', 
                    telefone: '(32) 3859-3692', 
                    email: 'maria@email.com', 
                    origem: 'Indicação', 
                    status: 'aguardando', 
                    observacao: 'Interessado no produto', 
                    data: '2023-10-09' 
                }
            ]
        };

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            initializeKanban();
            setupEventListeners();
        });

        function initializeKanban() {
            renderKanbanBoard();
            setupDragAndDrop();
        }

        function renderKanbanBoard() {
            // Limpar colunas
            document.getElementById('aguardando-column').innerHTML = '';
            document.getElementById('negociacao-column').innerHTML = '';
            document.getElementById('venda-column').innerHTML = '';
            document.getElementById('perdido-column').innerHTML = '';
            
            // Contadores
            const counts = {
                aguardando: 0,
                negociacao: 0,
                venda: 0,
                perdido: 0
            };
            
            // Adicionar cards às colunas
            mockData.leads.forEach(lead => {
                const card = createKanbanCard(lead);
                const column = document.getElementById(`${lead.status}-column`);
                column.appendChild(card);
                counts[lead.status]++;
            });
            
            // Atualizar contadores
            document.querySelectorAll('.kanban-column').forEach(column => {
                const status = column.getAttribute('data-status');
                const countElement = column.querySelector('.column-count');
                countElement.textContent = counts[status];
                
                // Adicionar empty state se necessário
                const columnContent = column.querySelector('.column-content');
                if (counts[status] === 0) {
                    columnContent.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-inbox"></i>
                            <p>Nenhum lead</p>
                        </div>
                    `;
                }
            });
        }

        function createKanbanCard(lead) {
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.setAttribute('draggable', 'true');
            card.setAttribute('data-lead-id', lead.id);
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-title">${lead.nome}</div>
                    <div class="card-vendedor">${lead.vendedor}</div>
                </div>
                <div class="card-info">
                    <div><i class="fas fa-phone"></i> ${lead.telefone}</div>
                    <div><i class="fas fa-envelope"></i> ${lead.email || 'Não informado'}</div>
                    <div><i class="fas fa-tag"></i> ${lead.origem}</div>
                </div>
                <div class="card-actions">
                    <button class="action-btn edit" data-id="${lead.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" data-id="${lead.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            // Adicionar eventos aos botões
            card.querySelector('.action-btn.edit').addEventListener('click', function(e) {
                e.stopPropagation();
                editLead(lead.id);
            });
            
            card.querySelector('.action-btn.delete').addEventListener('click', function(e) {
                e.stopPropagation();
                deleteLead(lead.id);
            });
            
            return card;
        }

        function setupDragAndDrop() {
            const cards = document.querySelectorAll('.kanban-card');
            const columns = document.querySelectorAll('.kanban-column .column-content');
            
            // Configurar eventos de drag para os cards
            cards.forEach(card => {
                card.addEventListener('dragstart', handleDragStart);
                card.addEventListener('dragend', handleDragEnd);
            });
            
            // Configurar eventos de drop para as colunas
            columns.forEach(column => {
                column.addEventListener('dragover', handleDragOver);
                column.addEventListener('dragenter', handleDragEnter);
                column.addEventListener('dragleave', handleDragLeave);
                column.addEventListener('drop', handleDrop);
            });
        }

        function handleDragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-lead-id'));
            e.target.classList.add('dragging');
            
            // Efeito visual para todas as colunas
            document.querySelectorAll('.kanban-column .column-content').forEach(column => {
                column.classList.add('drag-over');
            });
        }

        function handleDragEnd(e) {
            e.target.classList.remove('dragging');
            
            // Remover efeito visual de todas as colunas
            document.querySelectorAll('.kanban-column .column-content').forEach(column => {
                column.classList.remove('drag-over');
            });
        }

        function handleDragOver(e) {
            e.preventDefault();
        }

        function handleDragEnter(e) {
            e.preventDefault();
            e.target.closest('.column-content').classList.add('drag-over-active');
        }

        function handleDragLeave(e) {
            e.target.closest('.column-content').classList.remove('drag-over-active');
        }

        function handleDrop(e) {
            e.preventDefault();
            e.target.closest('.column-content').classList.remove('drag-over-active');
            
            const leadId = e.dataTransfer.getData('text/plain');
            const newStatus = e.target.closest('.kanban-column').getAttribute('data-status');
            
            // Atualizar status do lead
            updateLeadStatus(leadId, newStatus);
        }

        function updateLeadStatus(leadId, newStatus) {
            const leadIndex = mockData.leads.findIndex(lead => lead.id == leadId);
            
            if (leadIndex !== -1) {
                mockData.leads[leadIndex].status = newStatus;
                renderKanbanBoard();
                setupDragAndDrop();
                
                // Mostrar feedback visual
                showNotification(`Lead movido para ${getStatusText(newStatus)}`, 'success');
            }
        }

        function setupEventListeners() {
            // Botão para adicionar lead
            document.getElementById('add-lead-btn').addEventListener('click', openLeadModal);
            
            // Fechar modal
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', closeLeadModal);
            });
            
            // Formulário de lead
            document.getElementById('lead-form').addEventListener('submit', saveLead);
            
            // Popular seletor de vendedores
            const vendedorSelect = document.getElementById('lead-vendedor');
            mockData.vendedores.forEach(vendedor => {
                const option = document.createElement('option');
                option.value = vendedor.nome;
                option.textContent = vendedor.nome;
                vendedorSelect.appendChild(option);
            });
        }

        function openLeadModal(leadId = null) {
            const modal = document.getElementById('lead-modal');
            const modalTitle = document.getElementById('modal-title');
            const form = document.getElementById('lead-form');
            
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

        function closeLeadModal() {
            document.getElementById('lead-modal').classList.remove('active');
        }

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
            renderKanbanBoard();
            setupDragAndDrop();
            
            showNotification(`Lead ${isEdit ? 'atualizado' : 'adicionado'} com sucesso!`, 'success');
        }

        function editLead(leadId) {
            openLeadModal(leadId);
        }

        function deleteLead(leadId) {
            if (confirm('Tem certeza que deseja excluir este lead?')) {
                const leadIndex = mockData.leads.findIndex(l => l.id == leadId);
                
                if (leadIndex !== -1) {
                    mockData.leads.splice(leadIndex, 1);
                    renderKanbanBoard();
                    setupDragAndDrop();
                    
                    showNotification('Lead excluído com sucesso!', 'success');
                }
            }
        }

        function showNotification(message, type) {
            // Criar elemento de notificação
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#31b447' : '#e63946'};
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 3000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Animação de entrada
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remover após 3 segundos
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