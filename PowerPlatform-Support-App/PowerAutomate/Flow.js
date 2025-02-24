// Power Automate - Notificação de Chamado
function sendTicketNotification(ticket, recipientEmail) {
    const notification = {
        subject: `Novo Chamado Criado: ${ticket.title}`,
        body: `Detalhes do Chamado:\n\nID: ${ticket.id}\nDescrição: ${ticket.description}\nStatus: ${ticket.status}`,
        to: recipientEmail
    };
    return notification;
}
