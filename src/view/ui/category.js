import BaseComponent from "./components/baseComponent.js";
import CategoryController from "../../controller/categoryController.js";
import CATEGORY_TYPE_MODEL from "../../model/categoryTypeModel.js";

export default class Category extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('main');
        this.header_wrapper = document.createElement('div');
        this.title = document.createElement('h2');
        this.button = document.createElement('button');
        this.cards_container = document.createElement('section');
    }

    setup(config) {
        this.title.textContent = config['title'] || "Categorias Cadastradas";
        this.button.textContent = config['button_title'] || "Adicionar Categoria";
        this.renderCategories();
        this.setFunction('category_saved', ()=>{this.renderCategories()}, document)
    }

    setModal(_function) {
        this.modal_trigger_function = _function;
        this.setFunction('click', (event)=> {_function()}, this.button);
    }

    renderCategories() {
        this.cards_container.innerHTML = '';
        let categories = [];
        try {
            categories = CategoryController.getCategories();
        } catch (e) {
            console.error("Erro ao buscar categorias:", e);
        }

        categories.forEach(cat => {
            const CARD = this.createCategoryCard(cat);
            this.cards_container.appendChild(CARD);
        });
    }

    createCategoryCard(categoryData) {
        const IS_DEFAULT = categoryData.type === CATEGORY_TYPE_MODEL.DEFAULT;
        const COL = document.createElement('div');
        COL.className = "col-12 col-md-6 col-lg-4";

        const CARD_BODY = document.createElement('div');
        CARD_BODY.className = "d-flex justify-content-between align-items-center p-4 bg-white border border-info-subtle rounded-3 shadow-sm gap-2";
        CARD_BODY.style.minHeight = "120px";
  
        const budget = CategoryController.getCategoryBudgetStatus(categoryData.id);
        
        const INFO_CONTAINER = document.createElement('div');
        INFO_CONTAINER.className = "d-flex flex-column gap-3";

        const NAME = document.createElement('span');
        NAME.className = "fs-4 fw-normal mb-1 font-monospace text-wrap";
        NAME.textContent = categoryData.categoryName;
        NAME.style.color = "#6ca09d";

        const PERCENT_TAG = document.createElement('span');
        PERCENT_TAG.className = "badge rounded-2 fw-bold p-2";
        PERCENT_TAG.style.width = "fit-content";
        PERCENT_TAG.textContent = `${budget.percentage}% gasto`;
        if (budget.limit > 0) {
            if (budget.percentage >= 100) {
                PERCENT_TAG.classList.add("bg-danger"); 
                CARD_BODY.classList.add("border-danger", "border-2");
            } else if (budget.percentage >= 80) {
                PERCENT_TAG.classList.add("bg-warning", "text-dark");
            } else {
                PERCENT_TAG.classList.add("bg-success");
            }
        } else {
            PERCENT_TAG.classList.add("bg-secondary");
            PERCENT_TAG.textContent = "Sem limite";
        }

        INFO_CONTAINER.append(NAME, PERCENT_TAG);

        const ACTIONS = document.createElement('div');
        ACTIONS.className = "d-flex gap-3 align-self-start";
        
        const EDIT_ICON = document.createElement('img');
        EDIT_ICON.src = IS_DEFAULT ? './assets/gray-edit-icon.png' : './assets/green-edit-icon.png'; 
        EDIT_ICON.style.width = '18px';
        
        if (!IS_DEFAULT) {
            EDIT_ICON.style.cursor = 'pointer';
            this.setFunction('click', (event)=>{
                this.modal_trigger_function(event, categoryData);
            }, EDIT_ICON)
        } else {
            EDIT_ICON.style.opacity = "0.5";
            EDIT_ICON.title = "Categorias padrão não podem ser editadas";
        }

        const DELETE_ICON = document.createElement('img');
        DELETE_ICON.src = IS_DEFAULT ? './assets/gray-delete-icon.png' : './assets/green-delete-icon.png';
        DELETE_ICON.style.width = '18px';

        if (!IS_DEFAULT) {
            DELETE_ICON.style.cursor = 'pointer';
            DELETE_ICON.onclick = () => {
                if (confirm(`Deseja excluir ${categoryData.categoryName}?`)) {
                    try {
                        CategoryController.deleteCategory(categoryData.id);
                        this.renderCategories();
                    } catch (e) { alert(e.message); }
                }
            };
        } else {
            DELETE_ICON.style.opacity = "0.5";
            DELETE_ICON.title = "Categorias padrão não podem ser excluídas";
        }

        ACTIONS.append(EDIT_ICON, DELETE_ICON);
        CARD_BODY.append(INFO_CONTAINER, ACTIONS);
        COL.appendChild(CARD_BODY);

        return COL;
    }

    style() {
        this.main.className = "container-fluid px-2 py-4 w-100 mt-3 mt-md-5";
        this.header_wrapper.className = "d-flex flex-column align-items-center mb-5 w-100 position-relative gap-2";
        this.title.className = "h2 fw-light m-0 mb-3";
        this.title.style.color = "#6ca09d";
        this.button.className = "btn px-4 py-2 text-white fw-medium rounded-3 border-0 shadow-sm";
        this.button.style.backgroundColor = "#6ca09d";
        this.cards_container.className = "row g-4 px-2 justify-content-center";
    }

    build() {
        this.header_wrapper.append(this.title, this.button);
        this.main.append(this.header_wrapper, this.cards_container);
    }
}