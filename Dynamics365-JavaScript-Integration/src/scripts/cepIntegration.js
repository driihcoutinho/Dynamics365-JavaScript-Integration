// Integração com API de CEP

const cepApiUrl = "https://viacep.com.br/ws";

// Função para buscar endereço por CEP
async function getAddressByCep(cep) {
    try {
        const response = await fetch(`${cepApiUrl}/${cep}/json/`);
        
        if (!response.ok) throw new Error('Erro ao buscar CEP');
        
        const data = await response.json();
        
        if (data.erro) {
            throw new Error('CEP não encontrado');
        }
        
        return {
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
        };
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Função para preencher campos de endereço
function fillAddressFields(address) {
    const fields = {
        'address_line1': address.logradouro,
        'address_city': address.localidade,
        'address_state': address.uf,
        'address_postalcode': address.cep
    };
    
    Object.entries(fields).forEach(([fieldName, value]) => {
        const field = Xrm.Page.getAttribute(fieldName);
        if (field) {
            field.setValue(value);
        }
    });
}

export { getAddressByCep, fillAddressFields };
