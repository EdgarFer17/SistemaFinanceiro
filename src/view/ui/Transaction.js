// Módulo 1: Gerenciamento de Transações
import BaseComponent from "./components/baseComponent.js";
import TransactionController from "../../controller/TransactionController.js";
import CategoryController from "../../controller/categoryController.js"; 

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


    setup(config) {
        this.title.textContent = config['title'] || "Transações";
        this.button.textContent = config['button_title'] || "Adicionar Transação";

        this.currentPage = 1;
        this.itemsPerPage = 10;
        
        // Guarda o que o usuário escolheu nos filtros. 
        // 'ALL' significa que não está filtrando por aquilo.
        this.filters = { search: "", period: "", category: "ALL", type: "ALL" };

        const headers = ['Data', 'Categoria', 'Tipo', 'Valor', "Descrição", "Editar/Excluir"];
        headers.forEach(text => {
            const span = document.createElement('span');
            span.textContent = text;
            span.className = "col-2 text-center fw-bold"; 
            span.setAttribute('role', 'columnheader');
            this.table_header_row.appendChild(span);
        });

        this.buildFilterUI(); 
        this.renderList();

        // Salva transações
        document.addEventListener('transactionSaved', () => {
            this.currentPage = 1;
            this.buildFilterUI(); 
            this.renderList(); 
        });
    }

    // Desenha a barra com o campo de pesquisa e as opções de filtro.
    buildFilterUI() {
        this.filter_container.className = "w-100 px-3 px-md-4 mb-4";
        this.filter_container.replaceChildren(); 
        
        const row = document.createElement('div');
        row.className = "row g-3 align-items-center";

        // RF06: Campo de busca por texto com botão Buscar e Limpar
        const colSearch = document.createElement('div');
        colSearch.className = "col-12 col-md-4";

        const inputGroup = document.createElement('div');
        inputGroup.className = "input-group shadow-sm";

        const inputSearch = document.createElement('input');
        inputSearch.type = "text";
        inputSearch.className = "form-control";
        inputSearch.placeholder = "Buscar descrição...";
        inputSearch.setAttribute('aria-label', 'Buscar transações por descrição');
        inputSearch.style.borderColor = "#a4c4c1";
        inputSearch.value = this.filters.search;

        const btnSearch = document.createElement('button');
        btnSearch.className = "btn text-white";
        btnSearch.type = "button";
        btnSearch.textContent = "Buscar";
        btnSearch.style.backgroundColor = "#6ca09d";
        btnSearch.style.borderColor = "#6ca09d";

        // Botão para resetar todos os filtros de uma vez
        const btnReset = document.createElement('button');
        btnReset.className = "btn btn-outline-secondary";
        btnReset.type = "button";
        btnReset.textContent = "Limpar";

        const executeSearch = () => {
            this.filters.search = inputSearch.value.toLowerCase();
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

        btnSearch.addEventListener('click', executeSearch);
        btnReset.addEventListener('click', resetAllFilters);
        inputSearch.addEventListener('keypress', (e) => { if (e.key === 'Enter') executeSearch(); });

        inputGroup.append(inputSearch, btnSearch, btnReset);
        colSearch.appendChild(inputGroup);

        // RF05: Filtro por Mês/Ano
        const colPeriod = document.createElement('div');
        colPeriod.className = "col-12 col-md-2";
        const inputPeriod = document.createElement('input');
        inputPeriod.type = "month";
        inputPeriod.className = "form-control shadow-sm text-secondary";
        inputPeriod.setAttribute('aria-label', 'Filtrar por mês e ano');
        inputPeriod.style.borderColor = "#a4c4c1";
        inputPeriod.value = this.filters.period;
        inputPeriod.addEventListener('change', (e) => {
            this.filters.period = e.target.value;
            this.currentPage = 1;
            this.renderList();
        });
        colPeriod.appendChild(inputPeriod);

        // RF05: Filtro por Categoria
        const colCategory = document.createElement('div');
        colCategory.className = "col-12 col-md-3";
        const selectCategory = document.createElement('select');
        selectCategory.className = "form-select shadow-sm text-secondary";
        selectCategory.setAttribute('aria-label', 'Filtrar por categoria'); 
        selectCategory.style.borderColor = "#a4c4c1";
        
        const optionCatAll = document.createElement('option');
        optionCatAll.value = "ALL";
        optionCatAll.textContent = "Todas as Categorias";
        selectCategory.appendChild(optionCatAll);

        CategoryController.getCategories().forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.categoryName;
            opt.textContent = cat.categoryName;
            selectCategory.appendChild(opt);
        });
        
        selectCategory.value = this.filters.category;
        selectCategory.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.currentPage = 1;
            this.renderList();
        });
        colCategory.appendChild(selectCategory);

        // RF05: Filtro por Tipo (Receita/Despesa)
        const colType = document.createElement('div');
        colType.className = "col-12 col-md-3";
        const selectType = document.createElement('select');
        selectType.className = "form-select shadow-sm text-secondary";
        selectType.setAttribute('aria-label', 'Filtrar por tipo de transação');
        selectType.style.borderColor = "#a4c4c1";

        const options = [
            {v: "ALL", t: "Todos os Tipos"},
            {v: "RECEITA", t: "Apenas Entradas"},
            {v: "DESPESA", t: "Apenas Saídas"}
        ];

        options.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.v;
            o.textContent = opt.t;
            selectType.appendChild(o);
        });

        selectType.value = this.filters.type;
        selectType.addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.currentPage = 1;
            this.renderList();
        });
        colType.appendChild(selectType);

        row.append(colSearch, colPeriod, colCategory, colType);
        this.filter_container.appendChild(row);
    }

    // Pega as transações, aplica todos os filtros, recorta só as da página atual e joga na tela.
    renderList() {
        this.list_container.replaceChildren(); 
        this.pagination_container.replaceChildren();

        let transacoesDoBanco = [];
        try {
            transacoesDoBanco = TransactionController.getTransactions() || [];
        } catch (e) {
            console.error("Erro ao buscar transações:", e);
        }

        // RF02: Inverte a lista para mostrar as mais novas primeiro.
        transacoesDoBanco.reverse();

        // RF05 / RF06: Passa a lista por todos os filtros. Se a transação não bater com a busca, ela fica de fora.
        transacoesDoBanco = transacoesDoBanco.filter(t => {
            if (this.filters.type === 'RECEITA' && t.value < 0) return false;
            if (this.filters.type === 'DESPESA' && t.value >= 0) return false;
            if (this.filters.category !== 'ALL' && t.category.categoryName !== this.filters.category) return false;

            if (this.filters.period) {
                // Ajusta a data do banco pra comparar certinho com o que veio do filtro de mês.
                const dataObj = new Date(t.date);
                const year = dataObj.getFullYear();
                const month = String(dataObj.getMonth() + 1).padStart(2, '0');
                if (`${year}-${month}` !== this.filters.period) return false;
            }

            if (this.filters.search.trim() !== "") {
                const desc = (t.desc || "").toLowerCase();
                if (!desc.includes(this.filters.search)) return false;
            }
            return true;
        });

        const totalItems = transacoesDoBanco.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);

        // Se o usuário apagar o último item da página 3, joga ele de volta pra página 2 pra tela não ficar em branco.
        if (this.currentPage > totalPages && totalPages > 0) {
            this.currentPage = totalPages;
        }

        // Corta a lista para pegar apenas os 10 itens da página.
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const transacoesDaPagina = transacoesDoBanco.slice(startIndex, endIndex);

        if (transacoesDaPagina.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = "text-center text-muted p-5 w-100 fw-bold border bg-white rounded-3 shadow-sm";
            emptyMessage.textContent = "Nenhuma transação encontrada com esses filtros.";
            emptyMessage.setAttribute('role', 'alert'); 
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

    // Desenha os botões de Anterior e Próxima, e controla a mudança de página.
    renderPagination(totalPages) {
        this.pagination_container.className = "d-flex justify-content-center align-items-center gap-3 my-4 flex-wrap";
        this.pagination_container.setAttribute('aria-label', 'Paginação de transações'); 

        const btnPrev = document.createElement('button');
        btnPrev.textContent = "Anterior";
        btnPrev.className = `btn text-white shadow-sm ${this.currentPage === 1 ? 'disabled' : ''}`;
        btnPrev.style.backgroundColor = this.currentPage === 1 ? "#ccc" : "#6ca09d";

        if (this.currentPage === 1) btnPrev.setAttribute('aria-disabled', 'true'); 
        
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
        infoText.setAttribute('aria-current', 'page');

        const btnNext = document.createElement('button');
        btnNext.textContent = "Próxima";
        btnNext.className = `btn text-white shadow-sm ${this.currentPage === totalPages ? 'disabled' : ''}`;
        btnNext.style.backgroundColor = this.currentPage === totalPages ? "#ccc" : "#6ca09d";
        if (this.currentPage === totalPages) btnNext.setAttribute('aria-disabled', 'true');

        btnNext.onclick = () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderList();
            }
        };

        this.pagination_container.append(btnPrev, infoText, btnNext);
    }

    // Recebe do Controller a função que sabe abrir o Modal.
    setModal(_function) {
        const SIGNAL = this.controller.signal;
        this.modal_trigger = _function;
        this.button.addEventListener("click", _function, { SIGNAL });
    }

    // Cria a linha da tabela para uma transação específica.
    createTransactionRow(data) {
        const row = document.createElement('div');
        row.className = 'row align-items-center px-4 py-3 bg-white rounded-3 shadow-sm border w-100 m-0 transaction-row';
        row.style.borderColor = "#eef2f2";
        row.setAttribute('role', 'row'); 

        const isNegative = data.value < 0;
        const valorFormatado = `R$ ${data.value.toFixed(2).replace('.', ',')}`;

        // Força a data para UTC evita bug do JavaScript de mostrar um dia a menos por causa do fuso horário.
        const dataObj = new Date(data.date);
        const dataFormatadaStr = dataObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        // Descobre se é receita ou despesa olhando para o sinal do valor (negativo ou positivo), que é mais seguro.
        const tipoDisplay = (data.type === "DESPESA" || isNegative) ? "DESPESA" : "RECEITA";
        const colorClass = isNegative ? 'text-danger' : 'text-success';

        const createCol = (text, extraClasses = "", labelMobile = "") => {
            const col = document.createElement('div');
            col.className = `col-12 col-md-2 d-flex justify-content-between justify-content-md-center align-items-center fw-bold text-truncate mb-2 mb-md-0 ${extraClasses}`.trim();
            col.setAttribute('role', 'cell');

            if (labelMobile) {
                const labelElement = document.createElement('span');
                labelElement.className = "d-md-none text-muted fw-normal me-2"; 
                labelElement.setAttribute('aria-hidden', 'true'); 
                labelElement.textContent = labelMobile + ":";
                col.appendChild(labelElement);
            }

            const textElement = document.createElement('span');
            textElement.className = "text-truncate";
            textElement.textContent = text;
            col.appendChild(textElement);

            return col;
        };

        // RF01: Coloca os dados da transação (data, valor, etc) nas colunas da tela.
        const colData = createCol(dataFormatadaStr, "", "Data");
        const colCat = createCol(data.category.categoryName, "fst-italic", "Categoria");
        const colTipo = createCol(tipoDisplay, "", "Tipo");
        const colValor = createCol(valorFormatado, colorClass, "Valor");
        const colDesc = createCol(data.desc || '-', "", "Descrição"); 

        const colActions = document.createElement('div');
        colActions.className = "col-12 col-md-2 d-flex justify-content-end justify-content-md-center gap-3 mt-2 mt-md-0";
        colActions.setAttribute('role', 'cell');

        const editBtn = document.createElement('button');
        editBtn.className = "btn p-0 border-0 bg-transparent";
        editBtn.setAttribute('aria-label', `Editar transação de ${valorFormatado}`);
        
        const editIcon = document.createElement('img');
        editIcon.src = "./assets/green-edit-icon.png";
        editIcon.style.width = "20px";
        editIcon.alt = ""; 
        editBtn.appendChild(editIcon);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = "btn p-0 border-0 bg-transparent";
        deleteBtn.setAttribute('aria-label', `Excluir transação de ${valorFormatado}`);
        
        const deleteIcon = document.createElement('img');
        deleteIcon.src = "./assets/green-delete-icon.png";
        deleteIcon.style.width = "20px";
        deleteIcon.alt = "";
        deleteBtn.appendChild(deleteIcon);

        colActions.append(editBtn, deleteBtn);
        row.append(colData, colCat, colTipo, colValor, colDesc, colActions);

        // RF04: Confirmação antes do delete
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

        // RF03: Quando clicar em editar, manda os dados dessa linha lá pro Modal preencher os campos.
        editBtn.addEventListener('click', (event) => {
            this.modal_trigger(event, data);
        });

        return row;
    }

    // Aplica o visual da tela usando as classes do Bootstrap.
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

    // Junta todas as partes que criamos separadas (cabeçalho, filtros, lista) e coloca na tela de fato.
    build() {
        this.header_wrapper.append(this.title, this.button);
        this.main.append(this.header_wrapper, this.filter_container, this.table_header_row, this.list_container, this.pagination_container);
    }
}