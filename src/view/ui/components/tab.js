// tabs para alternar entre seções
import BaseComponent from './baseComponent.js';
export default class ComponentTab extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.action = document.createElement('button');
        this.icon = document.createElement('teste'); // verificar como será implementado
        this.text = document.createElement('p');
    }

    setup(config) {
        this.text.textContent = config['name'];
        this.action.onclick = config['function'];
        // this.setIcon(icon);
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
