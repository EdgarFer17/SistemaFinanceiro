import BaseComponent from "./components/baseComponent.js";
import CategoryController from "../../controller/categoryController.js"; 
import CategoryModel from "../../model/categoryModel.js";
import CATEGORY_TYPE_MODEL from "../../model/categoryTypeModel.js";
import CategoryModal from "./modal/categoryModal.js";

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
        
        // Abre o modal para CRIAR
        this.button.onclick = () => this.handleOpenModal();

        this.renderCategories();
    }

    setModal(_function) {
        const SIGNAL = this.controller.signal;
        this.button.addEventListener("click", _function, { SIGNAL })
    }

    handleOpenModal(categoryData = null) {
        const modal = new CategoryModal({
            category: categoryData,
            onSave: (data) => {
                try {
                    const name = data.name ? data.name.trim() : "";
                    if (!name) throw new Error("O nome da categoria não pode estar vazio!");
                    const limit = parseFloat(data.limit);
                    if (Number.isNaN(limit) || limit < 0) {
                        throw new Error("O limite deve ser um número válido e maior ou igual a zero!");
                    }
                    const type = categoryData ? categoryData.type : CATEGORY_TYPE_MODEL.CUSTOM;
                    
                    const newCat = new CategoryModel(name, limit, type);
                    if (data.id) {
                        CategoryController.editCategory(data.id, newCat);
                    } else {
                        CategoryController.createCategory(newCat);
                    }
                    document.body.removeChild(modal.getElement());
                    this.renderCategories();
                } catch (error) {
                    alert(error.message);
                }
            }
        });
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
            const card = this.createCategoryCard(cat);
            this.cards_container.appendChild(card);
        });
    }

    createCategoryCard(categoryData) {
        const isDefault = categoryData.type === CATEGORY_TYPE_MODEL.DEFAULT;
        const col = document.createElement('div');
        col.className = "col-12 col-md-6 col-lg-4";

        const cardBody = document.createElement('div');
        cardBody.className = "d-flex justify-content-between align-items-center p-4 bg-white border border-info-subtle rounded-3 shadow-sm";
        cardBody.style.minHeight = "120px";
        
        const name = document.createElement('span');
        name.className = "fs-3 fw-normal mb-0";
        name.textContent = categoryData.categoryName;
        name.style.color = "#6ca09d";

        const actions = document.createElement('div');
        actions.className = "d-flex gap-3 align-self-start";
        const editIcon = document.createElement('img');
        editIcon.src = isDefault ? './assets/gray-edit-icon.png' : './assets/green-edit-icon.png'; 
        editIcon.style.width = '18px';
        
        if (!isDefault) {
            editIcon.style.cursor = 'pointer';
            editIcon.onclick = () => this.handleOpenModal(categoryData);
        } else {
            editIcon.style.opacity = "0.5";
            editIcon.title = "Categorias padrão não podem ser editadas";
        }
        const deleteIcon = document.createElement('img');
        deleteIcon.src = isDefault ? './assets/gray-delete-icon.png' : './assets/green-delete-icon.png';
        deleteIcon.style.width = '18px';

        if (!isDefault) {
            deleteIcon.style.cursor = 'pointer';
            deleteIcon.onclick = () => {
                if (confirm(`Deseja excluir ${categoryData.categoryName}?`)) {
                    try {
                        CategoryController.deleteCategory(categoryData.id);
                        this.renderCategories();
                    } catch (e) { alert(e.message); }
                }
            };
        } else {
            deleteIcon.style.opacity = "0.5";
            deleteIcon.title = "Categorias padrão não podem ser excluídas";
        }

        actions.append(editIcon, deleteIcon);
        cardBody.append(name, actions);
        col.appendChild(cardBody);

        return col;
    }

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

    build() {
        this.header_wrapper.append(this.title, this.button);
        this.main.append(this.header_wrapper, this.cards_container);
    }
}