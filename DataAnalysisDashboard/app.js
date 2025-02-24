// Dados fictícios para o dashboard
const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
        label: 'Vendas',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(98, 0, 234, 0.2)',
        borderColor: 'rgba(98, 0, 234, 1)',
        borderWidth: 1
    }]
};

// Configuração do gráfico
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Vendas Mensais'
            }
        }
    },
};

// Inicialização do gráfico
const ctx = document.createElement('canvas');
document.getElementById('charts').appendChild(ctx);
const myChart = new Chart(ctx, config);

// Função para adicionar filtros dinâmicos
function addFilters() {
    const filtersDiv = document.getElementById('filters');
    
    const filterLabel = document.createElement('label');
    filterLabel.textContent = 'Filtrar por: ';
    filtersDiv.appendChild(filterLabel);

    const filterSelect = document.createElement('select');
    filterSelect.innerHTML = `
        <option value="all">Todos</option>
        <option value="q1">Primeiro Trimestre</option>
        <option value="q2">Segundo Trimestre</option>
    `;
    filtersDiv.appendChild(filterSelect);

    filterSelect.addEventListener('change', (e) => {
        updateChart(e.target.value);
    });
}

// Função para atualizar o gráfico com base no filtro
function updateChart(filter) {
    let filteredData = [...data.datasets[0].data];
    
    if (filter === 'q1') {
        filteredData = filteredData.slice(0, 3);
    } else if (filter === 'q2') {
        filteredData = filteredData.slice(3);
    }

    myChart.data.datasets[0].data = filteredData;
    myChart.update();
}

// Função para exportar para PDF
document.getElementById('export-pdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Adicionar título
    doc.setFontSize(18);
    doc.text('Relatório de Vendas', 10, 10);
    
    // Adicionar dados
    doc.setFontSize(12);
    data.labels.forEach((label, index) => {
        const y = 20 + (index * 10);
        doc.text(`${label}: ${data.datasets[0].data[index]}`, 10, y);
    });
    
    // Salvar PDF
    doc.save('relatorio_vendas.pdf');
});

// Função para exportar para Excel
document.getElementById('export-excel').addEventListener('click', () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
        ['Mês', 'Vendas'],
        ...data.labels.map((label, index) => [label, data.datasets[0].data[index]])
    ]);
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas');
    
    XLSX.writeFile(workbook, 'relatorio_vendas.xlsx');
});

// Inicialização
addFilters();
