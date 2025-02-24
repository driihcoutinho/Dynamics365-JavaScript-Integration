// Script principal do formulário
import { createRecord, getRecord } from '../scripts/mockAPI.js';

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('customerForm');
    const cepInput = document.getElementById('cep');
    const searchCepButton = document.getElementById('searchCep');

    // Evento de busca de CEP
    searchCepButton.addEventListener('click', async () => {
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            alert('Por favor, insira um CEP válido');
            return;
        }

        try {
            const address = await getAddressByCep(cep);
            fillAddressFields(address);
        } catch (error) {
            alert(error.message);
        }
    });

    // Evento de envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validações
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        
        const errors = [
            validateRequiredField(name, 'Nome'),
            validateEmail(email),
            validatePhone(phone)
        ].filter(error => error !== null);

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        // Criar registro no CRM
        const customerData = {
            name: name,
            email: email,
            phone: phone,
            address: form.address.value,
            city: form.city.value,
            state: form.state.value
        };

        try {
            const result = await createRecord('accounts', customerData);
            console.log('Registro mockado criado:', result);

            alert('Cliente cadastrado com sucesso!');
            form.reset();
        } catch (error) {
            alert('Erro ao cadastrar cliente: ' + error.message);
        }
    });

// Função para preencher campos de endereço
function fillAddressFields(address) {
    console.log('Endereço preenchido:', address);

        document.getElementById('address').value = address.logradouro;
        document.getElementById('city').value = address.localidade;
        document.getElementById('state').value = address.uf;
    }
});
