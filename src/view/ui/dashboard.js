import BaseComponent from './components/baseComponent.js';
import DonutChart from './components/donutChart.js';
import Report from './modal/report.js'

export default class Dashboard extends BaseComponent {
  constructor(style_config = {}) {
    super(style_config)
  }

  spawn() {
    this.main = document.createElement('main');
    const SCHEMA = {
      "title_wrapper": "div",
      "title": "h2",
      "ope_wrapper": "div",
      "ope_report": "img",
      "ope_show": "img",

      "status_wrapper": "section",
      "status_balance_wrapper": "div",
      "status_balance_title": "h3",
      "status_balance_currency": "p", 

      "status_health_wrapper": "div",
      "status_health_title": "h3",
      "status_health_type": "p",

      "donut_wrapper": "section",
      "donut_first_wrapper": "div",
      "donut_first_title": "h3",
      "donut_first_component": new DonutChart(),
      "donut_second_wrapper1": "div",
      "donut_second_title": "h3",
      "donut_second_wrapper2": "div",
      "donut_second_component": new DonutChart(),
      "donut_filter": "div" || new Filter(),

      // "bar_wrapper": "section",
      // "bar_title": "h3",
      // "bar_component": new BarChart(),

      // "transaction_wrapper": "section",
      // "transaction_title": "h3",
      // "transaction_component": new TransactionTable(limit=5),

      // "report_component": new Report(),
    }

    for (const [key, value] of Object.entries(SCHEMA)) {
      if (typeof value === "string") {
        this.elements[key] = document.createElement(value);
      } else {
        this.elements[key] = value;
      }
    }
  }

  build() {
    const el = this.elements;
    el.ope_wrapper.replaceChildren(el.ope_report, el.ope_show)
    el.title_wrapper.replaceChildren(el.title, el.ope_wrapper)

    el.status_balance_wrapper.replaceChildren(el.status_balance_title, el.status_balance_currency)
    el.status_health_wrapper.replaceChildren(el.status_health_title, el.status_health_type)
    el.status_wrapper.replaceChildren(el.status_balance_wrapper, el.status_health_wrapper)

    el.donut_first_wrapper.replaceChildren(el.donut_first_title, el.donut_first_component.main)
    el.donut_second_wrapper2.replaceChildren(el.donut_filter, el.donut_second_component.main)
    el.donut_second_wrapper1.replaceChildren(el.donut_second_title, el.donut_second_wrapper2)
    el.donut_wrapper.replaceChildren(el.donut_first_wrapper, el.donut_second_wrapper1)

    // el.bar_wrapper.replaceChildren(el.bar_title, el.bar_component.main)

    // el.transaction_wrapper.replaceChildren(el.transaction_title, el.transaction_component.main)

    this.main.replaceChildren(
      el.title_wrapper,
      el.status_wrapper,
      el.donut_wrapper,
      // el.bar_wrapper,
      // el.transaction_wrapper,
      // el.report_component.main
    )
  }

  style() {
    if (this.style_config["main"] && this.style_config["main"].length > 0) {
      this.main.classList.add(...this.style_config["main"]);
    }

    for (const [key, value] of Object.entries(this.elements)) {
      const CLASSES = this.style_config[key];
      if (value instanceof HTMLElement && CLASSES && CLASSES.length > 0) {
        value.classList.add(...CLASSES);
      }
    }
  }

  updateReportIcon(_path, _alt) {
    BaseComponent.updateImg(_path, _alt, this.elements.ope_report);
  }
  
  updateShowIcon(_path, _alt) {
    BaseComponent.updateImg(_path, _alt, this.elements.ope_show);
  }
  
  updateTitle(_text) {
    BaseComponent.updateText(_text, this.elements.title);
  }

  updateBarTitle(_text){
    BaseComponent.updateText(_text, this.elements.bar_title);
  }

  updateTransactionTitle(_text){
    BaseComponent.updateText(_text, this.elements.transaction_title);
  }
}
const DASHBOARD = new Dashboard()
document.body.replaceChildren(DASHBOARD.main)