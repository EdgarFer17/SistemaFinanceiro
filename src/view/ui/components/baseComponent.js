export default class BaseComponent {
    constructor(style_config) {
        if (!style_config)
            throw new Error('Um objeto style_config é obrigatório');

        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.main;

        this.spawn();
        this.style(style_config);
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
            this.main.remove();
        } else {
            throw new Error('Implemente um elemento pai, dentro de this.main!');
        }
    }
}
