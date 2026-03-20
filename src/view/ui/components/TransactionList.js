import TRANSACTION_TYPE_MODEL from "../../../model/TransactionTypeModel.js";
import BaseComponent from "./baseComponent.js"

export default class ComponentTransactionList extends BaseComponent {
    constructor(config = {}, style_config) {
        super(config, style_config);
        this.style_config = style_config;
        this.rows = [];
    }

    spawn() {
        this.main = document.createElement("table");
        this.table_head = document.createElement("thead");
        this.table_head_row = document.createElement("tr");
        this.table_body = document.createElement("tbody");
    };

    setup(config) {
        const COLUNAS = [
            "Data", "Categoria", "Tipo", "Valor"
        ]
        for (const COLUNA of COLUNAS) {
            const TH = document.createElement("th");
            TH.classList.add("text-primary")
            TH.textContent = COLUNA;
            this.table_head_row.appendChild(TH);
        }
    };

    style(style_config = {main: [], table_head: [], table_head_row: [], table_body: []}) {
        this.main.classList.add(...["table", "table-borderless", "text-center", "align-middle", "w-75", "mt-3"], ...style_config.main);
        this.table_head.classList.add(...[], ...style_config.table_head);
        this.table_head_row.classList.add(...[], ...style_config.table_head_row);
        this.table_body.classList.add(...[], ...style_config.table_body);
    };

    build() {
        this.table_head.replaceChildren(this.table_head_row);
        this.main.replaceChildren(this.table_head, this.table_body);
    };

    addRow(data = {date: "date-default", category: "category-default", type: "type-default", value: "value-default"}, style_config = {}) {
        const ROW = document.createElement("tr");
        ROW.classList.add()
        for (const CELL_DATA of [data.date.toLocaleDateString("pt-BR"), data.category.categoryName, data.type, data.value]) {
            const CELL = document.createElement("td");
            CELL.textContent = CELL_DATA;
            CELL.classList.add(...style_config.td);
            ROW.appendChild(CELL);
        }
        ROW.children[2].classList.add(data.type === TRANSACTION_TYPE_MODEL.INCOME ? "text-success" : "text-danger")
        this.rows.push(ROW);
    };

    resetRows() {
        this.rows = [];
    }

    renderList() {
        this.table_body.replaceChildren(...this.rows);
    }
}