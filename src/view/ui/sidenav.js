// Criação da barra de navegação lateral
import ComponentTab from './components/tab.js';
import BaseComponent from './components/baseComponent.js';
export default class SideNav extends BaseComponent {
    constructor(config, style_config) {
        super(config, style_config);
    }

    spawn() {
        this.aside = document.createElement('aside');
        this.tab_wrapper = document.createElement('div');
        this.footer = document.createElement('footer');

        this.footer_content = [];
        this.tabs = [];
    }

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
        for (const TAB of config.tab) {
            this.tabs.push(new ComponentTab(TAB));
        }
    }

    style(style_config = { aside: [], tab_wrapper: [], footer: [] }) {
        // BOOTSTRAP

        this.aside.classList.add(...[], ...style_config.aside);

        this.tab_wrapper.classList.add(...[], ...style_config.tab_wrapper);

        this.footer.classList.add(...[], ...style_config.footer);
    }

    build() {
        if (this.tabs.length > 0) {
            this.tab_wrapper.replaceChildren(
                ...this.tabs.map((component) => component.main)
            );
        }
        this.footer.replaceChildren(...this.footer_content);
        this.aside.replaceChildren(this.tab_wrapper, this.footer);
    }
}
