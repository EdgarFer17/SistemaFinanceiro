import BaseComponent from "./baseComponent.js";

export default class ComponentDonut extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.title = document.createElement('h3');
        this.subtitle = document.createElement('h4');
        this.chart = document.createElement('canvas');
        this.donut = null;
    }

    setup(config) {
        this.title.textContent = config.title || "Título";
        this.subtitle.textContent = config.subtitle || "Subtítulo";

        const LABELS = config.labels || ['Red', 'Blue', 'Yellow'];
        const DATASETS = config.datasets || [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
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

    style(style_config = { main: [], title: [], subtitle: [], chart: [] }) {
        this.main.classList.add(...[], ...style_config.main);
        this.title.classList.add(...[], ...style_config.title);
        this.subtitle.classList.add(...[], ...style_config.subtitle);
        this.chart.classList.add(...[], ...style_config.chart);
    }

    build() {
        this.main.replaceChildren(this.title, this.subtitle, this.chart);
    }

    updateData(data = {labels: this.donut.data.labels, datasets: this.donut.data.datasets}) {
        this.donut.data = data;
        this.donut.update();
    }
}