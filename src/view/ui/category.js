import BaseComponent from "./components/baseComponent.js";

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
        const defaultCategories = [
            { categoryName: 'Alimentação' }, { categoryName: 'Transporte' }, { categoryName: 'Moradia' },
            { categoryName: 'Saúde' }, { categoryName: 'Lazer' }, { categoryName: 'Salário' },
            { categoryName: 'Outros' }, { categoryName: 'Caridade' }, { categoryName: 'Investimentos' }
        ];

        this.title.textContent = config['title'] || "Categorias Cadastradas";
        this.button.textContent = config['button_title'] || "Adicionar Categoria";
        this.button.onclick = config['click_add_category'];
        
        const categories = (config.categories && config.categories.length > 0) ? config.categories : defaultCategories;
        
        this.cards_container.innerHTML = ''; 
        categories.forEach(cat => {
            const card = this.createCategoryCard(cat);
            this.cards_container.appendChild(card);
        });
    }

    createCategoryCard(categoryData) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        const name = document.createElement('span');
        
        name.textContent = categoryData.categoryName || categoryData.name;
        name.style.color = "#6ca09d";
        name.style.fontSize = "1.5rem";

        const actions = document.createElement('div');
        actions.style.display = "flex";
        actions.style.gap = "15px";
        actions.style.alignItems = "center";

        const editIcon = document.createElement('img');
        editIcon.src = './assets/gray-edit-icon.png'; 
        editIcon.alt = 'Editar';
        editIcon.style.width = '20px';
        editIcon.style.cursor = 'pointer';

        const deleteIcon = document.createElement('img');
        deleteIcon.src = './assets/gray-delete-icon.png';
        deleteIcon.alt = 'Excluir';
        deleteIcon.style.width = '20px';
        deleteIcon.style.cursor = 'pointer';

        actions.append(editIcon, deleteIcon);
        card.append(name, actions);

        this.styleCard(card);
        return card;
    }

    style(style_config) {
         Object.assign(this.main.style, {
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            width: "100%",
            minHeight: "100vh",
            boxSizing: "border-box",
            position: "relative" 
        });

        
        Object.assign(this.header_wrapper.style, {
            width: "100%",
            maxWidth: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            position: "relative"
        });

        this.title.style.color = "#6ca09d";
        this.title.style.margin = "0";

       
        Object.assign(this.button.style, {
            backgroundColor: "#6ca09d",
            color: "white",
            border: "none",
            padding: "10px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            position: "absolute", 
            right: "0"
        });

        
        Object.assign(this.cards_container.style, {
            display: "grid",
            gridTemplateColumns: "repeat(3, 320px)", 
            gap: "30px",
            marginTop: "40px",
            justifyContent: "center", 
            width: "100%",
            maxWidth: "1100px"
        });
    }

    styleCard(card) {
        Object.assign(card.style, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 25px",
            minHeight: "130px",
            border: "1px solid #d1e3e2",
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            boxSizing: "border-box",
            transition: "transform 0.2s" 
        });
        card.onmouseenter = () => card.style.transform = "scale(1.03)";
        card.onmouseleave = () => card.style.transform = "scale(1)";
    }

    build() {
        this.header_wrapper.appendChild(this.title);
        this.header_wrapper.appendChild(this.button);
        
        this.main.appendChild(this.header_wrapper);
        this.main.appendChild(this.cards_container);
    }
}