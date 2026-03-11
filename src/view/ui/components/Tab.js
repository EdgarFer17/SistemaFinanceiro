// tabs para alternar entre seções
import BaseComponent from './BaseComponent.js';
import { TAB } from '../../style_config.js';

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

        super(SCHEMA, TAB);
    }

    updateName(_name = 'default') {
        BaseComponent.updateText(_name, this.elements.text);
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
