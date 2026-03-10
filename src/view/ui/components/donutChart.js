import BaseComponent from "./baseComponent";
const { Chart } = await import("chart.js");

export default class DonutChart extends BaseComponent {
    constructor(style_config) {
        const STYLE_CONFIG_FINAL = {
            "main": style_config.main || [],
            "title": style_config.title || [],
            "subtitle": style_config.subtitle || [],
            "canvas": style_config.canvas || [],
        }

        super(STYLE_CONFIG_FINAL);
    }

    spawn() {
        this.main = document.createElement('div');
        this.elements = {
            "title": document.createElement("h3"),
            "subtitle": document.createElement("h4"),
            "canvas": document.createElement("canvas"),
        }
        this.chart = new Chart(this.elements.canvas, {
            'type': 'doughnut',
            'data': {
                'labels': [],
                'datasets': [{
                    'data': [],
                    'label': 'Meu Primeiro Dataset'
                }]
            }
        });
    }


    style(style_config) {
        this.main.classList.add(...[], ...style_config.main);
        this.title.classList.add(...[], ...style_config.title);
        this.subtitle.classList.add(...[], ...style_config.subtitle);
        this.canvas.classList.add(...[], ...style_config.canvas);
    }

    build() {
        this.main.replaceChildren(
            this.elements.title,
            this.elements.subtitle,
            this.elements.canvas
        )
    }

    updateChartData(labels = this.chart.data.labels , dataset_data = this.chart.data.datasets[0].data, dataset_label = this.chart.data.datasets[0].label) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = dataset_data;
        this.chart.data.datasets[0].label = dataset_label;
        this.chart.update();
    }

    updateChartDatasetConfig(config = {
        label: "Primeiro Dataset", 
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
        }
    ) 
    {
        config.data = this.chart.data.datasets[0].data;
        this.chart.data.datasets[0] = config;
        this.chart.update();
    }

    updateTitle(_text) {
        return BaseComponent.updateText(_text, this.elements.title);
    }

    updateSubtitle(_text) {
        return BaseComponent.updateText(_text, this.elements.subtitle);
    }
}