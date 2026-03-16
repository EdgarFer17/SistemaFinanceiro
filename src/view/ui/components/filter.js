import BaseComponent from "./baseComponent.js";

export default class ComponentFilter extends BaseComponent {

    constructor(config, style_config) {
        super(config, style_config);
    }


    spawn() {
        this.main = document.createElement('div');
        this.title = document.createElement('h4');
        this.select = document.createElement('select');
        this.button = document.createElement('button');
        this.options = [];
    }

    setup(config) {
        this.title.textContent = config.title || "Categoria";
        this.button.textContent = config.button || "Buscar";
        this.select.replaceChildren(...this.options);
    }

    style(style_config = { main: [], title: [], select: [], button: [] }) {
        this.main.classList.add(...[], ...style_config.main);
        this.title.classList.add(...[], ...style_config.title);
        this.select.classList.add(...[], ...style_config.select);
        this.button.classList.add(...[], ...style_config.button);
    }

    build() {
        this.main.replaceChildren(this.title, this.select, this.button);
    }

    addOptions(option = {name: "Default", value: "default"}) {
        const OPTION = document.createElement('option');
        OPTION.textContent = option.name;
        OPTION.value = option.value;
        this.options.push(OPTION);
        this.select.appendChild(OPTION);
    }

    addEvent(_function) {
        const SIGNAL = this.controller.signal;
        this.button.addEventListener('click', ()=>{_function()}, { SIGNAL });
    }
}