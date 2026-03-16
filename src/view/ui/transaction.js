import BaseComponent from "./components/baseComponent.js";

export default class Transaction extends BaseComponent{
    constructor(config = {}, style_config = {}) {
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

    }
    setup(config){
        this.title.textContent = config['title'] || "Transações"
        this.button.textContent = config['button_title'] || "Adicionar Transação"
        this.button.addEventListener = config['click_add_transaction']
        this.transactionList = []
        this.table_header.textContent = ""
        const headers = ['Descrição', 'Valor', 'Categoria', 'Data']
        headers.forEach(header => {
            const th = document.createElement('th')
            th.textContent = header
            this.tr_table.appendChild(th)
        })
        
        
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

    }
}