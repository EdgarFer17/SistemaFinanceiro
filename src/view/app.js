// will be used to centralize the build of the entire application

import Header from './ui/header.js';
import SideNav from './ui/sidenav.js';
import PageState from '../repository/pageState.js';

class App {
    constructor() {
        this.header_config = {
            brand_icon: null,
            app_name: 'TargetFinance',
            username: 'Novo Usuário',
            user_modal_function: () => {
                'funcão que ativa o modal do usuario';
            },
        }
        this.sidenav_config = {
            tab: [
                {
                    name: 'Dashboard',
                    icon: null,
                    function: () => {
                        this.buildPage(0);
                        PageState.save(0);
                    },
                },
                {
                    name: 'Categorias',
                    icon: null,
                    function: () => {
                        this.buildPage(1);
                        PageState.save(1);
                    },
                },
                {
                    name: 'Transações',
                    icon: null,
                    function: () => {
                        this.buildPage(2);
                        PageState.save(2);
                    },
                },
            ],
            footer: ['© 2026 TargetFinance', 'Todos os direitos reservados.'],
        }

        this.spawn()
        this.build()
        this.style()
    }

    spawn() {
        this.html = document.querySelector('html');
        this.body = document.querySelector('body');
        this.wrapper = document.createElement('div');
        this.page = document.createElement('main');

        this.pages = [
            // new Dashboard(),
            // new Transaction(),
            // new Category(),
        ]
        
        this.header = new Header(this.header_config);
        this.sidenav = new SideNav(this.sidenav_config);
    }

    build() {
        this.buildPage(PageState.load())
        this.wrapper.replaceChildren(this.sidenav.aside, this.content);
        this.body.replaceChildren(this.header.header, this.wrapper);
    }

    buildPage(page_index) {
        if (page_index >= 0 && page_index < this.pages.length)
        this.page.replaceChildren(this.pages.at(page_index));
    }

    style() {
        // BOOTSTRAP

        this.body.classList.add(...[]);

        this.html.classList.add(...[]);

        this.page.classList.add(...[]);

        this.wrapper.classList.add(...[]);
    }
}

const APP = new App()
export default APP
