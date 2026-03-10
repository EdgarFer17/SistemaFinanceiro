import BaseComponent from "./components/baseComponent.js";
//Transação
export default class Transaction extends BaseComponent{
    constructor(config, style_config) {
        super(config, style_config);
    }
    
    spawn(){
        this.main = document.createElement('main')
        this.transactionList = []
        this.header_wrapper = document.createElement('div')
        this.title = document.createElement('h1')
        this.csvButton = document.createElement('a')
        this.button =  document.createElement('button')
        this.cards_container = document.createElement('section')
        this.table_header = document.createElement('table')
        this.thead_table = document.createElement('thead')
        this.tr_table = document.createElement('tr')
        this.modalTransaction = document.createElement('div')
        this.tbody_table = document.createElement('tbody')
        this.editButton = document.createElement('button')

    }
    setup(config){
        this.title.textContent = config['title'] || "Transações"
        this.csvButton.innerHTML = '<img src="./assets/csv.png" alt="CSV">';
        this.csvButton.addEventListener('click', () => {
            alert("Função de exportação CSV ainda não implementada!");
        });
        this.button.textContent = config['button_title'] || "Adicionar Transação"
        this.table_header.textContent = ""
        const headers = ['Data', 'Categoria', 'Tipo', 'Valor']
        headers.forEach(header => {
            const th = document.createElement('th')
            th.textContent = header
            this.tr_table.appendChild(th)
        })
<<<<<<< HEAD
        this.button.addEventListener ('click', () => this.modalTransactionEvent())
        this.editButton.addEventListener('click', () => this.modalEditTransactionEvent())
=======
    
        
        
>>>>>>> d6c26c8 (Atualização do Transaction.js)
    }


    

    modalTransactionEvent(){
        this.modalTransaction.innerHTML = `
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered"> 
                    <div class="modal-content" style="padding: 20px; border-radius: 15px;">
                        <div class="modal-header" style="border: none;">
                            <h2 class="modal-title" style="color: #6ca09d; font-weight: bold;">Fazer Transação</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label" style="color: #6ca09d; font-size: 1.2rem;">Valor</label>
                                <input type="number" class="form-control" id="transactionValue" placeholder="Digite o valor">
                            </div>

                            <div class="mb-3">
                                <label class="form-label" style="color: #6ca09d; font-size: 1.2rem;">Tipo</label>
                                <select class="form-select" id="transactionType">
                                    <option value="" disabled selected>Selecione o tipo</option>
                                    <option value="Entrada">Entrada</option>
                                    <option value="Saída">Saída</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" style="color: #6ca09d; font-size: 1.2rem;">Categoria</label>
                                <select class="form-select" id="transactionCategory">
                                    <option value="" disabled selected>Selecione a categoria</option>
                                    <option value="Alimentação">Alimentação</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Lazer">Lazer</option>
                                </select>
                            </div>

                            <button id="btnSave" class="btn w-100 mt-4" style="background-color: #6ca09d; color: white; padding: 12px; font-size: 1.1rem;">
                                Adicionar Transação
                            </button>
                        </div>
                    </div>
                </div>
            </div>`

            const modalEl = this.modalTransaction.querySelector('#exampleModal');
            const modalBootstrap = new bootstrap.Modal(modalEl);
            modalBootstrap.show();
            const btnSave = this.modalTransaction.querySelector('#btnSave');
            btnSave.addEventListener('click', () => {

                const valueEl = this.modalTransaction.querySelector('#transactionValue');
                const typeEl = this.modalTransaction.querySelector('#transactionType');
                const categoryEl = this.modalTransaction.querySelector('#transactionCategory');


                const val = valueEl.value;
                const type = typeEl.value;
                const cat = categoryEl.value;


                if(!val || !type || !cat) {
                    alert("Preencha todos os campos!");
                    return;
                }

  
                const newTransaction = {
                    description: cat,
                    value: type === "Saída" ? `- R$ ${val}` : `R$ ${val}`,
                    category: cat,
                    date: new Date().toLocaleDateString('pt-BR')
                };

                this.TransactionListUpdate(newTransaction);
                modalBootstrap.hide();
            });
        }






