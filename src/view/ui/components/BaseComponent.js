export default class BaseComponent {
    constructor(schema, style_config) {
        
        this.controller = new AbortController();
        
        this.elements = {};
        this.style_config = style_config;

        this.main = this.#parseSchema("main", schema);
        // delete this.elements.main;
        this.#style(style_config);
    }

    destroy() {
        if (this.main) {
            this.controller.abort()
            this.main.remove();
        } else {
            throw new Error('Implemente um elemento pai, dentro de this.main!');
        }
    }

    #parseSchema(name, schema) {
        const IS_OBJECT = typeof schema === "object" && schema !== null;

        if (IS_OBJECT && schema.constructor.name !== "Object") { 
            this.elements[name] = schema;
            return schema.main
        }

        const TAG_NAME = IS_OBJECT ? schema._tag : schema;
        if (TAG_NAME === undefined) {
            throw new Error("Schema inválido, envie seguindo o padrão");
        }
        const EL = document.createElement(TAG_NAME);
        this.elements[name] = EL;
        if (IS_OBJECT) {
            for (const KEY in schema) {
                if (KEY !== "_tag") {
                    const CHILD_EL = this.#parseSchema(KEY, schema[KEY]);
                    EL.appendChild(CHILD_EL);
                }
            }
        }
        return EL;
    }
    
    #style(style_config) {
        const MAIN_CLASSES = style_config["main"];
        if (MAIN_CLASSES !== undefined) {
            this.main.classList.add(...MAIN_CLASSES);
        }
        
        for (const [NAME, CLASSES] of Object.entries(style_config)) {
            const EL = this.elements[NAME];
            if (!(EL instanceof HTMLElement)) {
                console.error(`Há uma estilização errada, ajuste para evitar erros: ${NAME}. retire para funcionar!`)
            }
            
            if (EL && Array.isArray(CLASSES)) {
                EL.classList.add(...CLASSES);
            }
        }
    }

    static updateImg(_path, _alt, _element) {
        if (typeof _path !== "string" || typeof _alt !== "string") {return false}
        _element.src = _path;
        _element.alt = _alt;
    }

    static updateText(_text, _element) {
        if (typeof _text !== "string") {return false}
        _element.textContent = _text;
        return true;
    }

    setEvent(_event, _function, _element) {
        const SIGNAL = this.controller.signal;
        _element.addEventListener(_event, _function, { SIGNAL });
    }
}
