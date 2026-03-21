import BaseComponent from "./components/baseComponent.js";
import TransactionController from "../../controller/TransactionController.js";

// Página de gestão de transações (CRUD)
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

    // Configura título, colunas da tabela e carrega transações
    setup(config) {
        this.title.textContent = config['title'] || "Transações";
        this.button.textContent = config['button_title'] || "Adicionar Transação";

        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentFilter = "ALL"; // NOVO: Estado inicial do filtro
        
        const HEADERS = ['Data', 'Categoria', 'Tipo', 'Valor', "Descrição", "Editar/Excluir"];
        HEADERS.forEach(text => {
            const SPAN = document.createElement('span');
            SPAN.textContent = text;
            SPAN.className = "col-2 text-center fw-bold"; 
            this.table_header_row.appendChild(SPAN);
        });

        this.buildFilterUI(); // Desenha o filtro na tela
        this.renderList();

        this.setFunction('transaction_saved', ()=>{
            this.currentPage = 1;
            this.renderList()
        }, document);
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

    // Registra função para abrir modal de transação
    setModal(_function) {
        this.modal_trigger = _function;
        this.setFunction('click', ()=>{_function()}, this.button);
    }

    // Cria linha de tabela com dados da transação e botões edit/delete
    createTransactionRow(data) {
        const ROW = document.createElement('div');
        ROW.className = 'row align-items-center px-4 py-3 bg-white rounded-3 shadow-sm border w-100 m-0 transaction-row';
        ROW.className = 'transaction-row';

        const IS_NEGATIVE = data.value < 0;
        const VALOR_FORMATADO = `R$ ${data.value.toFixed(2).replace('.', ',')}`;

        const DATA_OBJECT = new Date(data.date);
        const DATAFORMATADA = DATA_OBJECT.toLocaleDateString('pt-BR');

        const TYPE = (data.type === "DESPESA" || IS_NEGATIVE) ? "DESPESA" : "RECEITA";
        const COLOR_CLASS = IS_NEGATIVE ? 'text-danger' : 'text-success';

        const createCol = (text, extraClasses = "", labelMobile = "") => {
            const COL = document.createElement('div');
            COL.className = `col-12 col-md-2 d-flex justify-content-between justify-content-md-center align-items-center fw-bold text-truncate mb-2 mb-md-0 ${extraClasses}`.trim();

            if (labelMobile) {
                const LABEL = document.createElement('span');
                LABEL.className = "d-md-none text-muted fw-normal me-2"; 
                LABEL.textContent = labelMobile + ":";
                COL.appendChild(LABEL);
            }

            const TEXT = document.createElement('span');
            TEXT.className = "text-truncate";
            TEXT.textContent = text;
            COL.appendChild(TEXT);

            return COL;
        };

        const COL_DATA = createCol(DATAFORMATADA, "", "Data");
        const COL_CAT = createCol(data.category.categoryName, "fst-italic", "Categoria");
        const COL_TYPE = createCol(TYPE, "", "Tipo");
        const COL_VALUE = createCol(VALOR_FORMATADO, COLOR_CLASS, "Valor");
        const COL_DESC = createCol(data.desc || '-', "", "Descrição"); 

        const COL_ACTIONS = document.createElement('div');
        COL_ACTIONS.className = "col-12 col-md-2 d-flex justify-content-end justify-content-md-center gap-3 mt-2 mt-md-0";

        const EDIT_BUTTON = document.createElement('img');
        EDIT_BUTTON.src = "./assets/green-edit-icon.png";
        EDIT_BUTTON.style.width = "20px";
        EDIT_BUTTON.style.cursor = "pointer";
        EDIT_BUTTON.title = "Editar";

        const DELETE_BUTTON = document.createElement('img');
        DELETE_BUTTON.src = "./assets/green-delete-icon.png";
        DELETE_BUTTON.style.width = "20px";
        DELETE_BUTTON.style.cursor = "pointer";
        DELETE_BUTTON.title = "Excluir";

        COL_ACTIONS.append(EDIT_BUTTON, DELETE_BUTTON);
        ROW.append(COL_DATA, COL_CAT, COL_TYPE, COL_VALUE, COL_DESC, COL_ACTIONS);

        // --- BOTÃO EXCLUIR ---
        this.setFunction('click', () => {
            if (confirm(`Deseja realmente excluir a transação de ${VALOR_FORMATADO}?`)) {
                try {
                    TransactionController.deleteTransaction(data.id);
                    this.renderList();
                } catch (e) {
                    alert("Erro ao excluir: " + e.message);
                }
            }
        }, ROW.querySelector('.delete-btn'))

        // --- BOTÃO EDITAR ---
        this.setFunction('click', (event) => {
            this.modal_trigger(event, data);
        }, ROW.querySelector('.edit-btn'))

        return ROW;
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

    // Monta layout: header + colunas + container de linhas
    build() {
        this.header_wrapper.append(this.title, this.button);
        this.main.append(this.header_wrapper, this.filter_container, this.table_header_row, this.list_container, this.pagination_container);
    }

    // Sanitiza HTML para prevenir XSS em descrições de transações
    sanitizeHtml(_text) {
        const P = document.createElement("p");
        P.textContent = _text;
        return P.innerHTML;
    }
}