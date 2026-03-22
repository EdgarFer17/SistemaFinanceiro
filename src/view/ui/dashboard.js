import ComponentBar from "./components/bar.js";
import BaseComponent from "./components/baseComponent.js";
import ComponentDonut from "./components/donut.js";
import ComponentTransactionList from "./components/TransactionList.js";
import DashboardController from "../../controller/dashboardController.js";
import TRANSACTION_TYPE_MODEL from "../../model/TransactionTypeModel.js";

// Página inicial com resumo financeiro, gráficos e últimas transações
export default class Dashboard extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config)
        this.hide_backup = [];
    }

    // Cria estrutura DOM recursiva a partir de schema de objetos aninhados
    spawn() {
        const SCHEMA_FINAL = {
            _tag: "main",
            title_section: {
                _tag: "section",
                title: "h2",
                ope_div: {
                    _tag: "div",
                    ope_report_button: {
                        _tag:"button",
                        ope_report_icon: "img",
                    },
                    ope_show_button: {
                        _tag: "button",
                        ope_show_icon: "img",
                    },
                },
            },
            status_section: {
                _tag:"section",
                balance_div: {
                    _tag: "div",
                    balance_title: "h3",
                    balance_currency: {
                        _tag: "p",
                        balance_value: "span",
                    },
                },
                vertical_rule_1: "div",
                income_div: {
                    _tag: "div",
                    income_title: "h3",
                    income_currency: {
                        _tag: "p",
                        income_value: "span"
                    },
                },
                vertical_rule_2: "div",
                expense_div: {
                    _tag: "div",
                    expense_title: "h3",
                    expense_currency: {
                        _tag: "p",
                        expense_value: "span",
                    },
                },
            },

            donut_section: {
                _tag: "section",
                donut_1_div: {
                    _tag: "div",
                    donut_1_title: "h3",
                    donut_1_component: new ComponentDonut()
                },
                donut_2_div: {
                    _tag: "div",
                    donut_2_title: "h3",
                    donut_2_component: new ComponentDonut(),
                },
            },

            bar_section: {
                _tag: "section",
                bar_title: "h3",
                bar_component: new ComponentBar(),
            },

            transaction_section: {
                _tag: "section",
                transaction_title: "h3",
                transaction_component: new ComponentTransactionList(),
            },

            report_component: "i" // adicionar
        }
        this.main = this.parseSchema("main", SCHEMA_FINAL);
        delete this.elements.main;
    }

    // Configura ícones, valores iniciais (receita, despesa, saldo) e textos das seções
    setup() {
        this.elements.ope_report_icon.src = "./assets/ReportIcon.png";
        this.elements.ope_report_icon.alt = "Icone do botao para gerar um relatório";
        this.elements.ope_show_icon.src = "./assets/EyeIcon.png";
        this.elements.ope_show_icon.alt = "Icone do botao para esconder dados sensiveis";
        this.setFunction('click', ()=>{this.toggleShow()}, this.elements.ope_show_button)

        this.income = DashboardController.getTotalIncome();
        this.expense = DashboardController.getTotalExpense();
        this.currency = this.income + this.expense;

        this.elements.balance_title.textContent = "Saldo";
        this.elements.balance_currency.prepend("R$ ");
        this.elements.balance_value.textContent = this.currency;
        this.elements.income_title.textContent = "Receita";
        this.elements.income_currency.prepend("R$ ");
        this.elements.income_value.textContent = this.income;
        this.elements.expense_title.textContent = "Despesa";
        this.elements.expense_currency.prepend("R$ ");
        this.elements.expense_value.textContent = this.expense;

        this.elements.donut_1_title.textContent = "Arrecadação e Gastos no Mês";
        this.elements.donut_2_title.textContent = "Gastos por Categorias";

        this.elements.bar_title.textContent = "Evolução Mensal";

        this.elements.transaction_title.textContent = "Últimas Transações";
    }

    // Aplica estilos Bootstrap aos elementos do dashboard
    style(style_config) {
        const MAIN_CLASSES = style_config.main;
        if (MAIN_CLASSES !== undefined) {
            this.main.classList.add(...MAIN_CLASSES);
        }
        for (const [NAME, CLASSES] of Object.entries(style_config)) {
            const EL = this.elements[NAME];
            if (EL && Array.isArray(CLASSES)) {
                EL.classList.add(...CLASSES);
            }
        }
    }
    // O build já foi feito no parseSchema
    build() {}

    // Constrói DOM recursivamente a partir de schema com suporte a BaseComponent
    parseSchema(NAME, SCHEMA) {
        const IS_OBJECT = typeof SCHEMA === "object" && SCHEMA !== null;
        if (IS_OBJECT) {
            if(SCHEMA instanceof BaseComponent) {
                this.elements[NAME] = SCHEMA;
                return SCHEMA.main;
            }
        }
        const TAG_NAME = IS_OBJECT ? SCHEMA._tag : SCHEMA;
        const EL = document.createElement(TAG_NAME);
        this.elements[NAME] = EL;
        if (IS_OBJECT) {
            for (const KEY in SCHEMA) {
                if (KEY !== "_tag") {
                    const CHILD_EL = this.parseSchema(KEY, SCHEMA[KEY]);
                    EL.appendChild(CHILD_EL);
                }
            }
        }
        return EL;
    }

    // Altera o título de boas-vindas do dashboard
    updateTitle(_text){
        this.elements.title.textContent = _text;
    };

    // Atualiza valor de receita
    updateIncome(_value){
        if (typeof _value === "number") {
            this.income = _value;
        }
    };

    // Atualiza valor de despesa
    updateExpense(_value){
        if (typeof _value === "number") {
            this.expense = _value;
        }
    };

    // Recalcula receita e atualiza valores exibidos
    reloadStatus() {
        this.income = DashboardController.getTotalIncome();
        this.expense = DashboardController.getTotalExpense();
        this.currency = this.income + this.expense;

        this.elements.balance_value.textContent = this.currency;
        this.elements.income_value.textContent = this.income;
        this.elements.expense_value.textContent = this.expense;
    };

    // Alterna exibição/ocultação de gráficos e valores sensíveis (com asteriscos)
    toggleShow(){
        if (this.hide_backup.length > 0) {
            const TO_SHOW = [
                this.elements.donut_1_component.main,
                this.elements.donut_2_component.main,
                this.elements.bar_component.main,
                this.elements.transaction_component.main,
            ]
            for (const I in this.hide_backup) {
                TO_SHOW[I].replaceChildren(...this.hide_backup[I]);
            }
            this.hide_backup = [];
            this.elements.ope_show_icon.src = "./assets/EyeIcon.png"
            this.elements.balance_value.textContent = this.currency;
            this.elements.income_value.textContent = this.income;
            this.elements.expense_value.textContent = this.expense;
        } else {
            this.hide_backup = [];
            const TO_HIDE = [
                this.elements.donut_1_component.main,
                this.elements.donut_2_component.main,
                this.elements.bar_component.main,
                this.elements.transaction_component.main,
            ]
            const HIDE_ELEMENTS = [];
            for (let i = 0; i < 4; i++) {
                this.hide_backup.push([...TO_HIDE.at(i).children]);
                const IMG = document.createElement("img")
                IMG.src = "./assets/Hide.svg";
                IMG.alt = "Elemento Escondido Pelo Usuário!";
                IMG.classList.add("img-fluid")
                HIDE_ELEMENTS.push(IMG);
                TO_HIDE.at(i).replaceChildren(HIDE_ELEMENTS.at(i));
            }
    
            this.elements.ope_show_icon.src = "./assets/OcultEyeIcon.png"
            this.elements.balance_value.textContent = "*".repeat(this.currency.toString().length);
            this.elements.income_value.textContent = "*".repeat(this.income.toString().length);
            this.elements.expense_value.textContent = "*".repeat(this.expense.toString().length);
        }
    };

    renderCharts() {
        this.renderMonthExpenseIncome();
        this.renderExpensiveForCategory();
        this.renderExpenseIncomeForLastSixMonth();
        this.renderFiveLastTransactions();
        this.reloadStatus();
    }

    // Carrega e renderiza as 5 últimas transações na tabela
    renderFiveLastTransactions() {
        this.elements.transaction_component.resetRows();
        const LAST_FIVE_TRANSACTIONS = DashboardController.getLastFiveTransactions();
        for (const TRANSACTION of LAST_FIVE_TRANSACTIONS) {
            this.elements.transaction_component.addRow(TRANSACTION, {td: []});
        }
        this.elements.transaction_component.renderList();
    }

    // Popula gráfico de barras com evolução de receita e despesa dos últimos 6 meses
    renderExpenseIncomeForLastSixMonth() {
        const DATA = {
            labels: [],
            datasets: [
                {
                    label: 'Final',
                    data: [],
                    borderColor: '#FCD34D',
                    borderWidth: 2,
                    type: 'line',
                    tension: 0.2
                },
                {
                    label: 'Receitas',
                    data: [],
                    backgroundColor: '#3B82F6',
                },
                {
                    label: 'Despesas',
                    data: [],
                    backgroundColor: '#f63b3b',
                }
            ]
        }
        try {
            const RAW_DATA = DashboardController.getExpenseIncomeOfLastSixMonths();
            RAW_DATA.reverse();
            RAW_DATA.map((month)=> {
                DATA.labels.push(month.date);
                DATA.datasets[1].data.push(month.income);
                DATA.datasets[2].data.push(-month.expense);
                DATA.datasets[0].data.push(month.income + month.expense);
            })
        } catch (error) {
            console.error(error);
            return;
        }
        
        this.elements.bar_component.updateData(DATA);
    }
    
    // Popula donut com proporção receita vs despesa do mês atual
    renderMonthExpenseIncome() {
        const DATA = {
            labels: ["Receita", "Despesa"],
            datasets: [{
                label: 'R$',
                data: [],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                ],
                hoverOffset: 4,
            }]
        }
        try {
            const MONTH_EXPENSE_INCOME = DashboardController.getMonthExpenseIncome();
            DATA.datasets[0].data = [MONTH_EXPENSE_INCOME.income, MONTH_EXPENSE_INCOME.expense]
        } catch (error) {
            console.error(error);
            return;
        }

        this.elements.donut_1_component.updateData(DATA);
    }

    // Popula donut com distribuição de despesas por categoria
    renderExpensiveForCategory() {
        const DATA = {
            labels: [],
            datasets: [{
                label: 'R$',
                hoverOffset: 4,
                data: [],
            }]
        }
        try {
            const EXPENSE_BY_CATEGORY = DashboardController.getExpenseByCategories();
            Object.entries(EXPENSE_BY_CATEGORY).map((value)=>{
                DATA.labels.push(value[0]);
                DATA.datasets[0].data.push(value[1].expense);
            })
        } catch (error) {
            console.error(error);
            return;
        }
        
        this.elements.donut_2_component.updateData(DATA);
    }

    // Registra função para abrir modal de relatório
    setModal(_function) {
        this.setFunction('click', ()=>{_function()}, this.elements.ope_report_button);
    }
}