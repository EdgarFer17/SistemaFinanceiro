import BaseComponent from "./components/baseComponent.js";

export default class Dashboard extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config)
        this.currency = 0;
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
                    ope_report_div: {
                        _tag:"button",
                        ope_report_icon: "img",
                    },
                    ope_show_div: {
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
                    balance_currency: "p",
                },
                health_div: {
                    _tag: "div",
                    health_title: "h3",
                    health_status: "p",
                },
            },

            donut_section: {
                _tag: "section",
                donut_1_div: {
                    _tag: "div",
                    donut_1_title: "h3",
                    donut_1_chart_div: {
                        _tag: "div",
                        donut_1_chart_title: "h4",
                        donut_1_chart_subtitle: "h5",
                        donut_1_component: "i", // adicionar
                    },
                },
                donut_2_div: {
                    _tag: "div",
                    donut_2_title: "h3",
                    donut_2_div_2: {
                        _tag: "div",
                        donut_2_filter: "i", // adicionar
                        donut_2_chart_div: {
                            _tag: "div",
                            donut_2_chart_title: "h4",
                            donut_2_chart_subtitle: "h5",
                            donut_2_component: "i", // adicionar
                        },
                    },
                },
            },

            bar_section: {
                _tag: "section",
                bar_title: "h3",
                bar_component: "i", // adicionar
            },

            transaction_section: {
                _tag: "section",
                transaction_title: "h3",
                transaction_table: {
                    _tag: "table",
                    transaction_th: {
                        _tag: "thead",
                        transaction_tr: "tr",
                    },
                },
            },

            report_component: "i" // adicionar
        }
        this.main = this.parseSchema("main", SCHEMA_FINAL);
        delete this.elements.main;
    }

    setup() {
        this.setFunction('click', ()=>{this.toggleShow()}, this.elements.ope_show_div)
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
        this.elements.title.textContet = _text;
    };
    updateCurrency(_currency){
        if (typeof _currency === "number") {
            this.currency = _currency;
            this.elements.balance_currency.textContent = `R$: ${this.currency}`;
        }
    };
    updateHealthStatus(_status){
        this.elements.health_status.textContent = _status;
        // if (_status === ) PRECISO DO REPOSITORY, ou do FIGMA
        this.elements.health_status.classList.toggle("text-danger");
    };

    toggleShow(){
        if (this.hide_backup.length > 0) {
            const TO_SHOW = [
                this.elements.donut_1_chart_div,
                this.elements.donut_2_div_2,
                this.elements.bar_component,
                this.elements.transaction_table,
            ]
            for (const i in this.hide_backup) {
                TO_SHOW[i].replaceChildren(...this.hide_backup[i]);
            }
            this.hide_backup = [];
            this.elements.balance_currency.textContent = `R$: ${this.currency}`;
            this.elements.health_status.textContent = this.health_status;
        } else {
            this.hide_backup = [];
            const TO_HIDE = [
                this.elements.donut_1_chart_div,
                this.elements.donut_2_div_2,
                this.elements.bar_component,
                this.elements.transaction_table,
            ]
            const HIDE_ELEMENTS = [];
            for (let i = 0; i < 4; i++) {
                this.hide_backup.push([...TO_HIDE.at(i).children]);
                HIDE_ELEMENTS.push(document.createElement("img"));
                HIDE_ELEMENTS.at(i).src = "./assets/Hide.svg";
                HIDE_ELEMENTS.at(i).alt = "Elemento Escondido Pelo Usuário!";
                TO_HIDE.at(i).replaceChildren(HIDE_ELEMENTS.at(i));
            }
    
            this.elements.balance_currency.textContent = `R$: ${"*".repeat(this.currency.toString().length)}`;
            this.elements.health_status.textContent = "*".repeat(this.health_status.length);
        }
    };

    setFunction(_event, _function, _element) {
        const SIGNAL = this.controller.signal;
        if (_element instanceof HTMLElement) {
            _element.addEventListener(_event, _function, { SIGNAL });
        }
    }
}

const A = new Dashboard({}, {main:["teste", "opa"], donut_section:["tituloAQUIEm"]});
document.body.appendChild(A.main)
console.log(A)