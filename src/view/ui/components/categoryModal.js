import BaseComponent from "./baseComponent.js";

export default class CategoryModal extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config);
        this.spawn();
        this.setup(config);
        this.style();
        this.build();
    }

    spawn() {
        this.main = document.createElement('div');
        this.content = document.createElement('div');
        this.title = document.createElement('h2');
        this.labelName = document.createElement('label');
        this.inputName = document.createElement('input');
        this.labelLimit = document.createElement('label');
        this.inputLimit = document.createElement('input');
        this.saveButton = document.createElement('button');
    }

    setup(config) {
        const isEdit = !!config.category;
        this.title.textContent = isEdit ? "Editar Categoria" : "Criar Categoria";
        
        this.labelName.textContent = "Nome da categoria";
        this.inputName.placeholder = "Digite o nome da categoria";
        this.inputName.value = isEdit ? config.category.categoryName : "";
        
        this.labelLimit.textContent = "Limite de gastos";
        this.inputLimit.type = "number";
        this.inputLimit.min = "0";
        this.inputLimit.step = "0.01";
        this.inputLimit.placeholder = "0.00",
        this.inputLimit.value = isEdit ? (config.category.limit || "") : "";

        this.saveButton.textContent = isEdit ? "Salvar Alterações" : "Adicionar Categoria";
        
        this.saveButton.onclick = () => {
            config.onSave({
                name: this.inputName.value,
                limit: this.inputLimit.value,
                id: isEdit ? config.category.id : null
            });
        };

        this.main.onclick = (e) => {
            if (e.target === this.main) config.onClose();
        };
    }

    style() {
        this.main.className = "position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center";
        this.main.style.backgroundColor = "rgba(0,0,0,0.5)";
        this.main.style.zIndex = "9999"; 
        this.content.className = "bg-white p-5 rounded-4 shadow-lg";
        this.content.style.width = "400px";
        this.labelName.className = "form-label d-block mb-1 fw-bold";
        this.labelLimit.className = "form-label d-block mb-1 fw-bold";

        this.inputName.className = "form-control mb-3";
        this.inputLimit.className = "form-control mb-3";
        this.saveButton.className = "btn btn-primary w-100 border-0";
        this.saveButton.style.backgroundColor = "#6ca09d";
    }

    build() {
        this.content.append(this.title, this.labelName, this.inputName, this.labelLimit, this.inputLimit, this.saveButton);
        this.main.append(this.content);
    }

    getElement() {
        return this.main;
    }
}