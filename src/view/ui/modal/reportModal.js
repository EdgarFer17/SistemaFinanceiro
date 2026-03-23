import ComponentDonut from "../components/donut.js";
import ReportController from "../../../controller/reportController.js";
import BaseComponent from "../components/baseComponent.js";

export default class ReportModal extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn(){
        this.main = document.createElement('div');
        this.title = document.createElement('h2');

        this.report_wraper = document.createElement('div');

        this.total_expense_wrapper = document.createElement('div');
        this.total_expense_title = document.createElement('h3');
        this.total_expense_currency = document.createElement('p');
        this.total_expense_value = document.createElement('span');

        this.higher_expense_wrapper = document.createElement('div');
        this.higher_expense_title = document.createElement('h3');
        this.higher_expense_currency = document.createElement('p');
        this.higher_expense_value = document.createElement('span');

        this.expensive_category_wrapper = document.createElement('div');
        this.expensive_category_title = document.createElement('h3');
        this.expensive_category_value = document.createElement('span');

        this.annual_comparison_wrapper = document.createElement('div');
        this.annual_comparison_title = document.createElement('h3');
        this.annual_comparison_chart_wrapper = document.createElement('div');
        this.annual_comparison_donut1 = new ComponentDonut({}, {
            main: ["w-50", "align-self-center", "position-relative"],
            chart: [],
        });
        this.annual_comparison_donut2 = new ComponentDonut({}, {
            main: ["w-50", "align-self-center", "position-relative"],
            chart: [],
        });
        this.annual_comparison_donut3 = new ComponentDonut({}, {
            main: ["w-50", "align-self-center", "position-relative"],
            chart: [],
        });
    }

    setup() {
        this.title.textContent = "Relatório Mensal";
        this.total_expense_title.textContent = "Gasto total do mês";
        this.higher_expense_title.textContent = "Maior gasto efetuado";
        this.expensive_category_title.textContent = "Categoria com maior despesa";
        this.annual_comparison_title.textContent = "Comparação anual";

        this.annual_comparison_donut1.donut.options = {
            responsive: true,
            layout: {
                padding: {
                    bottom: 10 
                }
            },
            plugins: {
                legend: {
                    position: 'right', 
                    align: 'center',
                    labels: {
                        boxWidth: 10,
                        padding: 5, 
                        font: {size: 11}
                    }
                },
                title: { 
                    display: true, 
                    text: 'Gasto Totais', 
                    color: "#fff", 
                    padding: { top: 0, bottom: 10 },
                    font: { size: 16 }
                }
            }
        }
        this.annual_comparison_donut2.donut.options = {
            responsive: true,
            layout: {
                padding: {
                    bottom: 10 
                }
            },
            plugins: {
                legend: { 
                    position: 'right', 
                    align: 'center',
                    labels: {
                        boxWidth: 10,
                        padding: 5, 
                        font: {size: 11}
                    }
                },
                title: { 
                    display: true, 
                    text: 'Maiores Gastos Efetuados', 
                    color: "#fff", 
                    padding: { top: 0, bottom: 10 },
                    font: { size: 16 }
                }
            }
        }
        this.annual_comparison_donut3.donut.options = {
            responsive: true,
            layout: {
                padding: {
                    right: 0,
                    bottom: 10 
                }
            },
            plugins: {
                legend: { 
                    position: 'right', 
                    align: 'center',
                    labels: {
                        boxWidth: 10,
                        padding: 5, 
                        font: {size: 11}
                    }
                },
                title: { 
                    display: true, 
                    text: 'Categorias com maiores despesas', 
                    color: "#fff", 
                    padding: { top: 0, bottom: 10 },
                    font: { size: 16 }
                }
            }
        }

        this.renderStatus();
        this.renderCharts();
    }

    style(style_config = {
        main: ["bg-white", "rounded-4", "w-100", "w-lg-75", "m-2", "m-md-5", "p-3", "my-md-5", "d-flex", "flex-column", "align-items-center", "gap-3", "gap-md-3", "text-white"],
        title: ["text-primary", "h1"],
        report_wraper: ["w-100", "d-flex", "gap-2", "gap-md-5", "justify-content-center", "text-center", "px-1"],
        total_expense_wrapper: ["d-flex", "flex-column","align-items-center", "bg-primary", "rounded-4", "w-100", "justify-content-around", "py-2"],
        total_expense_title: ["fw-bold", "w-75"],
        total_expense_currency: ["fs-4"],
        total_expense_value: ["fs-4", "fw-medium"],
        higher_expense_wrapper: ["d-flex", "flex-column","align-items-center", "bg-primary", "rounded-4", "w-100", "justify-content-around", "py-2"],
        higher_expense_title: ["fw-bold", "w-75"],
        higher_expense_currency: ["fs-4"],
        higher_expense_value: ["fs-4", "fw-medium"],
        expensive_category_wrapper: ["d-flex", "flex-column","align-items-center", "bg-primary", "rounded-4", "w-100", "justify-content-center", "py-2"],
        expensive_category_title: ["fw-bold", "w-75"],
        expensive_category_value: ["fs-4", "fw-medium"],
        annual_comparison_wrapper: ["d-flex", "flex-column","w-100", "align-items-center", "bg-primary", "rounded-4", "text-white", "py-2"],
        annual_comparison_title: ["py-3"],
        annual_comparison_chart_wrapper: ["w-50", "w-md-100", "w-lg-75", "px-md-3" ,"px-lg-0", "d-flex", "flex-column", "flex-md-row", "justify-content-around", "gap-md-5"],
    }) {

        this.main.classList.add(...style_config.main);
        this.title.classList.add(...style_config.title);
        this.report_wraper.classList.add(...style_config.report_wraper);
        this.total_expense_wrapper.classList.add(...style_config.total_expense_wrapper);
        this.total_expense_title.classList.add(...style_config.total_expense_title);
        this.total_expense_currency.classList.add(...style_config.total_expense_currency);
        this.total_expense_value.classList.add(...style_config.total_expense_value);
        this.higher_expense_wrapper.classList.add(...style_config.higher_expense_wrapper);
        this.higher_expense_title.classList.add(...style_config.higher_expense_title);
        this.higher_expense_currency.classList.add(...style_config.higher_expense_currency);
        this.higher_expense_value.classList.add(...style_config.higher_expense_value);
        this.expensive_category_wrapper.classList.add(...style_config.expensive_category_wrapper);
        this.expensive_category_title.classList.add(...style_config.expensive_category_title);
        this.expensive_category_value.classList.add(...style_config.expensive_category_value);
        this.annual_comparison_wrapper.classList.add(...style_config.annual_comparison_wrapper);
        this.annual_comparison_title.classList.add(...style_config.annual_comparison_title);
        this.annual_comparison_chart_wrapper.classList.add(...style_config.annual_comparison_chart_wrapper);
    }

    build() {
        this.total_expense_currency.replaceChildren(this.total_expense_value);
        this.total_expense_wrapper.replaceChildren(this.total_expense_title, this.total_expense_currency);
        this.higher_expense_currency.replaceChildren(this.higher_expense_value);
        this.higher_expense_wrapper.replaceChildren(this.higher_expense_title, this.higher_expense_currency);
        this.expensive_category_wrapper.replaceChildren(this.expensive_category_title, this.expensive_category_value);
        this.report_wraper.replaceChildren(this.total_expense_wrapper, this.higher_expense_wrapper, this.expensive_category_wrapper);
        this.annual_comparison_chart_wrapper.replaceChildren(this.annual_comparison_donut1.main, this.annual_comparison_donut2.main, this.annual_comparison_donut3.main);
        this.annual_comparison_wrapper.replaceChildren(this.annual_comparison_title, this.annual_comparison_chart_wrapper);
        this.total_expense_currency.prepend("R$ ");
        this.higher_expense_currency.prepend("R$ ");
        this.main.replaceChildren(this.title, this.report_wraper, this.annual_comparison_wrapper);
    }

    renderStatus() {
        this.renderExpensiveCategory()
        this.renderHigherExpense()
        this.renderTotalExpense()
    }

    renderCharts(){
        this.renderExpensiveCategoryDonut();
        this.renderHigherExpenseDonut();
        this.renderTotalExpenseDonut();
    }

    renderTotalExpense() {
        this.total_expense_value.textContent = ReportController.getLastMonthTotalExpense();
    }

    renderHigherExpense() {
        this.higher_expense_value.textContent = ReportController.getLastMonthHigherExpense();
    }

    renderExpensiveCategory() {
        this.expensive_category_value.textContent = ReportController.getLastMonthExpensiveCategory();
    }

    renderTotalExpenseDonut(){
        let raw_data = ReportController.getTotalExpensesOfMonth();
        raw_data = {labels: raw_data.year, data: raw_data.sum_of_expenses, label: 'R$'}
        this.renderIndividualDonut(raw_data, this.annual_comparison_donut1)
    }

    renderHigherExpenseDonut() {
        let raw_data = ReportController.getHigherExpensesOfMonth();
        raw_data = {labels: raw_data.year, data: raw_data.expense, label: 'R$'}
        this.renderIndividualDonut(raw_data, this.annual_comparison_donut2)
    }

    renderExpensiveCategoryDonut() {
        const RAW_DATA = ReportController.getExpensiveCategoryOfMonth()
        const PROCESSED = {labels: RAW_DATA.year, data: RAW_DATA.category.map(v=>1)}
        this.renderIndividualDonut(PROCESSED, this.annual_comparison_donut3)
        this.annual_comparison_donut3.donut.options.plugins.tooltip = {callbacks: {label: function(context) {const alimento = RAW_DATA.category[context.dataIndex];return ` ${alimento}`;}}};this.annual_comparison_donut3.donut.update()}

    renderIndividualDonut(_raw_data, _donut) {
        const DATA = {
            labels: _raw_data.labels,
            datasets: [{
                label: _raw_data.label || "",
                data: _raw_data.data,
                hoverOffset: 4,
            }]
        }
        if (_donut instanceof ComponentDonut) {
            _donut.updateData(DATA);
        } else {
            console.error(`Não é um chart: ${_donut}`)
        }
    }
}