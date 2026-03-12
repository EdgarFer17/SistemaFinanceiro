// tabs para alternar entre seções
import BaseComponent from './baseComponent.js';
export default class ComponentTab extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.action = document.createElement('button');
        this.icon = document.createElement('img'); // verificar como será implementado
        this.text = document.createElement('p');
    }

    setup(config) {
        const SIGNAL = this.controller.signal;
        this.text.textContent = config['name'];
        this.action.addEventListener('click', config['function'], { SIGNAL });
        this.icon.src = config.icon_src;
        this.icon.alt = config.icon_alt;
    }

    style(style_config = { main: [], button: [], icon: [], text: [] }) {

        this.main.classList.add(...[], ...style_config.main);
        this.action.classList.add(...[], ...style_config.button);
        this.icon.classList.add(...[], ...style_config.icon);
        this.text.classList.add(...[], ...style_config.text);
    }

    build() {
        this.action.replaceChildren(this.icon, this.text);
        this.main.replaceChildren(this.action);
    }
}
