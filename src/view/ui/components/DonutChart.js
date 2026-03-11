import BaseComponent from "./BaseComponent.js";
import { DONUT } from '../../style_config.js';
// import Chart from "chart.js";

export default class DonutChart extends BaseComponent {
    constructor() {
        const SCHEMA = {
            _tag: "div",
            title: "h3",
            subtitle: "h4",
            canvas: "canvas"
        }
        super(SCHEMA, DONUT);

        // this.chart = new Chart(this.elements.canvas, {
        //     'type': 'doughnut',
        //     'data': {
        //         'labels': [],
        //         'datasets': [{
        //             'data': [],
        //             'label': 'Meu Primeiro Dataset'
        //         }]
        //     }
        // });
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