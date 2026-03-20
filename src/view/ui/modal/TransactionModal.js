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
        group.style.display = "flex";
        group.style.flexDirection = "column";
        group.style.gap = "8px";

        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.placeholder = placeholder;
        if (step) input.step = step;
        if (required) input.required = true;

        group.append(label, input);
        return group;
    }

    createSelectGroup(labelText, id, options) {
        const group = document.createElement('div');
        group.style.display = "flex";
        group.style.flexDirection = "column";
        group.style.gap = "8px";

        const label = document.createElement('label');
        label.textContent = labelText;

        const select = document.createElement('select');
        select.id = id;
        select.required = true;

        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
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
        this.close_btn.innerHTML = "&times;";
        
        this.close_btn.onclick = config.toggleModal;
        this.close_btn.onmouseover = () => this.close_btn.style.color = '#6ca09d';
        this.close_btn.onmouseout = () => this.close_btn.style.color = '#a4c4c1';

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            try {
                let value = parseFloat(this.value_group.querySelector('input').value);
                const typeStr = this.type_group.querySelector('select').value;
                const categoryName = this.category_group.querySelector('select').value;
                const desc = this.desc_group.querySelector('input').value;


                const dataAtual = this.editingData ? new Date(this.editingData.date) : new Date();

                const typeEnum = typeStr === "DESPESA" ? TRANSACTION_TYPE_MODEL.EXPENSE : TRANSACTION_TYPE_MODEL.INCOME;

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

        Object.assign(this.main.style, {
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #6ca09d",
            padding: "40px 60px",
            width: "100%",
            maxWidth: "750px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            fontFamily: "sans-serif",
            position: "relative"
        });

        Object.assign(this.header.style, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "35px"
        });

        Object.assign(this.title.style, {
            color: "#6ca09d",
            fontWeight: "bold",
            fontSize: "2.2rem",
            margin: "0"
        });

        Object.assign(this.close_btn.style, {
            background: "none",
            border: "none",
            fontSize: "2.5rem",
            color: "#a4c4c1",
            cursor: "pointer",
            padding: "0",
            lineHeight: "0.8",
            transition: "color 0.2s"
        });

        Object.assign(this.form.style, {
            display: "flex",
            flexDirection: "column",
            gap: "25px"
        });

        const inputStyles = {
            padding: "15px",
            border: "1px solid #a4c4c1",
            borderRadius: "8px",
            fontSize: "1rem",
            color: "#777",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "white"
        };

        const labelStyles = { color: "#6ca09d", fontSize: "1.2rem" };

        [this.value_group, this.type_group, this.category_group, this.desc_group].forEach(group => {
            const label = group.querySelector('label');
            const inputOrSelect = group.querySelector('input, select');
            
            if (label) Object.assign(label.style, labelStyles);
            if (inputOrSelect) Object.assign(inputOrSelect.style, inputStyles);
            if (inputOrSelect && inputOrSelect.tagName === 'SELECT') inputOrSelect.style.cursor = "pointer";
        });

        Object.assign(this.submit_btn.style, {
            backgroundColor: "#6ca09d",
            color: "white",
            border: "none",
            padding: "18px",
            borderRadius: "8px",
            fontSize: "1.2rem",
            marginTop: "20px",
            cursor: "pointer",
            fontWeight: "500",
            width: "100%",
            boxSizing: "border-box"
        });
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