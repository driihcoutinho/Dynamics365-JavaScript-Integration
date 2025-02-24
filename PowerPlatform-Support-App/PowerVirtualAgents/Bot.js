// Power Virtual Agents - Chatbot de Suporte
function handleUserQuery(query) {
    const responses = {
        "status": "Você pode verificar o status do seu chamado na página de acompanhamento.",
        "create": "Para criar um novo chamado, acesse a opção 'Novo Chamado' no menu principal.",
        "help": "Estou aqui para ajudar! Como posso auxiliar você hoje?"
    };

    return responses[query.toLowerCase()] || "Desculpe, não entendi sua pergunta. Por favor, tente novamente.";
}
