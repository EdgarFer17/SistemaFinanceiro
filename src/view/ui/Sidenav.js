// Criação da barra de navegação lateral
import ComponentTab from './components/Tab.js';
import BaseComponent from './components/BaseComponent.js';
import { SIDENAV } from '../style_config.js';

export default class SideNav extends BaseComponent {
    constructor() {
        const SCHEMA = {
            _tag: "aside",
            toggle_wrapper: {
                _tag: "button",
                toggle_icon: "img",
            },
            tab_wrapper: "nav",
            footer: "footer"
        }
        super(SCHEMA, SIDENAV);
        this.footer_content = [];
        this.tabs = [];
        this.is_collapsed = false;
        this.setEvent('click', ()=>{this.collapse()}, this.elements.toggle_wrapper)
    }

    addTab(_config) {
        const TAB = new ComponentTab();
        TAB.setFunction('click', _config.function);
        TAB.updateIcon(_config.src_inactive, _config.alt)
        TAB.updateName(_config.name);
        TAB.icons.push(_config.src_inactive);
        TAB.icons.push(_config.src_active);
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

    collapse() {
        if (this.is_collapsed) {
            this.main.classList.remove("navbarCollapsed")
            this.is_collapsed = false;
        } else {
            this.main.classList.add("navbarCollapsed")
            this.is_collapsed = true;
        }
    }

    updateToggleIcon(_src, _alt){
        BaseComponent.updateImg(_src, _alt, this.elements.toggle_icon)
    }
}
