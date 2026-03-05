export default class BaseComponent {
    constructor(config) {
        if (!config) throw new Error('Um objeto config é obrigatório');

        this.spawn();
        this.setup(config);
        this.style();
        this.build();
    }

    spawn() {
        throw new Error('Implemente o método spawn()!');
    }
    // eslint-disable-next-line
    setup(config) {
        throw new Error('Implemente o método setup(config)!');
    }

    style() {
        throw new Error('Implemente o método style()!');
    }

    build() {
        throw new Error('Implemente o método build()!');
    }
}

// eslint-disable-next-line
class ExemploDeImplementação extends BaseComponent {
    constructor(config) {
        super(config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.icon = document.createElement('i');
        this.title = document.createElement('h1');
    }

    setup(config) {
        this.titleElement.textContent = config.title || 'Título Padrão';

        this.mainContainer.onclick = () => {
            console.log('qualquer ação fica aqui!');
        };
    }

    style() {
        this.mainContainer.className = '';
        this.mainContainer.classList.add(...['classe1']);

        this.iconElement.className = '';
        this.iconElement.classList.add(...['classe1', 'classe2']);

        this.titleElement.className = '';
        this.titleElement.classList.add(...['classe1']);
    }

    build() {
        this.mainContainer.replaceChildren(this.icon, this.title);
    }
}
