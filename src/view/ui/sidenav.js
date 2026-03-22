// Barra de navegação lateral com abas e botão de colapso
import ComponentTab from './components/tab.js';
import BaseComponent from './components/baseComponent.js';
export default class SideNav extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
        this.disable_page = null;
    }

    spawn() {
        this.main = document.createElement('aside');
        this.toggle_wrapper = document.createElement('button');
        this.toggle_icon = document.createElement('img');
        this.tab_wrapper = document.createElement('div');
        this.footer = document.createElement('footer');

        this.footer_content = [];
        this.tabs = [];
    }

    // Cria abas de navegação e texto do rodapé
    setup(config) {
        // Footer
        for (const TEXT of config.footer) {
            const ELEMENT = document.createElement('small');
            ELEMENT.textContent = TEXT;

            ELEMENT.classList.add(
                ...[
                    // BOOTSTRAP
                ]
            );

            this.footer_content.push(ELEMENT);
        }

        // Tabs
        for (const TAB of config.tab.config) {
            this.tabs.push(new ComponentTab(TAB, config.tab.style_config));
        }

        this.setFunction('click', ()=>{this.collapse()}, this.toggle_wrapper)
        this.toggle_icon.src = './assets/Menu.png';
        this.toggle_icon.alt = 'Botão para minimizar/expandir o sidenav';
    }

    // Aplica estilos Bootstrap ao sidenav, abas e footer
    style(style_config = { main: [], tab_wrapper: [], footer: [], toggle_icon: [], toggle_wrapper: []}) {

        this.main.classList.add(...[], ...style_config.main);
        this.toggle_wrapper.classList.add(...[], ...style_config.toggle_wrapper);
        this.toggle_icon.classList.add(...[], ...style_config.toggle_icon);
        this.tab_wrapper.classList.add(...[], ...style_config.tab_wrapper);
        this.footer.classList.add(...[], ...style_config.footer);
    }

    // Monta o layout: botão toggle (topo), abas (meio), rodapé (base)
    build() {
        if (this.tabs.length > 0) {
            this.tab_wrapper.replaceChildren(
                ...this.tabs.map((component) => component.main)
            );
        }
        this.toggle_wrapper.replaceChildren(this.toggle_icon);
        this.footer.replaceChildren(...this.footer_content);
        this.main.replaceChildren(this.toggle_wrapper, this.tab_wrapper, this.footer);
    }

    // Alterna entre sidenav expandido e colapsado
    collapse() {
        if (this.is_collapsed) {
            this.main.classList.remove("navbarCollapsed")
            this.disable_page(true);
            this.is_collapsed = false;
        } else {
            this.main.classList.add("navbarCollapsed")
            this.disable_page(false);
            this.is_collapsed = true;
        }
    }

    setDisablePageFunction(_function) {
        this.disable_page = _function;
    }
}
