// Power Apps - Criação de Chamados
function createTicket(ticketDetails) {
    const newTicket = {
        id: generateUniqueId(),
        title: ticketDetails.title,
        description: ticketDetails.description,
        status: "Open",
        createdAt: new Date()
    };
    return newTicket;
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}
