import ComponentBar from "./components/bar.js";
import BaseComponent from "./components/baseComponent.js";
import ComponentDonut from "./components/donut.js";
import ComponentTransactionList from "./components/transactionList.js";

export default class Dashboard extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config)
        this.currency = -1000.00
        this.income = 1000.00
        this.expense = 2000.00
        this.health_status = "a";
        this.hide_backup = [];
    }

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

    setup() {
        this.elements.ope_report_icon.src = "./assets/ReportIcon.png";
        this.elements.ope_report_icon.alt = "Icone do botao para gerar um relatório";
        this.elements.ope_show_icon.src = "./assets/EyeIcon.png";
        this.elements.ope_show_icon.alt = "Icone do botao para esconder dados sensiveis";
        this.setFunction('click', ()=>{this.toggleShow()}, this.elements.ope_show_button)

        this.currency = -1000.00
        this.income = 1000.00
        this.expense = 2000.00
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
    build() {
        // Ja fiz o build com o parse, n vou escrever 25 linhas de replaceChildren KK
    }

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

    updateTitle(_text){
        this.elements.title.textContent = _text;
    };

    updateIncome(_value){
        if (typeof _value === "number") {
            this.income = _value;
        }
    };

    updateExpense(_value){
        if (typeof _value === "number") {
            this.expense = _value;
        }
    };

    reloadStatus() {
        this.balance = this.income - this.expense;
        this.elements.balance_value.textContent = this.balance;
        this.elements.income_value.textContent = this.income;
        this.elements.expense_value.textContent = this.expense;
    };

    toggleShow(){
        if (this.hide_backup.length > 0) {
            const TO_SHOW = [
                this.elements.donut_1_component.main,
                this.elements.donut_2_component.main,
                this.elements.bar_component.main,
                this.elements.transaction_component.main,
            ]
            for (const i in this.hide_backup) {
                TO_SHOW[i].replaceChildren(...this.hide_backup[i]);
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
                HIDE_ELEMENTS.push(document.createElement("img"));
                HIDE_ELEMENTS.at(i).src = "./assets/Hide.svg";
                HIDE_ELEMENTS.at(i).alt = "Elemento Escondido Pelo Usuário!";
                TO_HIDE.at(i).replaceChildren(HIDE_ELEMENTS.at(i));
            }
    
            this.elements.ope_show_icon.src = "./assets/OcultEyeIcon.png"
            this.elements.balance_value.textContent = "*".repeat(this.currency.toString().length);
            this.elements.income_value.textContent = "*".repeat(this.income.toString().length);
            this.elements.expense_value.textContent = "*".repeat(this.expense.toString().length);
        }
    };

    setReportFunction(_function) {
        this.setFunction('click', _function, this.elements.ope_report_button);
    }

    setFunction(_event, _function, _element) {
        const SIGNAL = this.controller.signal;
        if (_element instanceof HTMLElement) {
            _element.addEventListener(_event, ()=>{_function()}, { SIGNAL });
        }
    }
}