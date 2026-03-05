// tabs para alternar entre seções
import BaseComponent from './baseComponent';
export default class ComponentTab extends BaseComponent {
    constructor(config) {
        super(config);
    }

    spawn() {
        this.main = document.createElement('div');
        this.action = document.createElement('button');
        this.icon = document.createElement(''); // verificar como será implementado
        this.text = document.createElement('p');
    }

    setup(config) {
        this.text.textContent = config['name'];
        this.action.onclick(config['function']);
        // this.setIcon(icon);
    }

    style() {
        // BOOTSTRAP

        this.main.className = '';
        this.main.classList.add(...[]);

        this.button.className = '';
        this.button.classList.add(...[]);

        this.icon.className = '';
        this.icon.classList.add(...[]);

        this.text.className = '';
        this.text.classList.add(...[]);
    }

    build() {
        this.action.replaceChildren(this.icon, this.text);
        this.main.replaceChildren(this.action);
    }
}
