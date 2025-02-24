// Validações básicas para formulários do Dynamics 365

// Validação de campo obrigatório
function validateRequiredField(fieldValue, fieldName) {
    if (!fieldValue || fieldValue.trim() === '') {
        return `O campo ${fieldName} é obrigatório`;
    }
    return null;
}

// Validação de e-mail
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Por favor, insira um e-mail válido';
    }
    return null;
}

// Validação de telefone
function validatePhone(phone) {
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!phoneRegex.test(phone)) {
        return 'Por favor, insira um telefone válido';
    }
    return null;
}

// Validação de CNPJ
function validateCNPJ(cnpj) {
    // Implementação da validação de CNPJ
    // ...
    return null;
}

export { validateRequiredField, validateEmail, validatePhone, validateCNPJ };
