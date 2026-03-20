import BaseComponent from "./components/baseComponent.js";

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

        this.transactions = (config.transactions || []).map(t => ({...t, temp_id: Math.random().toString(36).substr(2, 9)}));
        
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

        document.addEventListener('newTransaction', (event) => {
            const transacaoSalva = event.detail;

            const dataObjeto = new Date(transacaoSalva.date);
            const dia = String(dataObjeto.getDate()).padStart(2, '0');
            const mes = String(dataObjeto.getMonth() + 1).padStart(2, '0');
            const ano = dataObjeto.getFullYear();

            let nomeCategoria = "Sem Categoria";
            if (transacaoSalva.category && transacaoSalva.category.categoryName) {
                nomeCategoria = transacaoSalva.category.categoryName;
            } else if (typeof transacaoSalva.category === 'string') {
                nomeCategoria = transacaoSalva.category;
            }

            const transacaoFormatada = {
                data: `${dia}/${mes}/${ano}`,
                categoria: nomeCategoria,
                tipo: transacaoSalva.type,
                valor: Number(transacaoSalva.value), 
                desc: transacaoSalva.desc || "",
                temp_id: transacaoSalva.temp_id 
            };

            if (transacaoFormatada.temp_id) {

                const index = this.transactions.findIndex(t => t.temp_id === transacaoFormatada.temp_id);
                if (index > -1) {
                    this.transactions[index] = transacaoFormatada;
                }
            } else {

                transacaoFormatada.temp_id = Math.random().toString(36).substr(2, 9);
                this.transactions.unshift(transacaoFormatada);
            }

            this.renderList(); 
        });
    }

    renderList() {
        this.list_container.innerHTML = '';
        this.transactions.forEach(trans => {
            const row = this.createTransactionRow(trans);
            this.list_container.appendChild(row);
        });
    }

    setAddTransactionFunction(func) {
        this.openModalFunc = func; 
        

        this.button.onclick = () => {
            this.openModalFunc(null);
        };
    }

    createTransactionRow(data) {
        const row = document.createElement('div');
        row.className = 'transaction-row';

        const isNegative = data.valor < 0;
        const valorFormatado = `R$ ${data.valor.toFixed(2).replace('.', ',')}`;

        row.innerHTML = `
            <span style="flex: 1; text-align: center; font-weight: bold;">${data.data}</span>
            <span style="flex: 1; text-align: center; font-style: italic; font-weight: bold;">${data.categoria}</span>
            <span style="flex: 1; text-align: center; font-weight: bold;">${data.tipo}</span>
            <span style="flex: 1; text-align: center; color: ${isNegative ? '#e74c3c' : '#27ae60'}; font-weight: bold;">
                ${valorFormatado}
            </span>
            <span style="flex: 1; text-align: center; font-weight: bold;">${data.desc || ''}</span>
            <div style="flex: 1; display: flex; justify-content: center; gap: 10px;">
                <img src="./assets/gray-edit-icon.png" class="edit-btn" style="width: 20px; cursor: pointer;" title="Editar">
                <img src="./assets/gray-delete-icon.png" class="delete-btn" style="width: 20px; cursor: pointer;" title="Excluir">
            </div>
        `;

        this.styleRow(row);

        // --- BOTÃO EXCLUIR ---
        row.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm(`Deseja realmente excluir a transação de ${valorFormatado}?`)) {
                const index = this.transactions.indexOf(data);
                if (index > -1) {
                    this.transactions.splice(index, 1);
                    this.renderList();
                }
            }
        });

        // --- BOTÃO EDITAR ---
        row.querySelector('.edit-btn').addEventListener('click', () => {
            if (this.openModalFunc) {

                this.openModalFunc(data);
            }
        });

        return row;
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
}