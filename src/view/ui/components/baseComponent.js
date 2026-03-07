export default class BaseComponent {
    constructor(config, style_config) {
        if (!config) throw new Error('Um objeto config é obrigatório');

        this.spawn();
        this.setup(config);
        this.style(style_config);
        this.build();
    }

    spawn() {
        throw new Error('Implemente o método spawn()!');
    }

    setup() {
        throw new Error('Implemente o método setup(config)!');
    }

    style() {
        throw new Error('Implemente o método style(config)!');
    }

    build() {
        throw new Error('Implemente o método build()!');
    }
}

// eslint-disable-next-line
class ExemploDeImplementação extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.icon = document.createElement('i');
        this.title = document.createElement('h1');
    }

    setup(config) {
        this.title_element.textContent = config.title || 'Título Padrão';

        this.main_container.onclick = () => {
            console.log('qualquer ação fica aqui!');
        };
    }

    style(style_config) {
        if (style_config === undefined) {
            style_config = {
                main_container: [],
                icon_element: [],
                title_element: [],
            };
        }

        this.mainContainer.classList.add(
            ...['classe1'],
            ...style_config.main_container
        );

        this.iconElement.classList.add(
            ...['classe1', 'classe2'],
            ...style_config.icon_element
        );

        this.titleElement.classList.add(
            ...['classe1'],
            ...style_config.title_element
        );
    }

    build() {
        this.main_container.replaceChildren(this.icon, this.title);
    }
}
