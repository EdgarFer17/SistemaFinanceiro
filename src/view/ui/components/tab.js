// tabs para alternar entre seções

export default class ComponentTab {

    constructor(config) {
        this.main = document.createElement('div');
        this.action = document.createElement('button');
        this.icon = document.createElement(''); // verificar como será implementado
        this.text = document.createElement('p');

        this.construct(config);
        this.style();
        this.load();
    }

    construct(config) {
        this.text.textContent = config["name"];
        this.action.onclick(config["function"]);
        // this.setIcon(icon);
    }

    load() {
        this.action.replaceChildren(this.icon, this.text);
        this.main.replaceChildren(this.action);
    }

    style() {
        // BOOTSTRAP
        
        this.main.className = "";
        this.main.classList.add([

        ]);

        this.button.className = "";
        this.button.classList.add([

        ]);

        this.icon.className = "";
        this.icon.classList.add([

        ]);

        this.text.className = "";
        this.text.classList.add([

        ]);
    }
}