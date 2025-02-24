// Configurações básicas do Dynamics 365
const config = {
    organizationUrl: "https://your-organization.api.crm.dynamics.com",
    apiVersion: "9.1"
};

// Função para criar um registro
async function createRecord(entityName, data) {
    try {
        const response = await fetch(`${config.organizationUrl}/api/data/v${config.apiVersion}/${entityName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Erro ao criar registro');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Função para ler um registro
async function getRecord(entityName, id) {
    try {
        const response = await fetch(`${config.organizationUrl}/api/data/v${config.apiVersion}/${entityName}(${id})`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });
        
        if (!response.ok) throw new Error('Erro ao buscar registro');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Função para obter token de acesso (implementação básica)
function getAccessToken() {
    // Implementar lógica de autenticação
    return "your-access-token";
}

export { createRecord, getRecord };
