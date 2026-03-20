import BaseComponent from "./baseComponent.js"

export default class ComponentTransactionList extends BaseComponent {
    constructor(config = {}, style_config) {
        super(config, style_config);
        this.style_config = style_config;
    }

    spawn() {
        this.main = document.createElement("table");
        this.table_head = document.createElement("thead");
        this.table_head_row = document.createElement("tr");
        this.table_body = document.createElement("tbody");
    };

    setup(config) {
        const COLUNAS = [
            "Data", "Categoria", "Tipo", "Valor", "Editar", "Deletar"
        ]
        for (const COLUNA of COLUNAS) {
            const TH = document.createElement("th");
            TH.textContent = COLUNA;
            this.table_head_row.appendChild(TH);
        }
    };
    style(style_config = {main: [], table_head: [], table_head_row: [], table_body: []}) {
        this.main.classList.add(...["w-75", "d-flex", "justify-content-center"], ...style_config.main);
        this.table_head.classList.add(...["w-100"], ...style_config.table_head);
        this.table_head_row.classList.add(...["d-flex", "justify-content-around"], ...style_config.table_head_row);
        this.table_body.classList.add(...[], ...style_config.table_body);
    };
    build() {
        this.table_head.replaceChildren(this.table_head_row);
        this.main.replaceChildren(this.table_head, this.table_body);
    };

    addRow(data = {date: "date-default", category: "category-default", type: "type-default", value: "value-default"}, style_config = {}) {
        const ROW = document.createElement("tr");
        for (const CELL_DATA of data) {
            const CELL = document.createElement("td");
            CELL.textContent = CELL_DATA;
            CELL.classList.add(...style_config.td);
            ROW.appendChild(CELL);
        }
        const EDIT = document.createElement("button");
        const EDIT_CELL = document.createElement("td");
        const DELETE = document.createElement("button");
        const DELETE_CELL = document.createElement("td");
    };
}