import BaseComponent from "./baseComponent.js";

export default class ComponentBar extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.chart = document.createElement('canvas');
        this.bar = null;
    }

    setup(config) {

        const MOCK_DATA = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho'],
            datasets: [
                {
                    label: 'Lucro',
                    data: [1300, 500, -1000, 300, -100, 100],
                    borderColor: '#FCD34D',
                    borderWidth: 2,
                    type: 'line',
                    tension: 0.2
                },
                {
                    label: 'Receitas',
                    data: [2800, 2100, 2200, 2290, 2000, 2181],
                    backgroundColor: '#3B82F6',
                },
                {
                    label: 'Despesas',
                    data: [1500, 1600, 3200, 1990, 2100, 2081],
                    backgroundColor: '#f63b3b',
                },
            ]
        };

        const LABELS = config.labels || MOCK_DATA.labels || [];
        const DATASETS = config.datasets || MOCK_DATA.datasets || [{}];

        this.bar = new Chart(this.chart, {
            type: "bar",
            data: {
                labels: LABELS,
                datasets: DATASETS
            }
        });
    }

    style(style_config = { main: [], title: [], chart: [] }) {
        this.main.classList.add(...[
            "w-75"
        ], ...style_config.main);
        this.chart.classList.add(...[], ...style_config.chart);
    }

    build() {
        this.main.replaceChildren(this.chart);
    }

    updateData(data = {labels: this.bar.data.labels, datasets: this.bar.data.datasets}) {
        this.bar.data = data;
        this.bar.update();
    }
}