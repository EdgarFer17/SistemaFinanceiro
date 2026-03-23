import BaseComponent from "../components/baseComponent.js";
import CategoryModel from "../../../model/categoryModel.js";
import CATEGORY_TYPE_MODEL from "../../../model/categoryTypeModel.js";
import CategoryController from "../../../controller/categoryController.js";

// Modal para criar/editar categorias
export default class CategoryModal extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config);
        this.toggleModal = config["toggleModal"];
    }

    // Cria os elementos principais
    spawn() {
        this.main = document.createElement('div');
        this.header = document.createElement('div');
        this.title = document.createElement('h2');
        this.close_button = document.createElement('button');
        this.form = document.createElement('form');
        this.labelName = document.createElement('label');
        this.inputName = document.createElement('input');
        this.labelLimit = document.createElement('label');
        this.inputLimit = document.createElement('input');
        this.submit = document.createElement('input');
    }

    // Prepara campos para modo criar (vazio) ou editar (preenchido com dados)
    setup(config) {

        this.close_button.innerHTML = "&times;";

        this.setFunction('click', ()=>{this.toggleModal()}, this.close_button);

        this.labelName.textContent = "Nome da categoria";
        this.inputName.placeholder = "Digite o nome da categoria";

        this.labelLimit.textContent = "Limite de gastos";
        this.inputLimit.type = "number";
        this.inputLimit.min = "0";
        this.inputLimit.step = "0.01";
        this.inputLimit.placeholder = "0.00";

        this.submit.type = "submit";

        this.setFunction('submit', ()=>{this.saveData()}, this.form);
    }

    // Atualiza o modal para modo edição e criação
    prepareModal(data = null) {
        if (data) {
            this.id = data.id;
        } else {
            this.id = null;
        }
        this.title.textContent = (data !== null) ? "Editar Categoria" : "Criar Categoria";
        this.inputLimit.value = (data !== null) ? ( !isNaN(parseFloat(data.limit)) ? parseFloat(data.limit) : "" ): "";
        this.inputName.value = (data !== null) ? data.categoryName : "";
        this.submit.value = (data !== null) ? "Salvar Alterações" : "Adicionar Categoria";
    }

    // Realiza o cadastro da categoria
    saveData() {
        try {
            const NAME = this.inputName.value;
            if (!NAME) throw new Error("O nome da categoria não pode estar vazio!");

            const LIMIT = Number(this.inputLimit.value);
            if (isNaN(LIMIT) || LIMIT < 0) {
                throw new Error("O limite deve ser um número válido e maior ou igual a zero!");
            }
            const TYPE = CATEGORY_TYPE_MODEL.CUSTOM;
            const NEW_CATEGORY = new CategoryModel(NAME, LIMIT, TYPE);

            if (this.id) {
                CategoryController.editCategory(this.id, NEW_CATEGORY);
            } else {
                CategoryController.createCategory(NEW_CATEGORY);
            }

            const CATEGORY_EVENT = new CustomEvent('category_saved', { bubbles: true });
            this.main.dispatchEvent(CATEGORY_EVENT);

            this.form.reset();
            this.toggleModal();
            
        } catch (error) {
            alert(error.message);
        }
    }

    // Aplica estilos Bootstrap ao modal
    style() {
        this.main.className = "bg-white p-4 rounded-4 shadow-lg w-50 text-primary";

        this.header.className = "d-flex justify-content-between align-items-center mb-4";
        this.title.className = "m-0";
        this.close_button.className = "btn borderless fs-2";
        
        this.form.className = "m-3";
        this.labelName.className = "form-label d-block mb-1 fw-bold";
        this.labelLimit.className = "form-label d-block mb-1 fw-bold";
        this.inputName.className = "form-control mb-3";
        this.inputLimit.className = "form-control mb-3";
        this.submit.className = "btn btn-primary w-100 border-0 text-white";
    }

    // Monta layout do modal com título, campos e botão salvar
    build() {
        this.header.replaceChildren(this.title, this.close_button);
        this.form.replaceChildren(this.labelName, this.inputName, this.labelLimit, this.inputLimit, this.submit)
        this.main.replaceChildren(this.header, this.form);
    }
}