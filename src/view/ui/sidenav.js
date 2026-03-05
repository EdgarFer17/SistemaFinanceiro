// Criação da barra de navegação lateral
import ComponentTab from './components/tab';
import BaseComponent from './components/baseComponent';
export default class SideNav extends BaseComponent {
    constructor(config) {
        super(config);
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

            ELEMENT.className = '';
            ELEMENT.classList.add(
                ...[
                    // BOOTSTRAP
                ]
            );

            this.footer_content.push(ELEMENT);
        }

        // Tabs
        for (const TAB in config.tab) {
            this.tabs.push(
                new ComponentTab(TAB['name'], TAB['icon'], TAB['function'])
            );
        }
    }

    style() {
        // BOOTSTRAP

        this.aside.className = '';
        this.aside.classList.add(...[]);

        this.tab_wrapper.className = '';
        this.tab_wrapper.classList.add(...[]);

        this.footer.className = '';
        this.footer.classList.add(...[]);
    }

    build() {
        if (this.tabs.length > 0) {
            this.tab_wrapper.replaceChildren(
                ...this.tabs.map((component) => component.main)
            );
        }
        this.footer.replaceChildren(...this.footer_texts);
        this.aside.replaceChildren(this.tab_wrapper, this.footer);
    }
}
