import BaseComponent from "./components/baseComponent.js";
import CategoryController from "../../controller/categoryController.js";
import CATEGORY_TYPE_MODEL from "../../model/categoryTypeModel.js";

// Página de gestão de categorias (CRUD)
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

    // Configura título, botão e lista inicial de categorias
    setup(config) {
        this.title.textContent = config['title'] || "Categorias Cadastradas";
        this.button.textContent = config['button_title'] || "Adicionar Categoria";
        this.renderCategories();
        this.setFunction('category_saved', ()=>{this.renderCategories()}, document)
    }

    // Registra função para abrir modal de categoria
    setModal(_function) {
        this.modal_trigger_function = _function;
        this.setFunction('click', (event)=> {_function()}, this.button);
    }


    // Carrega todas as categorias do controller e renderiza cards
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

    // Cria card visual com nome, botões edit/delete (desabilitados para DEFAULT)
    createCategoryCard(categoryData) {
        const IS_DEFAULT = categoryData.type === CATEGORY_TYPE_MODEL.DEFAULT;
        const COL = document.createElement('div');
        COL.className = "col-12 col-md-6 col-lg-4";

        const CARD_BODY = document.createElement('div');
        CARD_BODY.className = "d-flex justify-content-between align-items-center p-4 bg-white border border-info-subtle rounded-3 shadow-sm";
        CARD_BODY.style.minHeight = "120px";
        
        const NAME = document.createElement('span');
        NAME.className = "fs-3 fw-normal mb-0";
        NAME.textContent = categoryData.categoryName;
        NAME.style.color = "#6ca09d";

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
        CARD_BODY.append(NAME, ACTIONS);
        COL.appendChild(CARD_BODY);

        return COL;
    }

    // Aplica estilos Bootstrap aos elementos da página
    style() {
        this.main.className = "container-fluid px-5 py-4 w-100 mt-5";
        this.header_wrapper.className = "d-flex flex-column align-items-center mb-5 w-100 position-relative";
        this.title.className = "h2 fw-light m-0 mb-3";
        this.title.style.color = "#6ca09d";
        this.button.className = "btn px-4 py-2 text-white fw-medium rounded-3 border-0 shadow-sm";
        this.button.style.backgroundColor = "#6ca09d";
        this.button.style.position = "absolute";
        this.button.style.right = "10%";
        this.button.style.top = "50%";

        this.cards_container.className = "row g-4 justify-content-center";
        this.cards_container.style.maxWidth = "1200px";
        this.cards_container.style.margin = "0 auto";
    }

    // Monta layout: header com título e botão, container de cards
    build() {
        this.header_wrapper.append(this.title, this.button);
        this.main.append(this.header_wrapper, this.cards_container);
    }
}