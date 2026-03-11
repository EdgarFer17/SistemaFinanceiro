// will be used to centralize the build of the entire application

import Header from './ui/header.js';
import SideNav from './ui/sidenav.js';
import PageState from '../repository/pageState.js';
import Dashboard from './ui/dashboard.js';

class App {
    constructor() {
        this.user_config = {"username": "Henry"}
        this.spawn();
        this.setup();
        this.build();
        this.style();
    }

    spawn() {
        this.html = document.querySelector('html');
        this.body = document.querySelector('body');
        this.page = document.createElement('main');
        this.wrapper = document.createElement('div');
        this.header = new Header();
        this.sidenav = new SideNav();
        this.pages = [
            new Dashboard(),
            // new Transaction(),
            // new Category(),
        ];
    }

    setup() {
        this.sidenav.addFooterText('© 2026 TargetFinance');
        this.sidenav.addFooterText('Todos os direitos reservados.');
        this.sidenav.addTab(
            {
                name: 'Dashboard',
                function: () => {
                    this.buildPage(0);
                    PageState.save(0);
                },
            },
            { icon: ['fa-solid', 'fa-crown'] }
        );
        this.sidenav.addTab(
            {
                name: 'Categorias',
                function: () => {
                    this.buildPage(1);
                    PageState.save(1);
                },
            },
            { icon: [] }
        );
        this.sidenav.addTab(
            {
                name: 'Transações',
                function: () => {
                    this.buildPage(2);
                    PageState.save(2);
                },
            },
            { icon: [] }
        );

        this.header.updateBrandName();
        this.header.updateUsername();
        this.header.setModalFunction();

        const DASHBOARD = this.pages.at(0);
        DASHBOARD.updateTitle(`Bem Vindo, ${user_config.username}`)
        DASHBOARD.updateShowIcon('./assets/showIcon.svg', 'alternar a visibilidade dos dados')
        DASHBOARD.updateReportIcon('./assets/showIcon.svg', 'abrir modal contendo o relatório mensla')
        DASHBOARD.updateBarTitle("Evolução Mensal")
        DASHBOARD.updateTransactionTitle("Últimas 5 Transações")
    }

    build() {
        this.buildPage(PageState.load());
        this.wrapper.replaceChildren(this.sidenav.main, this.page);
        this.body.replaceChildren(this.header.main, this.wrapper);
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

const APP = new App();
export default APP;
