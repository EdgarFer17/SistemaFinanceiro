// Criação da barra de navegação lateral
import ComponentTab from './components/tab'

export default class SideNav {
    constructor(tab_config, footer_config) {
        this.aside = document.createElement('aside');
        this.tab_wrapper = document.createElement('div')
        this.footer = document.createElement('footer');
        
        this.footer_content = footer_config;
        this.tabs = tab_config;

        this.loadContent();
    }

    loadFooterContent() {
        const content_list = [];
        for (const text of this.footer_content) {
            const element = document.createElement('small')
            element.textContent = text;
            
            element.className = "";
            element.classList.add([ // BOOTSTRAP

            ]);

            content_list.push(element)
        }
        return content_list;
    }

    loadTabs() {
        const tab_list = [];
        for (const tab in this.tabs) {
            tab_list.push(new ComponentTab(tab["name"], tab["function"]));
        }
        return tab_list;
    }

    loadContent() {
        this.tab_wrapper.innerHTML = "";
        this.tabs.forEach((tab) => {
            this.tab_wrapper.appendChild(tab)
        });
        this.footer.innerHTML = "";
        this.footer_texts.forEach((small) => {
            this.footer.appendChild(small)
        });

        this.aside.innerHTML = "";
        this.aside.appendChild(this.tab_wrapper);
        this.aside.appendChild(this.footer);

        this.style();
    }

    style() {
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