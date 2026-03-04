// Criação da barra de navegação lateral
import ComponentTab from './components/tab'

export default class SideNav {
    constructor(config) {
        this.aside = document.createElement('aside');
        this.tab_wrapper = document.createElement('div')
        this.footer = document.createElement('footer');
        
        this.footer_content = [];
        this.tabs = [];

        this.construct(config);
        this.loadContent();
    }

    construct(config) {
        // Footer
        for (const text of config.footer) {
            const element = document.createElement('small');
            element.textContent = text;
            
            element.className = "";
            element.classList.add([ // BOOTSTRAP

            ]);

            this.footer_content.push(element);
        }

        // Tabs
        for (const tab in config.tab) {
            this.tabs.push(new ComponentTab(tab["name"], tab["icon"], tab["function"]));
        }
    }

    load() {
        this.tab_wrapper.innerHTML = "";
        this.tabs.forEach((tab) => {
            this.tab_wrapper.appendChild(tab);
        });
        this.footer.innerHTML = "";
        this.footer_texts.forEach((small) => {
            this.footer.appendChild(small);
        });

        this.aside.innerHTML = "";
        this.aside.appendChild(this.tab_wrapper);
        this.aside.appendChild(this.footer);

        this.style();
    }

    style() {
        // BOOTSTRAP

        this.aside.className = "";
        this.aside.classList.add([

        ]);

        this.tab_wrapper.className = "";
        this.tab_wrapper.classList.add([

        ]);

        this.footer.className = "";
        this.footer.classList.add([
            
        ]);
    }
}