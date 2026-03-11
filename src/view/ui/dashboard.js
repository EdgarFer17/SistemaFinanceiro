import BaseComponent from "./components/baseComponent.js";

export default class Dashboard extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config)
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
                        _tag:"div",
                        ope_report_icon: "img",
                    },
                    ope_show_div: {
                        _tag: "div",
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

    }
    style(style_config) {
        const MAIN_CLASSES = style_config.main;
        if (MAIN_CLASSES !== undefined) {
            this.main.classList.add(...MAIN_CLASSES);
        }
        for (const [NAME, CLASSES] of Object.entries(style_config)) {
            const EL = this.elements.name;
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
}

const A = new Dashboard({}, {main:["teste"]});
document.body.appendChild(A.main)
console.log(A)