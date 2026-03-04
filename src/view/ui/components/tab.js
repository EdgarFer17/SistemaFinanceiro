// tabs para alternar entre seções

/*
div { n tab(s) }
    button (full)
        {icon -> svg ou Font Awesome}
        p
*/

export default class ComponentTab {
    constructor(name, func) {
        this.main = document.createElement('div');
        this.action = document.createElement('button');
        this.icon = document.createElement(''); // verificar como será implementado
        this.text = document.createElement('p');

        this.loadContent(name, func);
    }

    loadContent(name, func) {
        this.action.innerHTML = "";
        this.action.appendChild(this.icon);
        this.action.appendChild(this.text);

        this.main.innerHTML = "";
        this.main.appendChild(this.action);

        this.construct(name, func);
        this.style();
    }

    construct(name, func) {
        this.text.textContent = name;
        this.action.onclick(func);
        // this.setIcon(this.config.structure.icon);
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