import BaseComponent from './components/baseComponent';

export default class Dashboard extends BaseComponent {
  constructor(style_config) {

    const STYLE_CONFIG_FINAL = {
      "title_wrapper": style_config.title_wrapper || [],
      "title": style_config.ope_title || [],
      "ope_wrapper": style_config.ope_wrapper || [],
      "ope_report": style_config.ope_report || [],
      "ope_show": style_config.ope_show || [],

      "status_wrapper": style_config.status_wrapper || [],
      "status_balance_wrapper": style_config.status_balance_wrapper || [],
      "status_balance_title": style_config.status_balance_title || [],
      "status_balance_currency": style_config.status_balance_currency || [],

      "status_health_wrapper": style_config.status_health_wrapper || [],
      "status_health_title": style_config.status_health_title || [],
      "status_health_type": style_config.status_health_type || [],

      "donut_wrapper": style_config.donut_wrapper || [],
      "donut_first_component": style_config.donut_first_component || [],
      "donut_second_wrapper": style_config.donut_second_wrapper || [],
      "donut_second_component": style_config.donut_second_component || [],
      "donut_filter": style_config.donut_filter || [],

      "bar_wrapper": style_config.bar_wrapper || [],
      "bar_title": style_config.bar_title || [],
      "bar_component": style_config.bar_component || [],

      "transaction_wrapper": style_config.transaction_wrapper || [],
      "transaction_title": style_config.transaction_title || [],
      "transaction_component": style_config.transaction_component || [],

      "report_component": style_config.report_component || [],
    }

    super(STYLE_CONFIG_FINAL)
  }

  spawn() {
    this.main = document.createElement('main');
    this.elements = {
      "title_wrapper": document.createElement("div"),
      "title": document.createElement("h2"),
      "ope_wrapper": document.createElement("div"),
      "ope_report": document.createElement("img"),
      "ope_show": document.createElement("img"),

      "status_wrapper": document.createElement("section"),
      "status_balance_wrapper": document.createElement("div"),
      "status_balance_title": document.createElement("h3"),
      "status_balance_currency": document.createElement("p"), 

      "status_health_wrapper": document.createElement("div"),
      "status_health_title": document.createElement("h3"),
      "status_health_type": document.createElement("p"),

      "donut_wrapper": document.createElement("section"),
      "donut_first_component": "new donutChart()",
      "donut_second_wrapper": document.createElement("div"),
      "donut_second_component": "new donutChart()",
      "donut_filter": "new Filter()",

      "bar_wrapper": document.createElement("section"),
      "bar_title": document.createElement("h3"),
      "bar_component": "new BarChart()",

      "transaction_wrapper": document.createElement("section"),
      "transaction_title": document.createElement("h3"),
      "transaction_component": "new TransactionTable() limitar a 5",

      "report_component": "new Report()",
    }
  }

  build() {
    this.elements.ope_wrapper.replaceChildren(
      this.elements.ope_report, this.elements.ope_show
    )
    this.elements.title_wrapper.replaceChildren(
      this.elements.title, this.elements.ope_wrapper
    )
    this.elements.status_balance_wrapper.replaceChildren(
      this.elements.status_balance_title, this.elements.status_balance_currency
    )
    this.elements.status_health_wrapper.replaceChildren(
      this.elements.status_health_title, this.elements.status_health_type
    )
    this.elements.status_wrapper.replaceChildren(
      this.elements.status_balance_wrapper, this.elements.status_health_wrapper
    )
    this.elements.donut_second_wrapper.replaceChildren(
      this.elements.donut_filter, this.elements.donut_second_component
    )
    this.elements.donut_wrapper.replaceChildren(
      this.elements.donut_first_component.main,
      this.elements.donut_second_component.main
    )
    this.elements.bar_wrapper.replaceChildren(
      this.elements.bar_title, this.elements.bar_component.main
    )
    this.elements.transaction_wrapper.replaceChildren(
      this.elements.transaction_title,
      this.elements.transaction_component.main
    )

    this.main.replaceChildren(
      this.elements.title_wrapper,
      this.elements.status_wrapper,
      this.elements.donut_wrapper,
      this.elements.bar_wrapper,
      this.elements.transaction_wrapper,
      this.elements.report_component.main
    )
  }

  style(style_config) {
    // bootstrap
    
    this.main.classList.add(...style_config["main"]);

    this.elements.title_wrapper.classList.add(...[], ...style_config["title_wrapper"]);
    this.elements.title.classList.add(...[], ...style_config["title"]);
    this.elements.ope_wraoper.classList.add(...[], ...style_config["ope_wrapper"]);
    this.elements.ope_report.classList.add(...[], ...style_config["ope_report"]);
    this.elements.ope_show.classList.add(...[], ...style_config["ope_show"]);
  
    this.elements.status_wrapper.classList.add(...[], ...style_config["status_wrapper"]),
    this.elements.status_balance_wrapper.classList.add(...[], ...style_config["status_balance_wrapper"]),
    this.elements.status_balance_title.classList.add(...[], ...style_config["status_balance_title"]),
    this.elements.status_balance_currency.classList.add(...[], ...style_config["status_balance_currency"]),

    this.elements.status_health_wrapper.classList.add(...[], ...style_config["status_health_wrapper"]),
    this.elements.status_health_title.classList.add(...[], ...style_config["status_health_title"]),
    this.elements.status_health_type.classList.add(...[], ...style_config["status_health_type"]),

    this.elements.donut_wrapper.classList.add(...[], ...style_config["donut_wrapper"]);
    this.elements.donut_first_title.classList.add(...[], ...style_config["donut_first_title"]);
    this.elements.donut_first_component.classList.add(...[], ...style_config["donut_first_component"]);
    this.elements.donut_wrapper.classList.add(...[], ...style_config["donut_first_component"]);
    this.elements.donut_second_title.classList.add(...[], ...style_config["donut_first_second"]);
    this.elements.donut_second_component.classList.add(...[], ...style_config["donut_second_component"]);
    this.elements.donut_filter.classList.add(...[], ...style_config["donut_filter"])

    this.elements.bar_wrapper.classList.add(...[], ...style_config["bar_wrapper"]);
    this.elements.bar_title.classList.add(...[], ...style_config["bar_title"]);
    this.elements.bar_component.classList.add(...[], ...style_config["bar_component"]);

    this.elements.transaction_wrapper.classList.add(...[], ...style_config["transaction_wrapper"]);
    this.elements.transaction_title.classList.add(...[], ...style_config["transaction_title"]);
    this.elements.transaction_component.classList.add(...[], ...style_config["transaction_component"]);

    this.elements.report_modal.classList.add(...[], ...style_config["report_modal"]);
    this.elements.report_component.classList.add(...[], ...style_config["report_component"]);
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
