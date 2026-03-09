// tabs para alternar entre seções
import BaseComponent from './baseComponent.js';
export default class ComponentTab extends BaseComponent {
    constructor(style_config = {}) {
        const STYLE_CONFIG_FINAL = {
            main: style_config.main || [],
            button: style_config.button || [],
            icon: style_config.icon || [],
            text: style_config.text || [],
        };

        super(STYLE_CONFIG_FINAL);
    }

    spawn() {
        this.main = document.createElement('div');

        this.elements = {
            button: document.createElement('button'),
            icon: document.createElement('i'),
            text: document.createElement('p'),
        };
    }

    style(style_config) {
        this.main.classList.add(...[], ...style_config.main);
        this.elements.button.classList.add(...[], ...style_config.button);
        this.elements.icon.classList.add(...[], ...style_config.icon);
        this.elements.text.classList.add(...[], ...style_config.text);
    }

    build() {
        this.elements.button.replaceChildren(
            this.elements.icon,
            this.elements.text
        );
        this.main.replaceChildren(this.elements.button);
    }

    updateName(_name = 'default') {
        this.elements.text.textContent = _name;
    }

    setFunction(
        _event = 'click',
        _function = () => {
            alert('Não foi implementado');
        }
    ) {
        const signal = this.signal;
        this.elements.button.addEventListener(_event, _function, { signal });
    }
}
