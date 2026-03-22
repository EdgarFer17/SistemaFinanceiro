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

    // Factory para criar grupo de input com label
    createFormGroup(labelText, type, id, placeholder, step = null, required = true) {
        const GROUP = document.createElement('div');
        GROUP.style.display = "flex";
        GROUP.style.flexDirection = "column";
        GROUP.style.gap = "8px";

        const LABEL = document.createElement('label');
        LABEL.textContent = labelText;

        const INPUT = document.createElement('input');
        INPUT.type = type;
        INPUT.id = id;
        INPUT.placeholder = placeholder;
        if (step) INPUT.step = step;
        if (required) INPUT.required = true;

        GROUP.append(LABEL, INPUT);
        return GROUP;
    }

    // Factory para criar grupo de select com label
    createSelectGroup(labelText, id, options) {
        const GROUP = document.createElement('div');
        GROUP.style.display = "flex";
        GROUP.style.flexDirection = "column";
        GROUP.style.gap = "8px";

        const LABEL = document.createElement('label');
        LABEL.textContent = labelText;

        const SELECT = document.createElement('select');
        SELECT.id = id;
        SELECT.required = true;

        const DEFAULT_OPTION = document.createElement('option');
        DEFAULT_OPTION.value = "";
        DEFAULT_OPTION.disabled = true;
        DEFAULT_OPTION.selected = true;

        const CUSTOM_OPTIONS = options.map(opt => {
            const OPTION_ELEMENT = document.createElement('option');
            OPTION_ELEMENT.value = opt.value;
            OPTION_ELEMENT.textContent = opt.text;
            return OPTION_ELEMENT
        });

        SELECT.replaceChildren(DEFAULT_OPTION, ...CUSTOM_OPTIONS)

        GROUP.append(LABEL, SELECT);
        return GROUP;
    }

    // Factory para criar select dinâmico de categorias do controller
    createCategorySelectGroup() {
        const CATEGORY_LIST = CategoryController.getCategories();
        const OPTIONS = CATEGORY_LIST.map(cat => ({
            value: cat.categoryName,
            text: cat.categoryName
        }));
        return this.createSelectGroup("Categoria", "category-select", OPTIONS);
    }

    // Prepara modal para modo criar (vazio) ou editar (preenchido com dados)
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


    // Configura botão fechar, valida e persiste transação ao submeter
    setup(config) {
        this.close_btn.innerHTML = "&times;";

        this.close_btn.onclick = config.toggleModal;
        this.close_btn.onmouseover = () => this.close_btn.style.color = '#6ca09d';
        this.close_btn.onmouseout = () => this.close_btn.style.color = '#a4c4c1';

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


    // Aplica estilos inline e Bootstrap aos elementos do modal
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

        const INPUT_STYLES = {
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

        const LABEL_STYLES = { color: "#6ca09d", fontSize: "1.2rem" };

        [this.value_group, this.type_group, this.category_group, this.desc_group].forEach(group => {
            const LABEL = group.querySelector('label');
            const INPUT_OR_SELECT = group.querySelector('input, select');

            if (LABEL) Object.assign(LABEL.style, LABEL_STYLES);
            if (INPUT_OR_SELECT) Object.assign(INPUT_OR_SELECT.style, INPUT_STYLES);
            if (INPUT_OR_SELECT && INPUT_OR_SELECT.tagName === 'SELECT') INPUT_OR_SELECT.style.cursor = "pointer";
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

    // Monta layout: header com título e fechar, formulário com campos
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