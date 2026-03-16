import BaseComponent from "./components/baseComponent.js";

export default class Category extends BaseComponent {
    constructor(config, style_config) {
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
            { name: 'Alimentação' }, { name: 'Transporte' }, { name: 'Moradia' },
            { name: 'Saúde' }, { name: 'Lazer' }, { name: 'Salário' },
            { name: 'Outros' }, { name: 'Caridade' }, { name: 'Investimentos' }
        ];

        this.title.textContent = config['title'] || "Categorias Cadastradas";
        this.button.textContent = config['button_title'] || "Adicionar Categoria";
        
        const categories = config.categories || defaultCategories;
        
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
    name.textContent = categoryData.name;
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
    editIcon.style.height = '20px';
    editIcon.style.cursor = 'pointer';
    editIcon.onclick = () => console.log('Editar:', categoryData.name);

   
    const deleteIcon = document.createElement('img');
    
    deleteIcon.src = './assets/gray-delete-icon.png';
    deleteIcon.alt = 'Excluir';
    deleteIcon.style.width = '20px';
    deleteIcon.style.height = '20px';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.onclick = () => console.log('Deletar:', categoryData.name);

    actions.append(editIcon, deleteIcon);
    card.append(name, actions);

    this.styleCard(card);

    return card;
}

    style(style_config) {
        
        Object.assign(this.main.style, {
            padding: "40px",
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            fontFamily: "sans-serif"
        });

       
        Object.assign(this.header_wrapper.style, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
        });

        this.title.style.color = "#6ca09d";
        this.title.style.fontWeight = "400";
        this.title.style.margin = "0 auto"; 
        
        Object.assign(this.button.style, {
            backgroundColor: "#6ca09d",
            color: "white",
            border: "none",
            padding: "10px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            position: "absolute", 
            right: "40px"
        });

        
        Object.assign(this.cards_container.style, {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
            marginTop: "20px"
        });
    }
    styleCard(card) {
    Object.assign(card.style, {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 30px",
        border: "1px solid #d1e3e2",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    });
}

    build() {
        this.header_wrapper.appendChild(this.title);
        this.header_wrapper.appendChild(this.button);
        
        this.main.appendChild(this.header_wrapper);
        this.main.appendChild(this.cards_container);
    }
}