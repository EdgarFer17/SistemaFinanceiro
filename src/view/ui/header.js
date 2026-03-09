import BaseComponent from './components/baseComponent.js';

// Criação do header da aplicação
export default class Header extends BaseComponent {
    constructor(style_config = {}) {
        const STYLE_CONFIG_FINAL = {
            header: style_config.header || [],
            user_wrapper: style_config.user_wrapper || [],
            brand_wrapper: style_config.brand_wrapper || [],
            brand_icon: style_config.brand_icon || [],
            brand_name: style_config.brand_name || [],
            user_icon: style_config.user_icon || [],
            user_name: style_config.user_name || [],
            user_post_icon: style_config.user_post_icon || [],
        };

        super(STYLE_CONFIG_FINAL);
    }

    spawn() {
        this.main = document.createElement('header');

        this.elements = {
            brand_wrapper: document.createElement('div'),
            user_wrapper: document.createElement('button'),
            brand_icon: document.createElement('i'),
            brand_name: document.createElement('h1'),
            user_icon: document.createElement('i'),
            user_name: document.createElement('h2'),
            user_post_icon: document.createElement('i'),
        };
    }

    style(style_config) {
        // BOOTSTRAP
        this.main.classList.add(...[], ...style_config.header);
        this.elements.user_wrapper.classList.add(
            ...[],
            ...style_config.user_wrapper
        );
        this.elements.brand_wrapper.classList.add(
            ...[],
            ...style_config.brand_wrapper
        );
        this.elements.brand_icon.classList.add(
            ...[],
            ...style_config.brand_icon
        );
        this.elements.brand_name.classList.add(
            ...[],
            ...style_config.brand_name
        );
        this.elements.user_icon.classList.add(...[], ...style_config.user_icon);
        this.elements.user_name.classList.add(...[], ...style_config.user_name);
        this.elements.user_post_icon.classList.add(
            ...[],
            ...style_config.user_post_icon
        );
    }

    build() {
        this.elements.brand_wrapper.replaceChildren(
            this.elements.brand_icon,
            this.elements.brand_name
        );
        this.elements.user_wrapper.replaceChildren(
            this.elements.user_icon,
            this.elements.user_name,
            this.elements.user_post_icon
        );
        this.main.replaceChildren(
            this.elements.brand_wrapper,
            this.elements.user_wrapper
        );
    }

    updateBrandName(_name = 'New Dashboard') {
        this.elements.brand_name.textContent = _name;
    }
    updateUsername(_username = 'New User') {
        this.elements.user_name.textContent = _username;
    }
    setModalFunction(
        _function = () => {
            alert('Ainda não foi implementada');
        }
    ) {
        const signal = this.signal;
        this.elements.user_wrapper.addEventListener('click', _function, {
            signal,
        });
    }
}
