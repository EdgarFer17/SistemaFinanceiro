// Botão abas que alterna entre seções da navegação lateral
import BaseComponent from './baseComponent.js';
export default class ComponentTab extends BaseComponent {
    constructor(config, style_config) {
        config.style_config = style_config;
        super(config, style_config.inactive);
    }

    spawn() {
        this.main = document.createElement('div');
        this.action = document.createElement('button');
        this.icon = document.createElement('img');
        this.text = document.createElement('p');
    }

    // Configura o nome, ícone, ação e estado inicial da aba
    setup(config) {
        this.style_config = config.style_config;
        this.icons = [];
        this.is_active = false;
        this.text.textContent = config['name'];
        this.setFunction('click', ()=>{config['function']()}, this.action);
        this.icons.push(config.icon_src);
        this.icons.push(config.icon_src_active);
        this.icon.src = config.icon_src;
        this.icon.alt = config.icon_alt;
    }

    // Aplica estilos Bootstrap para estado inativo ou ativo
    style(style_config = { main: [], button: [], icon: [], text: [] }) {

        this.main.className = "";
        this.action.className = "";
        this.icon.className = "";
        this.text.className = "";
        this.main.classList.add(...[], ...style_config.main);
        this.action.classList.add(...[], ...style_config.button);
        this.icon.classList.add(...[], ...style_config.icon);
        this.text.classList.add(...[], ...style_config.text);
    }

    // Monta botão com ícone e texto
    build() {
        this.action.replaceChildren(this.icon, this.text);
        this.main.replaceChildren(this.action);
    }

    // Altera a imagem do ícone
    updateIcon(_src, _alt) {
        this.icon.src = _src
        this.icon.alt = _alt
    }

    // Marca aba como ativa/inativa e atualiza ícone e estilos
    changeStatus(_status) {
        this.is_active = _status;
        this.updateIcon(this.icons[this.is_active?1:0], this.icon.alt);
        this.style(this.is_active ? this.style_config.active : this.style_config.inactive);
    }
}
