// will be used to centralize the build of the entire application

import Header from './ui/header.js';
import SideNav from './ui/sidenav.js';
import PageState from '../repository/pageState.js';
import Category from './ui/category.js'
import Transaction from './ui/transaction.js';
import Dashboard from './ui/dashboard.js';
import ModalReport from './ui/modal/report.js';

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
        this.header_style_config = {
            header: ["bg-light", "py-3", "shadow"],
            header_wrapper: ["container-fluid", "d-flex", "justify-content-between", "align-items-center"],
            brand_wrapper: ["d-flex", "align-items-center", "gap-2"],
            brand_icon: ["rounded-circle", "brandIcon"],
            brand_name: ["h5", "mb-0", "fw-bold", "text-primary"],
            user_wrapper: ["btn", "border-0", "d-flex", "align-items-center", "gap-2", "px-3", "py-1", "rounded-pill", "bg-transparent"],
            user_icon: ["rounded-circle", "border"],
            user_name: ["fs-6", "mb-0", "text-secondary", "fw-medium"],
            user_post_icon: ["ms-1"],
        }
        this.sidenav_config = {
            tab: {
                config: [
                    {
                        name: 'Dashboard',
                        icon_src: './assets/Dashboard.png',
                        icon_alt: 'Botão de Dashboard',
                        function: () => {
                            this.buildPage("Dashboard");
                            PageState.save("Dashboard");
                        },
                    },
                    {
                        name: 'Categorias',
                        icon_src: './assets/Category.png',
                        icon_alt: 'Botão de Categorias',
                        function: () => {
                            this.buildPage("Category");
                            PageState.save("Category");
                        },
                    },
                    {
                        name: 'Transações',
                        icon_src: './assets/Transaction.png',
                        icon_alt: 'Botão de Transações',
                        function: () => {
                            this.buildPage("Transaction");
                            PageState.save("Transaction");
                        },
                    },
                ],
                style_config: {
                    main: ["tabMain", "nav-link", "d-flex", "py-2", "px-3", "rounded-3"],
                    button: ["btn", "w-100", "border-0", "bg-transparent", "text-white", "d-flex", "align-items-center"],
                    icon: ["tabIcon", "me-3"],
                    text: ["tabText", "fw-medium", "mb-0"] 
                }
            },
            footer: ['© 2026 TargetFinance', 'Todos os direitos reservados.'],
        }
        this.sidenav_style_config = {
            aside: ["navbar", "vh-100", "d-flex", "flex-column", "p-0", "bg-primary"],
            toggle_wrapper: ["toggleWrapper", "btn", "border-0", "bg-transparent", "align-self-end", "w-25", "text-end", "pt-2"],
            toggle_icon: ["img-fluid"], 
            tab_wrapper: ["nav", "flex-column", "w-100", "mt-3", "px-3", "gap-1"],
            footer: ["navbarFooter", "d-flex", "flex-column", "mt-auto", "text-white-50", "text-center", "mb-3", "w-100", "px-2", "small"], 
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
        this.modal_wrapper = document.createElement('div');

        this.pages = {
            Dashboard: new Dashboard(),
            Category: new Category({}),
            Transaction: new Transaction({}),
        }
        this.modals = {
            Report: new ModalReport({}),
        }
        
        this.header = new Header(this.header_config, this.header_style_config);
        this.sidenav = new SideNav(this.sidenav_config, this.sidenav_style_config);
    }

    build() {
        this.buildPage(PageState.load())
        this.wrapper.replaceChildren(this.sidenav.aside, this.page);
        this.body.replaceChildren(this.header.header, this.wrapper, this.modal_wrapper);
    }

    buildPage(page) {
        const PAGE = this.pages[page];
        if (PAGE) {
            this.page.replaceChildren(PAGE.main);
        }
    }

    style() {
        // BOOTSTRAP

        this.body.classList.add(...[]);

        this.html.classList.add(...[]);

        this.page.classList.add(...[]);

        this.wrapper.classList.add(...["d-flex"]);
    }
}

const APP = new App()
export default APP
