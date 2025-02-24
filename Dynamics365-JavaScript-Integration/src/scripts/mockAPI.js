// Mock da API do Dynamics 365

const mockData = {
    accounts: []
};

// Simulação de criação de registro
async function createRecord(entityName, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newRecord = {
                id: mockData[entityName].length + 1,
                ...data
            };
            mockData[entityName].push(newRecord);
            resolve(newRecord);
        }, 500);
    });
}

// Simulação de leitura de registro
async function getRecord(entityName, id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const record = mockData[entityName].find(r => r.id === id);
            if (record) {
                resolve(record);
            } else {
                reject(new Error('Registro não encontrado'));
            }
        }, 500);
    });
}

export { createRecord, getRecord };
