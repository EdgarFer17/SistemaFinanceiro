import BaseComponent from "./components/BaseComponent.js";

export default class Category extends BaseComponent {
    constructor() {
        super({_tag: "main"}, {});
    }

    spawn() {
        
        this.main = document.createElement('main');
        this.header_wrapper = document.createElement('div');
        this.title = document.createElement('h1');
        this.button = document.createElement('button');
        this.cards_container = document.createElement('section');
    }

    setup(config) {
        this.title.textContent = config['title'] || "Categorias Cadastradas";
        this.button.textContent = config['button_title'] || "Adicionar Categoria";
        this.button.onclick = config['click_add_category'];

        
        if (config.categories) {
            config.categories.forEach(cat => {
                const card = this.createCategoryCard(cat);
                this.cards_container.appendChild(card);
            });
        }
    }

    createCategoryCard(categoryData) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        const name = document.createElement('span');
        name.textContent = categoryData.name;

        const actions = document.createElement('div');
        actions.innerHTML = `
            <i class="edit-icon">✎</i>
            <i class="delete-icon">🗑</i>
        `;

        card.append(name, actions);
        return card;
    }

    build() {
        this.header_wrapper.appendChild(this.title);
        this.header_wrapper.appendChild(this.button);
        
        this.main.appendChild(this.header_wrapper);
        this.main.appendChild(this.cards_container);

        return this.main;
    }
}