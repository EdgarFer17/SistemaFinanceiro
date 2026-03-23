// Módulo 1: Gerenciamento de Transações
import BaseComponent from "./components/baseComponent.js";
import TransactionController from "../../controller/TransactionController.js";
import TRANSACTION_TYPE_MODEL from "../../model/TransactionTypeModel.js";
import CategoryController from "../../controller/categoryController.js";

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
        this.filter_container = document.createElement('div');
        this.list_container = document.createElement('section');       
        this.list_container.setAttribute('role', 'table');
        this.list_container.setAttribute('aria-label', 'Lista de transações');
        this.table_header_row = document.createElement('div');
        this.table_header_row.setAttribute('role', 'row'); 
        this.pagination_container = document.createElement('div');
    }

    // Configura título, colunas da tabela e carrega transações
    setup(config) {
        this.title.textContent = config['title'] || "Transações";
        this.button.textContent = config['button_title'] || "Adicionar Transação";

        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.filters = { search: "", period: "", category: "ALL", type: "ALL" };
        
        const HEADERS = ['Data', 'Categoria', 'Tipo', 'Valor', "Descrição", "Editar/Excluir"];
        HEADERS.forEach(text => {
            const SPAN = document.createElement('span');
            SPAN.textContent = text;
            SPAN.className = "col-2 text-center fw-bold"; 
            SPAN.setAttribute('role', 'columnheader');
            this.table_header_row.appendChild(SPAN);
        });

        this.buildFilterUI(); 
        this.renderList();

        this.setFunction('transaction_saved', ()=>{
            this.currentPage = 1;
            this.buildFilterUI(); 
            this.renderList()
        }, document);
    }

    // Desenha a barra com o campo de pesquisa e as opções de filtro.
    buildFilterUI() {
        this.filter_container.className = "w-100 px-3 px-md-4 mb-4";
        this.filter_container.replaceChildren(); 
        
        const ROW = document.createElement('div');
        ROW.className = "row g-3 align-items-center";

        // RF06: Campo de busca por texto com botão Buscar e Limpar
        const COL_SEARCH = document.createElement('div');
        COL_SEARCH.className = "col-12 col-md-4";

        const INPUT_GROUP = document.createElement('div');
        INPUT_GROUP.className = "input-group shadow-sm";

        const INPUT_SEARCH = document.createElement('input');
        INPUT_SEARCH.type = "text";
        INPUT_SEARCH.className = "form-control";
        INPUT_SEARCH.placeholder = "Buscar descrição...";
        INPUT_SEARCH.setAttribute('aria-label', 'Buscar transações por descrição');
        INPUT_SEARCH.style.borderColor = "#a4c4c1";
        INPUT_SEARCH.value = this.filters.search;

        const BUTTON_SEARCH = document.createElement('button');
        BUTTON_SEARCH.className = "btn text-white";
        BUTTON_SEARCH.type = "button";
        BUTTON_SEARCH.textContent = "Buscar";
        BUTTON_SEARCH.style.backgroundColor = "#6ca09d";
        BUTTON_SEARCH.style.borderColor = "#6ca09d";

        // Botão para resetar todos os filtros de uma vez
        const BUTTON_RESET = document.createElement('button');
        BUTTON_RESET.className = "btn btn-outline-secondary";
        BUTTON_RESET.type = "button";
        BUTTON_RESET.textContent = "Limpar";

        const executeSearch = () => {
            this.filters.search = INPUT_SEARCH.value.toLowerCase();
            this.currentPage = 1;
            this.renderList();
        };

        const resetAllFilters = () => {
            // Volta o objeto de filtros para o estado inicial
            this.filters = { search: "", period: "", category: "ALL", type: "ALL" };
            this.currentPage = 1;
            this.buildFilterUI(); // Re-renderiza os inputs para limparem visualmente
            this.renderList();
        };

        BUTTON_SEARCH.addEventListener('click', executeSearch);
        BUTTON_RESET.addEventListener('click', resetAllFilters);
        INPUT_SEARCH.addEventListener('keypress', (e) => { if (e.key === 'Enter') executeSearch(); });

        INPUT_GROUP.append(INPUT_SEARCH, BUTTON_SEARCH, BUTTON_RESET);
        COL_SEARCH.appendChild(INPUT_GROUP);

        // RF05: Filtro por Mês/Ano
        const COL_PERIOD = document.createElement('div');
        COL_PERIOD.className = "col-12 col-md-2";
        const INPUT_PERIOD = document.createElement('input');
        INPUT_PERIOD.type = "month";
        INPUT_PERIOD.className = "form-control shadow-sm text-secondary";
        INPUT_PERIOD.setAttribute('aria-label', 'Filtrar por mês e ano');
        INPUT_PERIOD.style.borderColor = "#a4c4c1";
        INPUT_PERIOD.value = this.filters.period;
        INPUT_PERIOD.addEventListener('change', (e) => {
            this.filters.period = e.target.value;
            this.currentPage = 1;
            this.renderList();
        });
        COL_PERIOD.appendChild(INPUT_PERIOD);

        // RF05: Filtro por Categoria
        const COL_CATEGORY = document.createElement('div');
        COL_CATEGORY.className = "col-12 col-md-3";
        const SELECT_CATEGORY = document.createElement('select');
        SELECT_CATEGORY.className = "form-select shadow-sm text-secondary";
        SELECT_CATEGORY.setAttribute('aria-label', 'Filtrar por categoria'); 
        SELECT_CATEGORY.style.borderColor = "#a4c4c1";
        
        const OPTION_CAT_ALL = document.createElement('option');
        OPTION_CAT_ALL.value = "ALL";
        OPTION_CAT_ALL.textContent = "Todas as Categorias";
        SELECT_CATEGORY.appendChild(OPTION_CAT_ALL);

        CategoryController.getCategories().forEach(cat => {
            const OPT = document.createElement('option');
            OPT.value = cat.categoryName;
            OPT.textContent = cat.categoryName;
            SELECT_CATEGORY.appendChild(OPT);
        });
        
        SELECT_CATEGORY.value = this.filters.category;
        SELECT_CATEGORY.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.currentPage = 1;
            this.renderList();
        });
        COL_CATEGORY.appendChild(SELECT_CATEGORY);

        // RF05: Filtro por Tipo (Receita/Despesa)
        const COL_TYPE = document.createElement('div');
        COL_TYPE.className = "col-12 col-md-3";
        const SELECT_TYPE = document.createElement('select');
        SELECT_TYPE.className = "form-select shadow-sm text-secondary";
        SELECT_TYPE.setAttribute('aria-label', 'Filtrar por tipo de transação');
        SELECT_TYPE.style.borderColor = "#a4c4c1";

        const OPTIONS = [
            {v: "ALL", t: "Todos os Tipos"},
            {v: "RECEITA", t: "Apenas Entradas"},
            {v: "DESPESA", t: "Apenas Saídas"}
        ];

        OPTIONS.forEach(opt => {
            const OPT = document.createElement('option');
            OPT.value = opt.v;
            OPT.textContent = opt.t;
            SELECT_TYPE.appendChild(OPT);
        });

        SELECT_TYPE.value = this.filters.type;
        SELECT_TYPE.addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.currentPage = 1;
            this.renderList();
        });
        COL_TYPE.appendChild(SELECT_TYPE);

        ROW.append(COL_SEARCH, COL_PERIOD, COL_CATEGORY, COL_TYPE);
        this.filter_container.appendChild(ROW);
    }

    // Pega as transações, aplica todos os filtros, recorta só as da página atual e joga na tela.
    renderList() {
        this.list_container.replaceChildren(); 
        this.pagination_container.replaceChildren();

        let transacoes_do_banco = [];
        try {
            transacoes_do_banco = TransactionController.getTransactions() || [];
        } catch (e) {
            console.error("Erro ao buscar transações:", e);
        }

        // RF02: Inverte a lista para mostrar as mais novas primeiro.
        transacoes_do_banco.reverse();

        // RF05 / RF06: Passa a lista por todos os filtros. Se a transação não bater com a busca, ela fica de fora.
        transacoes_do_banco = transacoes_do_banco.filter(t => {
            if (this.filters.type === 'RECEITA' && t.value < 0) return false;
            if (this.filters.type === 'DESPESA' && t.value >= 0) return false;
            if (this.filters.category !== 'ALL' && t.category.categoryName !== this.filters.category) return false;

            if (this.filters.period) {
                // Ajusta a data do banco pra comparar certinho com o que veio do filtro de mês.
                const DATA_OBJECT = new Date(t.date);
                const YEAR = DATA_OBJECT.getFullYear();
                const MONTH = String(DATA_OBJECT.getMonth() + 1).padStart(2, '0');
                if (`${YEAR}-${MONTH}` !== this.filters.period) return false;
            }

            if (this.filters.search.trim() !== "") {
                const DESC = (t.desc || "").toLowerCase();
                if (!DESC.includes(this.filters.search)) return false;
            }
            return true;
        });

        const TOTAL_ITEMS = transacoes_do_banco.length;
        const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / this.itemsPerPage);

        if (this.currentPage > TOTAL_PAGES && TOTAL_PAGES > 0) {
            this.currentPage = TOTAL_PAGES;
        }

        const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
        const END_INDEX = START_INDEX + this.itemsPerPage;
        const PAGE_TRANSACTIONS = transacoes_do_banco.slice(START_INDEX, END_INDEX);

        if (PAGE_TRANSACTIONS.length === 0) {
            const EMPTY_MESSAGE = document.createElement('div');
            EMPTY_MESSAGE.className = "text-center text-muted p-5 w-100 fw-bold border bg-white rounded-3 shadow-sm";
            EMPTY_MESSAGE.textContent = "Nenhuma transação encontrada para este filtro.";
            EMPTY_MESSAGE.setAttribute('role', 'alert'); 
            
            this.list_container.appendChild(EMPTY_MESSAGE);
            return;
        }

        PAGE_TRANSACTIONS.forEach(trans => {
            const ROW = this.createTransactionRow(trans);
            this.list_container.appendChild(ROW);
        });

        if (TOTAL_PAGES > 1) {
            this.renderPagination(TOTAL_PAGES);
        }
    }

    // Desenha os botões de Anterior e Próxima, e controla a mudança de página.
    renderPagination(totalPages) {
        this.pagination_container.className = "d-flex justify-content-center align-items-center gap-3 my-4 flex-column flex-md-row";
        this.pagination_container.setAttribute('aria-label', 'Paginação de transações'); 

        const PREV_BUTTON = document.createElement('button');
        PREV_BUTTON.textContent = "Anterior";
        PREV_BUTTON.className = `btn text-white shadow-sm ${this.currentPage === 1 ? 'disabled' : ''}`;
        PREV_BUTTON.style.backgroundColor = this.currentPage === 1 ? "#ccc" : "#6ca09d";
        
        if (this.currentPage === 1) PREV_BUTTON.setAttribute('aria-disabled', 'true');

        this.setFunction('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderList();
            }
        }, PREV_BUTTON)

        const INFO_TEXT = document.createElement('span');
        INFO_TEXT.textContent = `Página ${this.currentPage} de ${totalPages}`;
        INFO_TEXT.className = "fw-bold";
        INFO_TEXT.style.color = "#6ca09d";
        INFO_TEXT.setAttribute('aria-current', 'page');

        const NEXT_BUTTON = document.createElement('button');
        NEXT_BUTTON.textContent = "Próxima";
        NEXT_BUTTON.className = `btn text-white shadow-sm ${this.currentPage === totalPages ? 'disabled' : ''}`;
        NEXT_BUTTON.style.backgroundColor = this.currentPage === totalPages ? "#ccc" : "#6ca09d";
        if (this.currentPage === totalPages) NEXT_BUTTON.setAttribute('aria-disabled', 'true');

        this.setFunction('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderList();
            }
        }, NEXT_BUTTON)

        this.pagination_container.append(PREV_BUTTON, INFO_TEXT, NEXT_BUTTON);
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
        ROW.setAttribute('role', 'row'); 

        const IS_NEGATIVE = data.value < 0;
        const VALOR_FORMATADO = `R$ ${data.value.toFixed(2).replace('.', ',')}`;

        const DATA_OBJECT = new Date(data.date);
        const DATA_FORMATADA = DATA_OBJECT.toLocaleDateString('pt-BR');

        const TYPE = (data.type === "DESPESA" || IS_NEGATIVE) ? "DESPESA" : "RECEITA";
        const COLOR_CLASS = IS_NEGATIVE ? 'text-danger' : 'text-success';

        const createCol = (text, extraClasses = "", labelMobile = "") => {
            const COL = document.createElement('div');
            COL.className = `col-12 col-md-2 d-flex justify-content-between justify-content-md-center align-items-center fw-bold text-truncate mb-2 mb-md-0 ${extraClasses}`.trim();
            COL.setAttribute('role', 'cell');

            if (labelMobile) {
                const LABEL = document.createElement('span');
                LABEL.className = "d-md-none text-muted fw-normal me-2"; 
                LABEL.setAttribute('aria-hidden', 'true'); 
                LABEL.textContent = labelMobile + ":";
                COL.appendChild(LABEL);
            }

            const TEXT = document.createElement('span');
            TEXT.className = "text-truncate";
            TEXT.textContent = text;
            COL.appendChild(TEXT);

            return COL;
        };

        const COL_DATA = createCol(DATA_FORMATADA, "", "Data");
        const COL_CAT = createCol(data.category.categoryName, "fst-italic", "Categoria");
        const COL_TYPE = createCol(TYPE, "", "Tipo");
        const COL_VALUE = createCol(VALOR_FORMATADO, COLOR_CLASS, "Valor");
        const COL_DESC = createCol(data.desc || '-', "", "Descrição"); 

        const COL_ACTIONS = document.createElement('div');
        COL_ACTIONS.className = "col-12 col-md-2 d-flex justify-content-end justify-content-md-center gap-3 mt-2 mt-md-0";
        COL_ACTIONS.setAttribute('role', 'cell');

        const EDIT_BUTTON = document.createElement('button');
        EDIT_BUTTON.className = "btn p-0 border-0 bg-transparent";
        EDIT_BUTTON.setAttribute('aria-label', `Editar transação de ${VALOR_FORMATADO}`);
        
        const EDIT_ICON = document.createElement('img');
        EDIT_ICON.src = "./assets/green-edit-icon.png";
        EDIT_ICON.style.width = "20px";
        EDIT_ICON.alt = ""; 
        EDIT_BUTTON.appendChild(EDIT_ICON);

        const DELETE_BUTTON = document.createElement('button');
        DELETE_BUTTON.className = "btn p-0 border-0 bg-transparent";
        DELETE_BUTTON.setAttribute('aria-label', `Excluir transação de ${VALOR_FORMATADO}`);
        
        const DELETE_ICON = document.createElement('img');
        DELETE_ICON.src = "./assets/green-delete-icon.png";
        DELETE_ICON.style.width = "20px";
        DELETE_ICON.alt = "";
        DELETE_BUTTON.appendChild(DELETE_ICON);

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
        }, DELETE_BUTTON)

        // --- BOTÃO EDITAR ---
        this.setFunction('click', (event) => {
            this.modal_trigger(event, data);
        }, EDIT_BUTTON)

        return ROW;
    }

    // Aplica o visual da tela usando as classes do Bootstrap.
    style(style_config) {
        this.main.className = "d-flex flex-column p-1 p-sm-3 p-md-5 min-vh-100 w-100";
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