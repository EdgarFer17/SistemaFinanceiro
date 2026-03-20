import BaseComponent from "./components/baseComponent.js";
import TransactionController from "../../controller/TransactionController.js";

export default class Transaction extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('main');
        this.header_wrapper = document.createElement('div');
        this.title = document.createElement('h2');
        this.button = document.createElement('button');
        this.list_container = document.createElement('section');
        this.table_header_row = document.createElement('div');
    }

    setup(config) {
        this.title.textContent = config['title'] || "Transações";
        this.button.textContent = config['button_title'] || "Adicionar Transação";
        
        const headers = ['Data', 'Categoria', 'Tipo', 'Valor', "Descrição", "Editar/Excluir"];
        headers.forEach(text => {
            const span = document.createElement('span');
            span.textContent = text;
            span.style.flex = "1";
            span.style.textAlign = "center";
            span.style.fontWeight = "bold";
            this.table_header_row.appendChild(span);
        });

        this.renderList();


        document.addEventListener('transactionSaved', () => {
            this.renderList(); 
        });
    }

    renderList() {
        this.list_container.innerHTML = '';

        let transacoesDoBanco = [];
        try {
            transacoesDoBanco = TransactionController.getTransactions() || [];
        } catch (e) {
            console.error("Erro ao buscar transações:", e);
        }


        transacoesDoBanco.reverse().forEach(trans => {
            const row = this.createTransactionRow(trans);
            this.list_container.appendChild(row);
        });
    }

    setModal(_function) {
        const SIGNAL = this.controller.signal;
        this.modal_trigger = _function;
        this.button.addEventListener("click", _function, { SIGNAL })
    }

    createTransactionRow(data) {
        const row = document.createElement('div');
        row.className = 'transaction-row';

        const isNegative = data.value < 0;
        const valorFormatado = `R$ ${data.value.toFixed(2).replace('.', ',')}`;


        const dataObj = new Date(data.date);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        const dataFormatadaStr = `${dia}/${mes}/${ano}`;


        const tipoDisplay = data.type === "EXPENSE" ? "DESPESA" : "RECEITA";

        row.innerHTML = `
            <span style="flex: 1; text-align: center; font-weight: bold;">${dataFormatadaStr}</span>
            <span style="flex: 1; text-align: center; font-style: italic; font-weight: bold;">${data.category.categoryName}</span>
            <span style="flex: 1; text-align: center; font-weight: bold;">${tipoDisplay}</span>
            <span style="flex: 1; text-align: center; color: ${isNegative ? '#e74c3c' : '#27ae60'}; font-weight: bold;">
                ${valorFormatado}
            </span>
            <span style="flex: 1; text-align: center; font-weight: bold;">${this.sanitizeHtml(data.desc) || ''}</span> 
            <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
                <img src="./assets/green-edit-icon.png" class="edit-btn" style="width: 20px; cursor: pointer;" title="Editar">
                <img src="./assets/green-delete-icon.png" class="delete-btn" style="width: 20px; cursor: pointer;" title="Excluir">
            </div>
        `;

        this.styleRow(row);

        // --- BOTÃO EXCLUIR ---
        row.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm(`Deseja realmente excluir a transação de ${valorFormatado}?`)) {
                try {

                    TransactionController.deleteTransaction(data.id);

                    this.renderList();
                } catch (e) {
                    alert("Erro ao excluir: " + e.message);
                }
            }
        });

        // --- BOTÃO EDITAR ---
        row.querySelector('.edit-btn').addEventListener('click', (event) => {
            this.modal_trigger(event, data);
        });

        return row;
    }

    openModal(data) {
        
    }

    style(style_config) {
        Object.assign(this.main.style, {
            flex: "1",                
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            backgroundColor: "#f8fafd",
            minHeight: "100vh",
            boxSizing: "border-box",  
            width: "100%"
        });

        Object.assign(this.header_wrapper.style, {
           display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            width: "100%",
            position: "relative",
            marginBottom: "40px"
        });

        this.title.style.color = "#6ca09d";
        
        Object.assign(this.button.style, {
            backgroundColor: "#6ca09d",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            position: "absolute",
            right: "0"
        });

        Object.assign(this.table_header_row.style, {
            display: "flex",
            padding: "0 20px",
            color: "#6ca09d",
            marginBottom: "10px"
        });

        Object.assign(this.list_container.style, {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
        });
    }

    styleRow(row) {
        Object.assign(row.style, {
            display: "flex",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid #eef2f2"
        });
    }

    build() {
        this.header_wrapper.appendChild(this.title);
        this.header_wrapper.appendChild(this.button);
        this.main.appendChild(this.header_wrapper);
        this.main.appendChild(this.table_header_row);
        this.main.appendChild(this.list_container);
    }

    sanitizeHtml(_text) {
        const P = document.createElement("p");
        P.textContent = _text;
        return P.innerHTML;
    }
}