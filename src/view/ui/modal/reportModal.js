import BaseComponent from "bootstrap/js/dist/base-component";
import ComponentDonut from "../components/donut";
import ReportController from "../../../controller/reportController";

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
        this.expensive_category_currency = document.createElement('p');
        this.expensive_category_value = document.createElement('span');

        this.annual_comparison_wrapper = document.createElement('div');
        this.annual_comparison_title = document.createElement('h3');
        this.annual_comparison_chart_wrapper = document.createElement('div');
        this.annual_comparison_donut1 = new ComponentDonut();
        this.annual_comparison_donut2 = new ComponentDonut();
        this.annual_comparison_donut3 = new ComponentDonut();
    }

    style(style_config = {
        main: [],
        title: [],
        report_wraper: [],
        total_expense_wrapper: [],
        total_expense_title: [],
        total_expense_currency: [],
        total_expense_value: [],
        higher_expense_wrapper: [],
        higher_expense_title: [],
        higher_expense_currency: [],
        higher_expense_value: [],
        expensive_category_wrapper: [],
        expensive_category_title: [],
        expensive_category_currency: [],
        expensive_category_value: [],
        annual_comparison_wrapper: [],
        annual_comparison_title: [],
        annual_comparison_chart_wrapper: [],
    }) {
        this.main.classList.add(...style_config.main);
        this.title.classList.add(...style_config.title);
        this.report_wraper.classList.add(...style_config.report_wraper);
        this.total_expense_wrapper.classList.add(...style_config.total_expense_wrapper);
        this.total_expense_title.classList.add(...style_config.total_expense_title);
        this.total_expense_value.classList.add(...style_config.total_expense_value);
        this.higher_expense_wrapper.classList.add(...style_config.higher_expense_wrapper);
        this.higher_expense_title.classList.add(...style_config.higher_expense_title);
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
        this.expensive_category_currency.replaceChildren(this.expensive_category_value);
        this.expensive_category_wrapper.replaceChildren(this.expensive_category_title, this.expensive_category_currency);
        this.report_wraper.replaceChildren(this.total_expense_wrapper, this.higher_expense_wrapper, this.expensive_category_wrapper);
        this.annual_comparison_chart_wrapper.replaceChildren(this.annual_comparison_donut1.main, this.annual_comparison_donut2.main, this.annual_comparison_donut3.main);
        this.annual_comparison_wrapper.replaceChildren(this.annual_comparison_title, this.annual_comparison_chart_wrapper);
        this.main.replaceChildren(this.title, this.report_wraper, this.annual_comparison_wrapper);
    }

    renderStatus() {
        this.#renderExpensiveCategory()
        this.#renderHigherExpense()
        this.#renderTotalExpense()
    }

    renderCharts(){
        this.#renderExpensiveCategoryDonut();
        this.#renderHigherExpenseDonut();
        this.#renderTotalExpenseDonut();
    }

    setup() {
        this.title.textContent = "Relatório Mensal";
        this.total_expense_title = "Gasto total do mês";
        this.higher_expense_title = "Maior gasto efetuado";
        this.expensive_category_title = "Categoria com maior despesa";
        this.annual_comparison_title = "Comparação anual";

        this.total_expense_currency.prepend("R$ ");
        this.higher_expense_currency.prepend("R$ ");
        this.expensive_category_currency.prepend("R$ ");

        this.annual_comparison_donut1.donut.options = {plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Gasto Totais' }}}
        this.annual_comparison_donut2.donut.options = {plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Maiores Gastos Efetuados' }}}
        this.annual_comparison_donut3.donut.options = {plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Categorias com maiores despesas' }}}

        this.renderStatus();
        this.renderCharts();
    }

    #renderTotalExpense() {
        this.total_expense_value.textContent = ReportController.getLastMonthTotalExpense();
    }

    #renderHigherExpense() {
        this.higher_expense_value.textContent = ReportController.getLastMonthHigherExpense();
    }

    #renderExpensiveCategory() {
        this.expensive_category_value.textcontent = ReportController.getLastMonthExpensiveCategory();
    }

    #renderTotalExpenseDonut(){
        const DATA = {
            labels: [],
            datasets: [{
                label: 'R$',
                data: [],
                hoverOffset: 4,
            }]
        }
        this.annual_comparison_donut1.updateData(DATA);
    }

    #renderHigherExpenseDonut() {
        const DATA = {
            labels: [],
            datasets: [{
                label: 'R$',
                data: [],
                hoverOffset: 4,
            }]
        }
        this.annual_comparison_donut2.updateData(DATA);
    }

    #renderExpensiveCategoryDonut() {
        const DATA = {
            labels: [],
            datasets: [{
                label: 'R$',
                data: [],
                hoverOffset: 4,
            }]
        }
        this.annual_comparison_donut3.updateData(DATA);
    }

}
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('graficoDespesas');
    
    if (ctx) {
        let a = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Entradas', 'Saidas'],
                datasets: [{
                    label: 'Gastos (R$)',
                    data: [totalEntradas, totalSaidas],
                    backgroundColor: [
                        'green',
                        'red',
                    ],
                    hoverOffset: 10
                }]
            },
        });
    }
});