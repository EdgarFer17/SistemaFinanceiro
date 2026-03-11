// tabs para alternar entre seções
import BaseComponent from './BaseComponent.js';
import { TAB_ACTIVE, TAB_INACTIVE } from '../../style_config.js';

export default class ComponentTab extends BaseComponent {
    constructor() {
        const SCHEMA = {
            _tag: "div",
            button: {
                _tag: "button",
                icon: "img",
                text: "p"
            }
        }

        super(SCHEMA, TAB_INACTIVE);
        this.is_active = false;
        this.icons = []
    }

    updateName(_name = 'default') {
        BaseComponent.updateText(_name, this.elements.text);
    }

    updateIcon(_src, _alt) {
        BaseComponent.updateImg(_src, _alt, this.elements.icon);
    }

    changeStatus(_status) {
        this.is_active = _status;
        this.updateIcon(this.icons[this.is_active?1:0], this.elements.icon.alt);
        console.log(this.elements.icon)
        this.style(this.is_active ? TAB_ACTIVE : TAB_INACTIVE);
    }

    setFunction(
        _event = 'click',
        _function = () => {
            alert('Não foi implementado');
        }
    ) {
        this.setEvent(_event, _function, this.elements.button);
    }
}
