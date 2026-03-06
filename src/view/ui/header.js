import BaseComponent from './components/baseComponent.js';

// Criação do header da aplicação
export default class Header extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.header = document.createElement('header');

        this.brand_wrapper = document.createElement('div');
        this.user_wrapper = document.createElement('button');

        this.brand_icon = document.createElement('test'); // Implement
        this.brand_name = document.createElement('h1');

        this.user_icon = document.createElement('test'); // Implement
        this.user_name = document.createElement('h2');
        this.user_post_icon = document.createElement('test'); // Implement
    }

    setup(config) {
        this.brand_name.textContent = config['app_name'];
        this.user_name.textContent = config['username'];
        this.user_wrapper.onclick = config['user_modal_function'];
    }
    
    style(style_config = {
            header: [],
            user_wrapper: [],
            brand_wrapper: [],
            brand_icon: [],
            brand_name: [],
            user_icon: [],
            user_name: [],
            user_post_icon: [],
        }) {
        // BOOTSTRAP

        this.header.classList.add(...[], ...style_config.header);

        this.user_wrapper.classList.add(...[], ...style_config.user_wrapper);

        this.brand_wrapper.classList.add(...[], ...style_config.brand_wrapper);

        this.brand_icon.classList.add(...[], ...style_config.brand_icon);

        this.brand_name.classList.add(...[], ...style_config.brand_name);

        this.user_icon.classList.add(...[], ...style_config.user_icon);

        this.user_name.classList.add(...[], ...style_config.user_name);

        this.user_post_icon.classList.add(
            ...[],
            ...style_config.user_post_icon
        );
    }

    build() {
        this.brand_wrapper.replaceChildren(this.brand_icon, this.brand_name);
        this.user_wrapper.replaceChildren(
            this.user_icon,
            this.user_name,
            this.user_post_icon
        );
        this.header.replaceChildren(this.brand_wrapper, this.user_wrapper);
    }
}
