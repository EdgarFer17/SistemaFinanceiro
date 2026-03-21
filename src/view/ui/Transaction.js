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
        
        // NOVO: Container para o nosso filtro
        this.filter_container = document.createElement('div');
        
        this.list_container = document.createElement('section');
        this.table_header_row = document.createElement('div');
        this.pagination_container = document.createElement('div');
    }

    setup(config) {
        this.title.textContent = config['title'] || "Transações";
        this.button.textContent = config['button_title'] || "Adicionar Transação";

        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentFilter = "ALL"; // NOVO: Estado inicial do filtro

        const headers = ['Data', 'Categoria', 'Tipo', 'Valor', "Descrição", "Editar/Excluir"];
        headers.forEach(text => {
            const span = document.createElement('span');
            span.textContent = text;
            span.className = "col-2 text-center fw-bold"; 
            this.table_header_row.appendChild(span);
        });

        this.buildFilterUI(); // Desenha o filtro na tela
        this.renderList();

        document.addEventListener('transactionSaved', () => {
            this.currentPage = 1;
            this.renderList(); 
        });
    }

    // --- REMOVIDO INNERHTML: CONSTRUÇÃO NATIVA DO FILTRO ---
    buildFilterUI() {
        this.filter_container.className = "d-flex justify-content-end mb-3 w-100 px-3 px-md-4";
        this.filter_container.replaceChildren(); // Limpa conteúdo antigo com segurança
        
        const select = document.createElement('select');
        select.className = "form-select shadow-sm cursor-pointer";
        select.style.maxWidth = "200px";
        select.style.borderColor = "#6ca09d";
        select.style.color = "#6ca09d";
        select.style.fontWeight = "bold";

        const optionAll = document.createElement('option');
        optionAll.value = "ALL";
        optionAll.textContent = "Todas as Transações";

        const optionIn = document.createElement('option');
        optionIn.value = "RECEITA";
        optionIn.textContent = "Apenas Entradas";

        const optionOut = document.createElement('option');
        optionOut.value = "DESPESA";
        optionOut.textContent = "Apenas Saídas";

        select.append(optionAll, optionIn, optionOut);
        select.value = this.currentFilter; // Mantém a opção que estava selecionada
        
        select.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.currentPage = 1;
            this.renderList();
        });

        this.filter_container.appendChild(select);
    }

    renderList() {
        this.list_container.replaceChildren(); // Forma moderna de limpar o elemento
        this.pagination_container.replaceChildren();

        let transacoesDoBanco = [];
        try {
            transacoesDoBanco = TransactionController.getTransactions() || [];
        } catch (e) {
            console.error("Erro ao buscar transações:", e);
        }

        transacoesDoBanco.reverse();

        if (this.currentFilter === 'RECEITA') {
            transacoesDoBanco = transacoesDoBanco.filter(t => t.value >= 0);
        } else if (this.currentFilter === 'DESPESA') {
            transacoesDoBanco = transacoesDoBanco.filter(t => t.value < 0);
        }

        const totalItems = transacoesDoBanco.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);

        if (this.currentPage > totalPages && totalPages > 0) {
            this.currentPage = totalPages;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const transacoesDaPagina = transacoesDoBanco.slice(startIndex, endIndex);

        if (transacoesDaPagina.length === 0) {
            // --- REMOVIDO INNERHTML: MENSAGEM NATIVA DE LISTA VAZIA ---
            const emptyMessage = document.createElement('div');
            emptyMessage.className = "text-center text-muted p-5 w-100 fw-bold border bg-white rounded-3 shadow-sm";
            emptyMessage.textContent = "Nenhuma transação encontrada para este filtro.";
            
            this.list_container.appendChild(emptyMessage);
            return;
        }

        transacoesDaPagina.forEach(trans => {
            const row = this.createTransactionRow(trans);
            this.list_container.appendChild(row);
        });

        if (totalPages > 1) {
            this.renderPagination(totalPages);
        }
    }

    renderPagination(totalPages) {
        this.pagination_container.className = "d-flex justify-content-center align-items-center gap-3 my-4 flex-wrap";

        const btnPrev = document.createElement('button');
        btnPrev.textContent = "Anterior";
        btnPrev.className = `btn text-white shadow-sm ${this.currentPage === 1 ? 'disabled' : ''}`;
        btnPrev.style.backgroundColor = this.currentPage === 1 ? "#ccc" : "#6ca09d";
        btnPrev.onclick = () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderList();
            }
        };

        const infoText = document.createElement('span');
        infoText.textContent = `Página ${this.currentPage} de ${totalPages}`;
        infoText.className = "fw-bold";
        infoText.style.color = "#6ca09d";

        const btnNext = document.createElement('button');
        btnNext.textContent = "Próxima";
        btnNext.className = `btn text-white shadow-sm ${this.currentPage === totalPages ? 'disabled' : ''}`;
        btnNext.style.backgroundColor = this.currentPage === totalPages ? "#ccc" : "#6ca09d";
        btnNext.onclick = () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderList();
            }
        };

        this.pagination_container.append(btnPrev, infoText, btnNext);
    }

    setModal(_function) {
        const SIGNAL = this.controller.signal;
        this.modal_trigger = _function;
        this.button.addEventListener("click", _function, { SIGNAL });
    }

    createTransactionRow(data) {
        const row = document.createElement('div');
        row.className = 'row align-items-center px-4 py-3 bg-white rounded-3 shadow-sm border w-100 m-0 transaction-row';
        row.style.borderColor = "#eef2f2";

        const isNegative = data.value < 0;
        const valorFormatado = `R$ ${data.value.toFixed(2).replace('.', ',')}`;

        const dataObj = new Date(data.date);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        const dataFormatadaStr = `${dia}/${mes}/${ano}`;

        const tipoDisplay = (data.type === "DESPESA" || isNegative) ? "DESPESA" : "RECEITA";
        const colorClass = isNegative ? 'text-danger' : 'text-success';

        const createCol = (text, extraClasses = "", labelMobile = "") => {
            const col = document.createElement('div');
            col.className = `col-12 col-md-2 d-flex justify-content-between justify-content-md-center align-items-center fw-bold text-truncate mb-2 mb-md-0 ${extraClasses}`.trim();

            if (labelMobile) {
                const labelElement = document.createElement('span');
                labelElement.className = "d-md-none text-muted fw-normal me-2"; 
                labelElement.textContent = labelMobile + ":";
                col.appendChild(labelElement);
            }

            const textElement = document.createElement('span');
            textElement.className = "text-truncate";
            textElement.textContent = text;
            col.appendChild(textElement);

            return col;
        };

        const colData = createCol(dataFormatadaStr, "", "Data");
        const colCat = createCol(data.category.categoryName, "fst-italic", "Categoria");
        const colTipo = createCol(tipoDisplay, "", "Tipo");
        const colValor = createCol(valorFormatado, colorClass, "Valor");
        const colDesc = createCol(data.desc || '-', "", "Descrição"); 

        const colActions = document.createElement('div');
        colActions.className = "col-12 col-md-2 d-flex justify-content-end justify-content-md-center gap-3 mt-2 mt-md-0";

        const editBtn = document.createElement('img');
        editBtn.src = "./assets/green-edit-icon.png";
        editBtn.style.width = "20px";
        editBtn.style.cursor = "pointer";
        editBtn.title = "Editar";

        const deleteBtn = document.createElement('img');
        deleteBtn.src = "./assets/green-delete-icon.png";
        deleteBtn.style.width = "20px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.title = "Excluir";

        colActions.append(editBtn, deleteBtn);
        row.append(colData, colCat, colTipo, colValor, colDesc, colActions);

        deleteBtn.addEventListener('click', () => {
            if (confirm(`Deseja realmente excluir a transação de ${valorFormatado}?`)) {
                try {
                    TransactionController.deleteTransaction(data.id);
                    this.renderList();
                } catch (e) {
                    alert("Erro ao excluir: " + e.message);
                }
            }
        });
        editBtn.addEventListener('click', (event) => {
            this.modal_trigger(event, data);
        });

        return row;
    }

    style(style_config) {
        this.main.className = "d-flex flex-column p-3 p-md-5 min-vh-100 w-100";
        this.main.style.backgroundColor = "#f8fafd";   
        this.header_wrapper.className = "d-flex flex-column flex-md-row justify-content-md-center align-items-center position-relative w-100 mb-2 mb-md-3 gap-3";
        this.title.className = "h2 fw-bold m-0";
        this.title.style.color = "#6ca09d";
        this.button.className = "btn text-white position-md-absolute end-0 px-4 py-2 shadow-sm rounded-3 fw-medium";
        this.button.style.backgroundColor = "#6ca09d";
        this.table_header_row.className = "d-none d-md-flex w-100 px-4 mb-3 row m-0";
        this.table_header_row.style.color = "#6ca09d";
        this.list_container.className = "d-flex flex-column gap-3 w-100";
    }

    build() {
        this.header_wrapper.append(this.title, this.button);
        this.main.append(this.header_wrapper, this.filter_container, this.table_header_row, this.list_container, this.pagination_container);
    }
}