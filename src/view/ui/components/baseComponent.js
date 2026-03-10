export default class BaseComponent {
    constructor(style_config) {
        if (!style_config)
            throw new Error('Um objeto style_config é obrigatório');

        this.controller = new AbortController();
        this.signal = this.controller.signal;
        
        this.elements = {};
        this.style_config = style_config;

        this.spawn();
        this.style();
        this.build();
    }

    spawn() {
        throw new Error('Implemente o método spawn()!');
    }

    style() {
        throw new Error('Implemente o método style(config)!');
    }

    build() {
        throw new Error('Implemente o método build()!');
    }

    destroy() {
        if (this.main) {
            this.controller.abort()
            this.main.remove();
        } else {
            throw new Error('Implemente um elemento pai, dentro de this.main!');
        }
    }

    static updateImg(_path, _alt, _element) {
        if (typeof _path !== "string" || typeof _alt !== "string") {return false}
        this.elements._element.src = _path;
        this.elements._element.alt = _alt;
    }

    static updateText(_text, _element) {
        if (typeof _text !== "string") {return false}
        this.elements._element.textContent = _text;
        return true;
    }
}
