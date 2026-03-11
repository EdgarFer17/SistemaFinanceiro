// Criação do header da aplicação
import BaseComponent from './components/BaseComponent.js';
import { HEADER } from '../style_config.js';

export default class Header extends BaseComponent {
    constructor() {
        const SCHEMA = {
            _tag: "header",
            brand_wrapper: {
                _tag: "div",
                brand_icon: "img",
                brand_name: "h1"
            },
            user_wrapper: {
                _tag: "button",
                user_icon: "img",
                user_name: "h2",
                user_post_icon: "img"
            }
        }
        super(SCHEMA, HEADER);
    }

    updateBrandName(_name = 'New Dashboard') {
        BaseComponent.updateText(_name, this.elements.brand_name);
    }

    updateUsername(_username = 'New User') {
        BaseComponent.updateText(_username, this.elements.user_name);
    }

    setModalFunction(
        _function = () => {
            alert('Ainda não foi implementada');
        }
    ) {
        this.setEvent('click', _function, this.elements.user_wrapper);
    }
}
