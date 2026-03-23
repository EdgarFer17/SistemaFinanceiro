import BaseComponent from "../components/baseComponent.js";
import CategoryController from "../../../controller/categoryController.js";
import TransactionModel from "../../../model/TransactionModel.js";
import TRANSACTION_TYPE_MODEL from "../../../model/TransactionTypeModel.js";
import TransactionController from "../../../controller/TransactionController.js";

export default class TransactionModal extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.header = document.createElement('div');
        this.title = document.createElement('h2');
        this.close_btn = document.createElement('button');
        this.form = document.createElement('form');
        this.form.id = "transaction-form";
        this.value_group = this.createFormGroup("Valor", "number", "valor-input", "Digite o valor da transação", "any");
        this.type_group = this.createSelectGroup("Tipo", "type-select", [
            { value: "RECEITA", text: "Receita" },
            { value: "DESPESA", text: "Despesa" }
        ]);
        this.category_group = this.createCategorySelectGroup();
        this.desc_group = this.createFormGroup("", "text", "desc-input", "Descrição (opcional)", null, false);
        this.desc_group.querySelector('label').remove(); 
        this.submit_btn = document.createElement('button');
        this.submit_btn.type = "submit";
        this.submit_btn.textContent = "Adicionar Transação";
    }

    createFormGroup(labelText, type, id, placeholder, step = null, required = true) {
        const group = document.createElement('div');
        group.className = "d-flex flex-column gap-2 mt-2";

        const label = document.createElement('label');
        label.className = "fw-bold fs-5";
        label.style.color = "#6ca09d"; 
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.className = "form-control shadow-sm p-3";
        input.placeholder = placeholder;
        if (step) input.step = step;
        if (required) input.required = true;

        group.append(label, input);
        return group;
    }

    createSelectGroup(labelText, id, options) {
        const group = document.createElement('div');
        group.className = "d-flex flex-column gap-2 mt-2";

        const label = document.createElement('label');
        label.className = "fw-bold fs-5";
        label.style.color = "#6ca09d";
        label.textContent = labelText;

        const select = document.createElement('select');
        select.id = id;
        select.className = "form-select shadow-sm p-3 cursor-pointer";
        select.required = true;

        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Selecione...";
        select.appendChild(defaultOption);

        options.forEach(opt => {
            const optionElement = document.createElement('option');
            optionElement.value = opt.value;
            optionElement.textContent = opt.text;
            select.appendChild(optionElement);
        });

        group.append(label, select);
        return group;
    }

    createCategorySelectGroup() {
        const categoryList = CategoryController.getCategories();
        const options = categoryList.map(cat => ({
            value: cat.categoryName,
            text: cat.categoryName
        }));
        return this.createSelectGroup("Categoria", "category-select", options);
    }

    // RF03: Injeta payload de edição ou reseta form para criação
    prepareModal(dadosDaLinha) {
        this.editingData = dadosDaLinha;

        if (dadosDaLinha) {
            this.title.textContent = "Editar Transação";
            this.submit_btn.textContent = "Salvar Alterações";
            
            this.value_group.querySelector('input').value = Math.abs(dadosDaLinha.value);
  
            const isExpense = dadosDaLinha.type === TRANSACTION_TYPE_MODEL.EXPENSE;
            this.type_group.querySelector('select').value = isExpense ? "DESPESA" : "RECEITA";
            
            const catSelect = this.category_group.querySelector('select');
            catSelect.value = dadosDaLinha.category.categoryName;
            if (!catSelect.value) catSelect.value = ""; 

            this.desc_group.querySelector('input').value = dadosDaLinha.desc || "";
        } else {
            this.title.textContent = "Fazer Transação";
            this.submit_btn.textContent = "Adicionar Transação";
            this.form.reset();

            this.type_group.querySelector('select').value = "";
            this.category_group.querySelector('select').value = "";
        }
    }

    setup(config) {
        // Fallback p/ HTML entity sem innerHTML p/ evitar XSS
        this.close_btn.textContent = "×"; 
        
        this.close_btn.onclick = config.toggleModal;
        this.close_btn.onmouseover = () => this.close_btn.style.color = '#6ca09d';
        this.close_btn.onmouseout = () => this.close_btn.style.color = '#a4c4c1';

        // RF01/RF03: Handler unificado para Create e Update
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            try {
                let value = parseFloat(this.value_group.querySelector('input').value);
                const typeStr = this.type_group.querySelector('select').value;
                const categoryName = this.category_group.querySelector('select').value;
                const desc = this.desc_group.querySelector('input').value;

                // Garante preservação da data na edição
                const dataAtual = this.editingData ? new Date(this.editingData.date) : new Date();
                const typeEnum = typeStr === "DESPESA" ? TRANSACTION_TYPE_MODEL.EXPENSE : TRANSACTION_TYPE_MODEL.INCOME;

                // Força sinal p/ evitar distorções de DB caso user insira despesa positiva
                if (typeEnum === TRANSACTION_TYPE_MODEL.EXPENSE && value > 0) value = -value;
                else if (typeEnum === TRANSACTION_TYPE_MODEL.INCOME && value < 0) value = Math.abs(value);

                const categoryObj = CategoryController.getCategories().find(c => c.categoryName === categoryName);
                const newTransaction = new TransactionModel(dataAtual, categoryObj, typeEnum, value, desc);

                if (this.editingData && this.editingData.id) {
                    TransactionController.editTransaction(this.editingData.id, newTransaction);
                    alert("Transação Atualizada com Sucesso!");
                } else {
                    TransactionController.createTransaction(newTransaction);
                    alert("Transação Adicionada com Sucesso!");
                }

                // Dispara evento global p/ a view de listagem escutar e atualizar
                const transactionEvent = new CustomEvent('transactionSaved', { bubbles: true });
                this.main.dispatchEvent(transactionEvent);

                this.form.reset();
                config.toggleModal();

            } catch (error) {
                alert("Erro: " + error.message);
            }
        });
    }

    style(style_config) {
        this.main.className = "bg-white border rounded-4 shadow-lg p-4 p-md-5 position-relative w-100 mx-auto";
        this.main.style.maxWidth = "750px";
        this.main.style.borderColor = "#6ca09d";
        this.header.className = "d-flex justify-content-between align-items-start mb-4";  
        this.title.className = "fw-bold m-0 display-6 fs-2";
        this.title.style.color = "#6ca09d";
        this.close_btn.className = "bg-transparent border-0 fs-1 lh-1";
        this.close_btn.style.color = "#a4c4c1";
        this.close_btn.style.transition = "color 0.2s";
        this.form.className = "d-flex flex-column gap-3";
        this.submit_btn.className = "btn text-white py-3 rounded-3 fs-5 fw-medium mt-3 w-100";
        this.submit_btn.style.backgroundColor = "#6ca09d";
    }

    build() {
        this.header.replaceChildren(this.title, this.close_btn);      
        this.form.replaceChildren(
            this.value_group, 
            this.type_group, 
            this.category_group, 
            this.desc_group, 
            this.submit_btn
        );   
        this.main.replaceChildren(this.header, this.form);
    }
}