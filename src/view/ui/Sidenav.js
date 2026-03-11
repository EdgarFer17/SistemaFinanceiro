// Criação da barra de navegação lateral
import ComponentTab from './components/Tab.js';
import BaseComponent from './components/BaseComponent.js';
import { SIDENAV } from '../style_config.js';

export default class SideNav extends BaseComponent {
    constructor() {
        const SCHEMA = {
            _tag: "aside",
            tab_wrapper: "div",
            footer: "footer"
        }
        super(SCHEMA, SIDENAV);
        this.footer_content = [];
        this.tabs = [];
    }

    addTab(_config) {
        const TAB = new ComponentTab();
        TAB.setFunction('click', _config.function);
        TAB.updateName(_config.name);
        this.tabs.push(TAB);
        this.elements.tab_wrapper.appendChild(TAB.main);
    }

    addFooterText(_text, _style_config = []) {
        const SMALL = document.createElement('small');
        SMALL.textContent = _text || 'default';
        SMALL.classList.add(..._style_config);
        this.footer_content.push(SMALL);
        this.elements.footer.appendChild(SMALL);
    }
}
