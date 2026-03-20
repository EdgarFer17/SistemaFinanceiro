// will be used to centralize the build of the entire application

import Header from './ui/header.js';
import SideNav from './ui/sidenav.js';
import PageState from '../repository/pageState.js';
import Category from './ui/category.js'
import Transaction from './ui/transaction.js';
import Dashboard from './ui/dashboard.js';
import ModalReport from './ui/modal/report.js';
import CreateCategoriesDefault from '../db/createDefaultCategories.js';

CreateCategoriesDefault.create();

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
                        icon_src_active: './assets/DashboardActive.png',
                        icon_src: './assets/Dashboard.png',
                        icon_alt: 'Botão de Dashboard',
                        function: () => {
                            this.buildPage("Dashboard", 0);
                            PageState.save("Dashboard");
                        },
                    },
                    {
                        name: 'Categorias',
                        icon_src_active: './assets/CategoryActive.png',
                        icon_src: './assets/Category.png',
                        icon_alt: 'Botão de Categorias',
                        function: () => {
                            this.buildPage("Category", 1);
                            PageState.save("Category");
                        },
                    },
                    {
                        name: 'Transações',
                        icon_src_active: './assets/TransactionActive.png',
                        icon_src: './assets/Transaction.png',
                        icon_alt: 'Botão de Transações',
                        function: () => {
                            this.buildPage("Transaction", 2);
                            PageState.save("Transaction");
                        },
                    },
                ],
                style_config: {
                    inactive: {
                        main: ["tabMain", "nav-link", "d-flex", "py-2", "px-3", "rounded-3"],
                        button: ["btn", "w-100", "border-0", "bg-transparent", "text-white", "d-flex", "align-items-center"],
                        icon: ["tabIcon", "me-3"],
                        text: ["tabText", "fw-medium", "mb-0"] 
                    },
                    active: {
                        main: ["tabMain", "nav-link", "bg-white", "d-flex", "align-items-center", "rounded-3", "py-2", "px-3", "shadow-sm"],
                        button: ["d-flex", "bg-white", "align-items-center", "border-0", "text-primary", "w-100"],
                        icon: ["tabIcon", "tabIcon", "me-3"],
                        text: ["tabText", "fw-bold", "mb-0"],
                    }
                }
            },
            footer: ['© 2026 TargetFinance', 'Todos os direitos reservados.'],
        }
        this.sidenav_style_config = {
            main: ["navbar", "vh-100", "d-flex", "flex-column", "p-0", "bg-primary"],
            toggle_wrapper: ["toggleWrapper", "btn", "border-0", "bg-transparent", "align-self-end", "w-25", "text-end", "pt-2"],
            toggle_icon: ["img-fluid"], 
            tab_wrapper: ["nav", "flex-column", "w-100", "mt-3", "px-3", "gap-1"],
            footer: ["navbarFooter", "d-flex", "flex-column", "mt-auto", "text-white-50", "text-center", "mb-3", "w-100", "px-2", "small"], 
        }

        this.dashboard_style_config = {
            main: ["d-flex", "flex-column", "align-items-center"]
        }

        this.spawn()
        this.setup()
        this.style()
        this.build()
    }

    spawn() {
        this.html = document.querySelector('html');
        this.body = document.querySelector('body');
        this.wrapper = document.createElement('div');
        this.page = document.createElement('main');
        this.modal_wrapper = document.createElement('div');

        this.pages = {
            Dashboard: new Dashboard({}, this.dashboard_style_config),
            Category: new Category(),
            Transaction: new Transaction(),
        }
        this.modals = {
            Report: new ModalReport(),
        }
        
        this.header = new Header(this.header_config, this.header_style_config);
        this.sidenav = new SideNav(this.sidenav_config, this.sidenav_style_config);
    }

    setup() {
        this.pages["Dashboard"].setReportFunction(()=>{this.toggleModal("Report")})
        this.pages["Transaction"].setAddTransactionFunction((dataDaLinha) => { 
                this.modals["Report"].prepareModal(dataDaLinha); 
                this.toggleModal("Report");
            });
        this.modal_wrapper.addEventListener('click', () => this.toggleModal)
        this.modal_wrapper.addEventListener('fecharModal', () => this.toggleModal());
    }

    build() {
        this.buildPage(PageState.load())
        this.wrapper.replaceChildren(this.sidenav.main, this.page);
        this.body.replaceChildren(this.header.header, this.wrapper, this.modal_wrapper);
    }

    buildPage(page, index) {
        const PAGE = this.pages[page];
        if (PAGE) {
            for (const TAB of this.sidenav.tabs) {
                TAB.changeStatus(false);
            }
            this.sidenav.tabs.at(index).changeStatus(true);
            this.page.replaceChildren(PAGE.main);
        }
    }
    
    
    toggleModal(modal) {
        if (modal === undefined) {
            this.modal_wrapper.replaceChildren();
            this.modal_wrapper.classList.remove("show_modal");
        } else {
            const MODAL = this.modals[modal];
            if (!MODAL) {
                throw new Error(`Modal Inválido: ${modal}\nModais Disponíveis: ${this.modals}`);
            }
            this.modal_wrapper.replaceChildren(MODAL.main)
            this.modal_wrapper.classList.add("show_modal");
        }
    }

    style() {
        // BOOTSTRAP
        this.body.classList.add(...[]);
        this.html.classList.add(...[]);
        this.wrapper.classList.add(...["d-flex"]);
        this.page.classList.add(...["flex-grow-1", "w-100"]);
        this.page.classList.add(...[]);
        this.modal_wrapper.classList.add(...["modal-1"]);
    }
}

const APP = new App()
export default APP
