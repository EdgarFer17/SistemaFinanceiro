import BaseComponent from "./baseComponent.js";

export default class ComponentBar extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.title = document.createElement('h3');
        this.chart = document.createElement('canvas');
        this.bar = null;
    }

    setup(config) {
        this.title.textContent = config.title || "Evolução Mensal";

        const MOCK_DATA = {
            labels: ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
            datasets: [
                {
                    label: 'Valores',
                    data: [2800, 2100, 2200, 2290, 2000, 2181, 2500, 2100, 2100, 3000],
                    backgroundColor: '#3B82F6',
                },
                {
                    label: 'Tendência',
                    data: [5600, 5900, 5800, 6081, 5200, 5500, 5800, 6300, 7200, 8100],
                    borderColor: '#FCD34D',
                    borderWidth: 2,
                    type: 'line',
                    tension: 0.2
                }
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
        this.main.classList.add(...[], ...style_config.main);
        this.title.classList.add(...[], ...style_config.title);
        this.chart.classList.add(...[], ...style_config.chart);
    }

    build() {
        this.main.replaceChildren(this.title, this.chart);
    }

    updateData(data = {labels: this.bar.data.labels, datasets: this.bar.data.datasets}) {
        this.bar.data = data;
        this.bar.update();
    }
}