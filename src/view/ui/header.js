import BaseComponent from './components/baseComponent.js';

// Criação do header da aplicação
export default class Header extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.header = document.createElement('header');

        this.header_wrapper = document.createElement('div');
        this.brand_wrapper = document.createElement('div');
        this.user_wrapper = document.createElement('button');

        this.brand_icon = document.createElement('img'); // Implement
        this.brand_name = document.createElement('h1');

        this.user_icon = document.createElement('img'); // Implement
        this.user_name = document.createElement('h2');
        this.user_post_icon = document.createElement('img'); // Implement
    }

    setup(config) {
        const SIGNAL = this.controller.signal;

        this.brand_name.textContent = config['app_name'];
        this.user_name.textContent = config['username'];
        this.user_wrapper.addEventListener('click', ()=>{config['user_modal_function']}, { SIGNAL } );

        this.brand_icon.src = "./assets/BrandIcon.png"
        this.brand_icon.alt = "Icone da marca"
        this.user_icon.src = "./assets/Profile.png"
        this.user_icon.alt = "Icone de perfil"
        this.user_post_icon.src = "./assets/Back.png"
        this.user_post_icon.alt = "Icone de seta para expandir"
    }
    
    style(style_config = {
            header: [],
            header_wrapper: [],
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
        this.header_wrapper.classList.add(...[], ...style_config.header_wrapper);
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
        this.header_wrapper.replaceChildren(this.brand_wrapper, this.user_wrapper);
        this.header.replaceChildren(this.header_wrapper);
    }
}
