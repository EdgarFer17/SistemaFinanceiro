import BaseComponent from "../components/baseComponent.js";
import CategoryController from "../../../controller/categoryController.js";
import TransactionModel from "../../../model/TransactionModel.js";
import TRANSACTION_TYPE_MODEL from "../../../model/TransactionTypeModel.js";
import TransactionController from "../../../controller/TransactionController.js";

// Modal para criar/editar transações
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

    // Factory para criar grupo de input com label (Padrão Bootstrap)
    createFormGroup(labelText, type, id, placeholder, step = null, required = true) {
        const GROUP = document.createElement('div');
        GROUP.classList.add("mb-3");

        const LABEL = document.createElement('label');
        LABEL.classList.add("form-label", "fw-bold");
        LABEL.textContent = labelText;
        LABEL.htmlFor = id;

        const INPUT = document.createElement('input');
        INPUT.classList.add("form-control", "py-2");
        INPUT.type = type;
        INPUT.id = id;
        INPUT.placeholder = placeholder;
        if (step) INPUT.step = step;
        if (required) INPUT.required = true;

        GROUP.append(LABEL, INPUT);
        return GROUP;
    }

    // Factory para criar grupo de select com label (Padrão Bootstrap)
    createSelectGroup(labelText, id, options) {
        const GROUP = document.createElement('div');
        GROUP.classList.add("mb-3");

        const LABEL = document.createElement('label');
        LABEL.classList.add("form-label", "fw-bold");
        LABEL.textContent = labelText;
        LABEL.htmlFor = id;

        const SELECT = document.createElement('select');
        SELECT.classList.add("form-select", "py-2");
        SELECT.id = id;
        SELECT.required = true;

        const DEFAULT_OPTION = document.createElement('option');
        DEFAULT_OPTION.value = "";
        DEFAULT_OPTION.disabled = true;
        DEFAULT_OPTION.selected = true;
        DEFAULT_OPTION.textContent = "Selecione uma opção";

        const CUSTOM_OPTIONS = options.map(opt => {
            const OPTION_ELEMENT = document.createElement('option');
            OPTION_ELEMENT.value = opt.value;
            OPTION_ELEMENT.textContent = opt.text;
            return OPTION_ELEMENT;
        });

        SELECT.replaceChildren(DEFAULT_OPTION, ...CUSTOM_OPTIONS);
        GROUP.append(LABEL, SELECT);
        return GROUP;
    }

    createCategorySelectGroup() {
        const CATEGORY_LIST = CategoryController.getCategories();
        const OPTIONS = CATEGORY_LIST.map(cat => ({
            value: cat.categoryName,
            text: cat.categoryName
        }));
        return this.createSelectGroup("Categoria", "category-select", OPTIONS);
    }

    prepareModal(dadosDaLinha) {
        this.editingData = dadosDaLinha;

        if (dadosDaLinha) {
            this.title.textContent = "Editar Transação";
            this.submit_btn.textContent = "Salvar Alterações";
            this.value_group.querySelector('input').value = Math.abs(dadosDaLinha.value);
  
            const IS_EXPENSE = dadosDaLinha.type === TRANSACTION_TYPE_MODEL.EXPENSE;
            this.type_group.querySelector('select').value = IS_EXPENSE ? "DESPESA" : "RECEITA";
            
            const CAT_SELECT = this.category_group.querySelector('select');
            CAT_SELECT.value = dadosDaLinha.category.categoryName;
            if (!CAT_SELECT.value) CAT_SELECT.value = ""; 

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

        this.setFunction('submit', (event) => {
            event.preventDefault();
            try {
                let value = parseFloat(this.value_group.querySelector('input').value);
                const TYPE_STR = this.type_group.querySelector('select').value;
                const CATEGORY_NAME = this.category_group.querySelector('select').value;
                const DESC = this.desc_group.querySelector('input').value;

                const DATA_ATUAL = this.editingData ? new Date(this.editingData.date) : new Date();
                const TYPE_ENUM = TYPE_STR === "DESPESA" ? TRANSACTION_TYPE_MODEL.EXPENSE : TRANSACTION_TYPE_MODEL.INCOME;

                if (TYPE_ENUM === TRANSACTION_TYPE_MODEL.EXPENSE && value > 0) value = -value;
                else if (TYPE_ENUM === TRANSACTION_TYPE_MODEL.INCOME && value < 0) value = Math.abs(value);

                const CATEGORY_OBJECT = CategoryController.getCategories().find(c => c.categoryName === CATEGORY_NAME);
                const NEW_TRANSACTION = new TransactionModel(DATA_ATUAL, CATEGORY_OBJECT, TYPE_ENUM, value, DESC);

                if (this.editingData && this.editingData.id) {
                    TransactionController.editTransaction(this.editingData.id, NEW_TRANSACTION);
                    alert("Transação Atualizada com Sucesso!");
                } else {
                    TransactionController.createTransaction(NEW_TRANSACTION);
                    alert("Transação Adicionada com Sucesso!");
                }

                const TRANSACTION_EVENT = new CustomEvent('transaction_saved', { bubbles: true });
                this.main.dispatchEvent(TRANSACTION_EVENT);
                this.form.reset();
                config.toggleModal();
            } catch (error) {
                alert("Erro: " + error.message);
            }
        }, this.form);
    }

    style() {
        this.main.classList.add("bg-white", "rounded-4", "p-4", "p-md-5", "mx-2", "shadow-lg", "w-100","w-sm-75","w-lg-50");
        this.header.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-4");

        this.title.classList.add("h2", "fw-bold", "m-0","text-primary");
        this.close_btn.classList.add("btn", "border-0", "p-0", "lh-1", "display-4","text-primary","fs-2");
        this.form.classList.add("d-flex", "flex-column", "gap-2");
        [this.value_group, this.type_group, this.category_group, this.desc_group].forEach(group => {
            const label = group.querySelector('label');
            if(label) label.classList.add("text-primary")
        });
        this.submit_btn.classList.add("btn", "btn-lg", "text-white", "mt-4", "py-3", "fw-bold", "bg-primary");
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