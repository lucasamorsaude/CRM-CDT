// js/config.js
document.addEventListener('DOMContentLoaded', function() {
    initializeConfigPage();
});

function initializeConfigPage() {
    loadCurrentSettings();
    setupEventListeners();
}

function loadCurrentSettings() {
    // Carregar configurações salvas (aqui seriam buscadas de um backend)
    const currentSettings = {
        sheetUrl: 'https://docs.google.com/spreadsheets/d/abc123',
        syncFrequency: 'daily',
        exportFormat: 'csv',
        exportPeriod: 'all',
        emailNotifications: true,
        browserNotifications: false,
        notificationFrequency: 'hourly',
        monthlyGoal: 50,
        conversionGoal: 25,
        ticketGoal: 1000,
        backupFrequency: 'weekly',
        companyName: 'LeadFlow Corp',
        companyEmail: 'contato@leadflow.com',
        companyPhone: '(32) 3859-3686'
    };

    // Preencher formulários com configurações atuais
    document.getElementById('sheet-url').value = currentSettings.sheetUrl;
    document.getElementById('sync-frequency').value = currentSettings.syncFrequency;
    document.getElementById('export-format').value = currentSettings.exportFormat;
    document.getElementById('export-period').value = currentSettings.exportPeriod;
    document.getElementById('email-notifications').checked = currentSettings.emailNotifications;
    document.getElementById('browser-notifications').checked = currentSettings.browserNotifications;
    document.getElementById('notification-frequency').value = currentSettings.notificationFrequency;
    document.getElementById('monthly-goal').value = currentSettings.monthlyGoal;
    document.getElementById('conversion-goal').value = currentSettings.conversionGoal;
    document.getElementById('ticket-goal').value = currentSettings.ticketGoal;
    document.getElementById('backup-frequency').value = currentSettings.backupFrequency;
    document.getElementById('company-name').value = currentSettings.companyName;
    document.getElementById('company-email').value = currentSettings.companyEmail;
    document.getElementById('company-phone').value = currentSettings.companyPhone;
}

function setupEventListeners() {
    // Google Sheets
    document.getElementById('connect-sheets').addEventListener('click', connectGoogleSheets);
    
    // Exportação
    document.getElementById('export-data').addEventListener('click', exportData);
    
    // Notificações
    document.getElementById('save-notifications').addEventListener('click', saveNotificationSettings);
    
    // Metas
    document.getElementById('save-goals').addEventListener('click', saveGoals);
    
    // Backup
    document.getElementById('create-backup').addEventListener('click', createBackup);
    document.getElementById('restore-backup').addEventListener('click', restoreBackup);
    
    // Empresa
    document.getElementById('save-company').addEventListener('click', saveCompanyInfo);
}

function connectGoogleSheets() {
    const sheetUrl = document.getElementById('sheet-url').value;
    const syncFrequency = document.getElementById('sync-frequency').value;
    
    if (!sheetUrl) {
        showNotification('Por favor, informe a URL da planilha', 'error');
        return;
    }
    
    // Simular conexão com Google Sheets
    showNotification('Conectando com Google Sheets...', 'success');
    
    setTimeout(() => {
        showNotification('Conexão com Google Sheets estabelecida com sucesso!', 'success');
    }, 2000);
}

function exportData() {
    const format = document.getElementById('export-format').value;
    const period = document.getElementById('export-period').value;
    
    showNotification(`Exportando dados no formato ${format.toUpperCase()}...`, 'success');
    
    // Simular exportação
    setTimeout(() => {
        const filename = `leads_export_${new Date().toISOString().split('T')[0]}.${format}`;
        
        // Em uma implementação real, aqui seria feito o download do arquivo
        const link = document.createElement('a');
        link.href = '#'; // URL do arquivo gerado
        link.download = filename;
        link.click();
        
        showNotification(`Dados exportados com sucesso: ${filename}`, 'success');
    }, 1500);
}

function saveNotificationSettings() {
    const emailNotifications = document.getElementById('email-notifications').checked;
    const browserNotifications = document.getElementById('browser-notifications').checked;
    const notificationFrequency = document.getElementById('notification-frequency').value;
    
    // Salvar configurações (aqui seria enviado para um backend)
    showNotification('Configurações de notificação salvas com sucesso!', 'success');
}

function saveGoals() {
    const monthlyGoal = document.getElementById('monthly-goal').value;
    const conversionGoal = document.getElementById('conversion-goal').value;
    const ticketGoal = document.getElementById('ticket-goal').value;
    
    if (!monthlyGoal || !conversionGoal || !ticketGoal) {
        showNotification('Por favor, preencha todas as metas', 'error');
        return;
    }
    
    // Salvar metas (aqui seria enviado para um backend)
    showNotification('Metas atualizadas com sucesso!', 'success');
}

function createBackup() {
    showNotification('Criando backup dos dados...', 'success');
    
    setTimeout(() => {
        showNotification('Backup criado com sucesso!', 'success');
        
        // Em uma implementação real, aqui seria feito o download do backup
        const link = document.createElement('a');
        link.href = '#'; // URL do backup
        link.download = `backup_leads_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }, 2000);
}

function restoreBackup() {
    // Simular upload de arquivo de backup
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            showNotification(`Restaurando backup: ${file.name}...`, 'success');
            
            setTimeout(() => {
                showNotification('Backup restaurado com sucesso!', 'success');
            }, 2000);
        }
    };
    
    input.click();
}

function saveCompanyInfo() {
    const companyName = document.getElementById('company-name').value;
    const companyEmail = document.getElementById('company-email').value;
    const companyPhone = document.getElementById('company-phone').value;
    
    if (!companyName || !companyEmail || !companyPhone) {
        showNotification('Por favor, preencha todas as informações da empresa', 'error');
        return;
    }
    
    // Salvar informações (aqui seria enviado para um backend)
    showNotification('Informações da empresa salvas com sucesso!', 'success');
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