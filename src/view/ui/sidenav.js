// Criação da barra de navegação lateral
import ComponentTab from './components/tab.js';
import BaseComponent from './components/baseComponent.js';
export default class SideNav extends BaseComponent {
    constructor(style_config = {}) {
        const STYLE_CONFIG_FINAL = {
            main: style_config.main || [],
            tab_wrapper: style_config.tab_wrapper || [],
            footer: style_config.footer || [],
        };

        super(STYLE_CONFIG_FINAL);
    }

    spawn() {
        this.main = document.createElement('aside');

        this.elements = {
            tab_wrapper: document.createElement('div'),
            footer: document.createElement('footer'),
            footer_content: [],
            tabs: [],
        };
    }

    style(style_config) {
        // BOOTSTRAP

        this.main.classList.add(...[], ...style_config.main);
        this.elements.tab_wrapper.classList.add(
            ...[],
            ...style_config.tab_wrapper
        );
        this.elements.footer.classList.add(...[], ...style_config.footer);
    }

    build() {
        if (this.elements.tabs.length > 0) {
            this.elements.tab_wrapper.replaceChildren(
                ...this.elements.tabs.map((component) => component.main)
            );
        }
        this.elements.footer.replaceChildren(...this.elements.footer_content);
        this.main.replaceChildren(
            this.elements.tab_wrapper,
            this.elements.footer
        );
    }

    addTab(config, style_config) {
        const TAB = new ComponentTab(style_config);
        TAB.setFunction('click', config.function);
        TAB.updateName(config.name);
        this.elements.tabs.push(TAB);
        this.elements.tab_wrapper.appendChild(TAB.main);
    }

    addFooterText(_text, style_config = []) {
        const SMALL = document.createElement('small');
        SMALL.textContent = _text || 'default';
        SMALL.classList.add(...style_config);
        this.elements.footer_content.push(SMALL);
        this.elements.footer.appendChild(SMALL);
    }
}
