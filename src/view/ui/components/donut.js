import BaseComponent from "./baseComponent.js";

// Gráfico pizza/donut usando Chart.js
export default class ComponentDonut extends BaseComponent {
    constructor(config = {}, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.chart = document.createElement('canvas');
        this.donut = null;
    }

    // Inicializa Chart.js com dados padrão ou configurado
    setup(config) {
        const LABELS = config.labels || ['Receita', 'Despesa'];
        const DATASETS = config.datasets || [{
            label: 'R$',
            data: [300, 50],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
        }];

        this.donut = new Chart(this.chart, {
            type: "doughnut",
            data: {
                labels: LABELS,
                datasets: DATASETS
            }
        });
    }

    // Aplica estilos Bootstrap ao container
    style(style_config = { main: [], chart: [] }) {
        this.main.classList.add(...[
            "d-flex", "w-75", "align-self-center", "justify-content-center"
        ], ...style_config.main);
        this.chart.classList.add(...[
        ], ...style_config.chart);
    }

    // Monta canvas dentro do container
    build() {
        this.main.replaceChildren(this.chart);
    }

    // Atualiza dados do gráfico e renderiza
    updateData(data = {labels: this.donut.data.labels, datasets: this.donut.data.datasets}) {
        this.donut.data = data;
        this.donut.update();
    }
}