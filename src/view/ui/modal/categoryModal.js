import BaseComponent from "../components/baseComponent.js";

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
        this.inputName.placeholder = "Digite o nome";
        this.inputName.value = isEdit ? config.category.categoryName : "";
        
        this.labelLimit.textContent = "Limite de gastos";
        this.inputLimit.type = "number";
        this.inputLimit.placeholder = "0.00";
        this.inputLimit.value = isEdit ? (config.category.limit || "") : "";

        this.saveButton.textContent = isEdit ? "Salvar" : "Adicionar";
        
        this.saveButton.onclick = () => {
            if (this.inputName.value.trim() === "") {
                this.inputName.classList.add("is-invalid");
                return;
            }
            
            config.onSave({
                name: this.inputName.value,
                limit: parseFloat(this.inputLimit.value) || 0,
                id: isEdit ? config.category.id : null
            });
        };
    }

    style() {
        this.main.className = "bg-white p-5 rounded-4 shadow-lg";
        this.main.style.width = "400px";
        this.main.style.margin = "auto"; // Importante para centralizar no wrapper

        this.title.className = "h4 mb-4 text-center fw-bold";
        this.labelName.className = "form-label fw-bold small text-secondary";
        this.labelLimit.className = "form-label fw-bold small text-secondary";
        this.inputName.className = "form-control mb-3";
        this.inputLimit.className = "form-control mb-4";
        this.saveButton.className = "btn btn-primary w-100 py-2 fw-bold border-0";
        this.saveButton.style.backgroundColor = "#6ca09d";
    }

    build() {
        this.main.replaceChildren(
            this.title, 
            this.labelName, this.inputName, 
            this.labelLimit, this.inputLimit, 
            this.saveButton
        );
    }
}