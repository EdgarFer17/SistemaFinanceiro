import BaseComponent from "./baseComponent.js";

export default class ComponentDonut extends BaseComponent {
    constructor(config = {}, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.chart = document.createElement('canvas');
        this.donut = null;
    }

    setup(config) {
        const LABELS = config.labels || ['Arrecadação', 'Gastos'];
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

    style(style_config = { main: [], chart: [] }) {
        this.main.classList.add(...[
            "d-flex", "w-75", "align-self-center", "justify-content-center"
        ], ...style_config.main);
        this.chart.classList.add(...[
        ], ...style_config.chart);
    }

    build() {
        this.main.replaceChildren(this.chart);
    }

    updateData(data = {labels: this.donut.data.labels, datasets: this.donut.data.datasets}) {
        this.donut.data = data;
        this.donut.update();
    }
}