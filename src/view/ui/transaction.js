import BaseComponent from "./components/baseComponent.js";
//Transação
export default class Transaction extends BaseComponent{
    constructor(config, style_config) {
        super(config, style_config);
    }
    
    spawn(){
        this.main = document.createElement('main')
        this.header_wrapper = document.createElement('div')
        this.title = document.createElement('h1')
        this.button =  document.createElement('button')
        this.cards_container = document.createElement('section')
        this.table_header = document.createElement('table')
        this.thead_table = document.createElement('thead')
        this.tr_table = document.createElement('tr')
        this.modalTransaction = document.createElement('div')

    }
    setup(config){
        this.title.textContent = config['title'] || "Transações"
        this.button.textContent = config['button_title'] || "Adicionar Transação"
        this.transactionList = []
        this.table_header.textContent = ""
        const headers = ['Descrição', 'Valor', 'Categoria', 'Data']
        headers.forEach(header => {
            const th = document.createElement('th')
            th.textContent = header
            this.tr_table.appendChild(th)
        })
        this.button.addEventListener ('click', () => this.modalTransactionEvent())
            
                
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
    }


    style(style_config){
        this.title.style.color = "#6ca09d"
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
    }
    build() {
        this.header_wrapper.appendChild(this.title);
        this.header_wrapper.appendChild(this.button);
        this.main.appendChild(this.header_wrapper);
        this.main.appendChild(this.cards_container);
        this.thead_table.appendChild(this.tr_table)
        this.table_header.appendChild(this.thead_table)
        this.main.appendChild(this.table_header)
        this.main.appendChild(this.modalTransaction);
    }
}