// will be used to centralize the build of the entire application

import Header from './ui/Header.js';
import SideNav from './ui/Sidenav.js';
import PageState from '../repository/PageState.js';
import Dashboard from './ui/Dashboard.js';
import Transaction from './ui/Transaction.js'
import Category from './ui/Category.js'
import { APP } from './style_config.js';
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
            new Transaction(),
            new Category(),
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
                src_inactive: './assets/Dashboard.svg',
                src_active: './assets/DashboardActive.svg',
                alt: 'Dashboard Icon',
            }
        );
        this.sidenav.addTab(
            {
                name: 'Categorias',
                function: () => {
                    this.buildPage(1);
                    PageState.save(1);
                },
                src_inactive: './assets/Category.svg',
                src_active: './assets/CategoryActive.svg',
                alt: 'Category Icon',
            }
        );
        this.sidenav.addTab(
            {
                name: 'Transações',
                function: () => {
                    this.buildPage(2);
                    PageState.save(2);
                },
                src_inactive: './assets/Transaction.svg',
                src_active: './assets/TransactionActive.svg', 
                alt: 'Transaction Icon',
            }
        );
        this.sidenav.updateToggleIcon('./assets/Menu.svg', "Navbar Toggle")
        this.sidenav.tabs.at(PageState.load()).changeStatus();

        this.header.updateBrandName();
        this.header.updateBrandIcon("./assets/brandIcon.svg", "icone da marca");
        this.header.updateUserIcon("./assets/Profile.svg", "icone da marca");
        this.header.updateUserPostIcon("./assets/Back.svg", "icone da marca");
        this.header.updateUsername();
        this.header.setModalFunction();

        const DASHBOARD = this.pages.at(0);
        DASHBOARD.updateTitle(`Bem Vindo, ${this.user_config.username}`)
        DASHBOARD.updateShowIcon('./assets/Eye.svg', 'alternar a visibilidade dos dados')
        DASHBOARD.updateReportIcon('./assets/DashboardGauge.svg', 'abrir modal contendo o relatório mensla')
        DASHBOARD.updateBarTitle("Evolução Mensal")
        DASHBOARD.updateTransactionTitle("Últimas 5 Transações")
    }

    build() {
        this.buildPage(PageState.load());
        this.wrapper.replaceChildren(this.sidenav.main, this.page);
        this.body.replaceChildren(this.header.main, this.wrapper);
    }

    buildPage(page_index) {
        if (page_index >= 0 && page_index < this.pages.length) {
            for (const TAB of this.sidenav.tabs) {
                TAB.changeStatus(false);
            }
            this.sidenav.tabs.at(page_index).changeStatus(true);
            this.page.replaceChildren(this.pages.at(page_index).main);
        }
    }

    style() {
        // BOOTSTRAP

        this.body.classList.add(...APP.body);
        this.html.classList.add(...APP.html);
        this.page.classList.add(...APP.page);
        this.wrapper.classList.add(...APP.wrapper);
    }
}

const Application = new App();
export default Application;
