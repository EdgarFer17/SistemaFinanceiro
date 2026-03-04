// tabs para alternar entre seções

export default class ComponentTab {

    constructor(config) {
        this.main = document.createElement('div');
        this.action = document.createElement('button');
        this.icon = document.createElement(''); // verificar como será implementado
        this.text = document.createElement('p');

        this.construct(config);
        this.load();
    }

    construct(config) {
        this.text.textContent = config["name"];
        this.action.onclick(config["function"]);
        // this.setIcon(icon);
    }

    load() {
        this.action.innerHTML = "";
        this.action.appendChild(this.icon);
        this.action.appendChild(this.text);

        this.main.innerHTML = "";
        this.main.appendChild(this.action);

        this.style();
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