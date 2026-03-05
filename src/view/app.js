// will be used to centralize the build of the entire application

import Header from './ui/header';
import SideNav from './ui/sidenav';

class App {
    constructor() {
        this.html = document.querySelector('html');
        this.body = document.querySelector('body');

        // eslint-disable-next-line
        this.dashboard = new Dashboard();
        // eslint-disable-next-line
        this.transaction = new Transaction();
        // eslint-disable-next-line
        this.category = new Category();

        this.header = new Header({
            brand_icon: null,
            app_name: 'TargetFinance',
            username: 'Novo Usuário',
            user_modal_function: () => {
                'funcão que ativa o modal do usuario';
            },
        });

        this.wrapper = document.createElement('div');
        this.sidenav = new SideNav({
            tab: [
                {
                    name: 'Dashboard',
                    icon: null,
                    function: () => {
                        this.buildPage(this.dashboard);
                    },
                },
                {
                    name: 'Categorias',
                    icon: null,
                    function: () => {
                        this.buildPage(this.category);
                    },
                },
                {
                    name: 'Transações',
                    icon: null,
                    function: () => {
                        this.buildPage(this.transaction);
                    },
                },
            ],
            footer: ['© 2026 TargetFinance', 'Todos os direitos reservados.'],
        });
        this.page = document.createElement('main');

        this.style();
    }

    build() {
        this.wrapper.replaceChildren(this.sidenav, this.content);
        this.body.replaceChildren(this.header, this.wrapper);
    }

    buildPage(page) {
        this.page.innerHTML = '';
        this.page.appendChild(page);
    }

    style() {
        // BOOTSTRAP

        this.body.classList.add(...[]);

        this.html.classList.add(...[]);

        this.page.classList.add(...[]);

        this.wrapper.classList.add(...[]);
    }
}

export default new App();