    modalEditTransactionEvent(transaction, index){
        this.modalTransaction.innerHTML = `
            <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered"> 
                    <div class="modal-content" style="padding: 20px; border-radius: 15px;">
                        <div class="modal-header" style="border: none;">
                            <h2 class="modal-title" style="color: #6ca09d; font-weight: bold;">Editar Transação</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> 
                        <div class="modal-body>
                            <div class="mb-3">
                                <label class="form-label" style="color: #6ca09d; font-size: 1.2rem;">Valor</label>
                                <input type="number" class="form-control" id="editTransactionValue" value="${transaction.value.replace(/[^0-9.-]+/g,"")}" placeholder="Digite o valor">
                            </div>
                            <div class="mb-3">
                                <label class="form-label
                                " style="color: #6ca09d; font-size: 1.2rem;">Tipo</label>
                                <select class="form-select" id="editTransactionType">
                                    <option value="" disabled>Selecione o tipo</option>
                                    <option value="Entrada" ${!transaction.value.includes('-') ? 'selected' : ''}>Entrada</option>
                                    <option value="Saída" ${transaction.value.includes('-') ? 'selected' : ''}>Saída</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" style="color: #6ca09d; font-size: 1.2rem;">Categoria</label>
                                <select class="form-select" id="editTransactionCategory">
                                    <option value="" disabled>Selecione a categoria</option>
                                    <option value="Alimentação" ${transaction.category === "Alimentação" ? 'selected' : ''}>Alimentação</option>
                                    <option value="Transporte" ${transaction.category === "Transporte" ? 'selected' : ''}>Transporte</option>
                                    <option value="Lazer" ${transaction.category === "Lazer" ? 'selected' : ''}>Lazer</option>
                                </select>
                            </div>
                            <button id="btnSaveEdit" class="btn w-100 mt-4" style="background-color: #6ca09d; color: white; padding: 12px; font-size: 1.1rem;">
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
            const modalEl = this.modalTransaction.querySelector('#editModal');
            const modalBootstrap = new bootstrap.Modal(modalEl);
            modalBootstrap.show();
            const btnSaveEdit = this.modalTransaction.querySelector('#btnSaveEdit');
            btnSaveEdit.addEventListener('click', () => {

                const valueEl = this.modalTransaction.querySelector('#editTransactionValue');
                const typeEl = this.modalTransaction.querySelector('#editTransactionType');
                const categoryEl = this.modalTransaction.querySelector('#editTransactionCategory');
                const val = valueEl.value;
                const type = typeEl.value;
                const cat = categoryEl.value;

                if(!val || !type || !cat) {
                    alert("Preencha todos os campos!");
                    return;
                }
                const updatedTransaction = {
                    description: cat,
                    value: type === "Saída" ? `- R$ ${val}` : `R$ ${val}`,
                    category: cat,
                    date: transaction.date
                };
                this.transactionList[index] = updatedTransaction;
                this.TransactionListUpdate();
                modalBootstrap.hide();
            });
        };

    

    
    

    TransactionListUpdate(transaction){
        if (transaction) {
            this.transactionList.push(transaction);
        }

        this.tbody_table.innerHTML = "";

        this.transactionList.forEach((item, index) => { 
            const tr = document.createElement('tr');
            
            tr.style.backgroundColor = "white";
            tr.style.borderRadius = "10px";
            tr.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            
            const color = item.value.includes('-') ? "#e74c3c" : "#2ecc71";
            
            tr.innerHTML = `
                <td style="padding: 20px; border-radius: 10px 0 0 10px; font-weight: bold; font-size: 24px; color: #000000;">${item.date}</td>
                <td style="padding: 20px; font-style: italic; font-weight: bold; font-size: 24px; color: #000000;">${item.description}</td>
                <td style="padding: 20px; font-weight: bold; color: #000000; text-transform: uppercase; font-size: 24px;">${item.value.includes('-') ? 'Despesa' : 'Entrada'}</td>
                <td style="padding: 20px; font-weight: bold; font-size: 24px; color: ${color}">${item.value}</td>
                <td style="padding: 20px; border-radius: 0 10px 10px 0; text-align: right;">
                    <button class="edit-btn" style="background:none; border:none; cursor:pointer; margin-right: 10px;"><img src="./assets/green-edit-icon.png" alt="Edit" style="width: 30px; height: 30px;"></button>
                    <button class="delete-btn" style="background:none; border:none; cursor:pointer; color: #6ca09d;"><img src="./assets/green-delete-icon.png" alt="Delete" style="width: 30px; height: 30px;"></button>
                </td>
            `;

            const btnDelete = tr.querySelector('.delete-btn');
            btnDelete.addEventListener('click', () => {
                this.destroy(index);
            });

            const btnEdit = tr.querySelector('.edit-btn');
            btnEdit.addEventListener('click', () => {
                this.modalEditTransactionEvent(item, index); 
            });

            this.tbody_table.appendChild(tr);
        });
    }





    destroy(index) {
        if (confirm("Deseja realmente excluir esta transação?")) {
            this.transactionList.splice(index, 1); 
            this.TransactionListUpdate(); 
        }
    }





    style(style_config){
        this.title.style.fontSize = "32px"
        this.title.style.color = "#6ca09d"
        this.title.style.marginBottom = "10%"
        this.title.style.paddingLeft = "45%"
        this.table_header.style.width = "100%"
        this.table_header.style.fontSize = "18px"
        this.table_header.style.color = "#6ca09d"
        this.main.style.backgroundColor = "#f0f0f0";
        this.main.style.padding = "20px";
        this.cards_container.style.display = "grid";
        this.cards_container.style.gridTemplateColumns = "repeat(3, 1fr)";
        this.cards_container.style.gap = "20px";
        this.button.style.backgroundColor = "#6ca09d";
        this.button.style.color = "white";
        this.button.style.border = "none";
        this.button.style.padding = "10px 20px";
        this.button.style.borderRadius = "5px";
        this.button.style.cursor = "pointer";
        this.button.style.marginLeft = "80%"
        this.table_header.style.width = "100%";
        this.table_header.style.borderCollapse = "separate";
        this.table_header.style.borderSpacing = "0 12px";
        this.cards_container.style.display = "grid";
        this.cards_container.style.gridTemplateColumns = "repeat(3, 1fr)";
        this.cards_container.style.gap = "20px";
        this.cards_container.style.marginBottom = "30px";
        this.csvButton.style.backgroundColor = "transparent";
        this.csvButton.style.border = "none";
        this.csvButton.style.cursor = "pointer";
        this.csvButton.style.position = "absolute";
        this.csvButton.style.marginLeft = "90%";
        this.csvButton.style.width = "1px";
        this.csvButton.style.height = "1px";
    }




    build() {
        this.main.appendChild(this.csvButton);
        this.header_wrapper.appendChild(this.title);
        this.header_wrapper.appendChild(this.button);
        this.main.appendChild(this.header_wrapper);
        this.main.appendChild(this.cards_container);
        this.thead_table.appendChild(this.tr_table)
        this.table_header.appendChild(this.thead_table)
        this.main.appendChild(this.table_header)
        this.main.appendChild(this.modalTransaction);
        this.table_header.appendChild(this.tbody_table)
    }
    
}