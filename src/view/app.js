// will be used to centralize the build of the entire application

import Header from './ui/header.js';
import SideNav from './ui/sidenav.js';
import PageState from '../repository/pageState.js';
import Category from './ui/category.js'
import Transaction from './ui/Transaction.js';
import Dashboard from './ui/dashboard.js';
import CreateCategoriesDefault from '../db/createDefaultCategories.js';
import CategoryModal from './ui/modal/categoryModal.js';
import TransactionModal from './ui/modal/TransactionModal.js';

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
            header_wrapper: ["container-fluid", "d-flex", "justify-content-between", "gap-2"],
            brand_wrapper: ["d-flex", "align-items-center", "gap-1"],
            brand_icon: ["brandIcon"],
            brand_name: ["h5", "m-0", "fw-bold", "text-primary"],
            user_wrapper: ["border-0", "d-flex", "align-items-center", "gap-1", "bg-transparent"],
            user_icon: ["rounded-circle", "border"],
            user_name: ["fs-6", "m-0", "text-primary", "fw-medium"],
            user_post_icon: ["img-fluid"],
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
                            this.buildPage("Dashboard");
                            PageState.save("Dashboard");
                        },
                    },
                    {
                        name: 'Categorias',
                        icon_src_active: './assets/CategoryActive.png',
                        icon_src: './assets/Category.png',
                        icon_alt: 'Botão de Categorias',
                        function: () => {
                            this.buildPage("Category");
                            PageState.save("Category");
                        },
                    },
                    {
                        name: 'Transações',
                        icon_src_active: './assets/TransactionActive.png',
                        icon_src: './assets/Transaction.png',
                        icon_alt: 'Botão de Transações',
                        function: () => {
                            this.buildPage("Transaction");
                            PageState.save("Transaction");
                        },
                    },
                ],
                style_config: {
                    inactive: {
                        main: ["nav-link", "d-flex", "rounded-3", "p-1"],
                        button: ["d-flex", "align-items-center", "bg-transparent", "border-0", "text-white", "gap-3", "p-0", "w-100"],
                        icon: ["tabIcon"],
                        text: ["tabText", "fw-medium", "mb-0"] 
                    },
                    active: {
                        main: ["nav-link", "bg-white", "rounded-3", "p-1"],
                        button: ["d-flex", "align-items-center", "bg-white", "border-0", "text-primary", "gap-3", "p-0", "w-100"],
                        icon: ["tabIcon"],
                        text: ["tabText", "fw-bold", "mb-0"],
                    }
                }
            },
            footer: ['© 2026 TargetFinance', 'Todos os direitos reservados.'],
        }
        this.sidenav_style_config = {
            main: ["navbar", "d-flex", "flex-column", "p-0", "bg-primary", "flex-shrink-0"],
            toggle_wrapper: ["toggleWrapper", "btn", "border-0", "align-self-end", "w-25", "p-2"],
            toggle_icon: ["img-fluid"], 
            tab_wrapper: ["nav", "flex-column", "w-100", "px-3", "gap-1"],
            footer: ["navbarFooter", "d-flex", "flex-column", "mt-auto", "text-white-50", "text-center", "mb-3", "w-100", "px-2", "small"], 
        }

        this.dashboard_style_config = {
            main: ["d-flex", "flex-column", "align-items-center", "w-100", "gap-5", "text-primary"],
            title_section: ["d-flex", "justify-content-between", "align-items-center", "w-100", "mt-5", "me-5", "ms-5"],
            title: ["fs-5", "ms-4"],
            ope_div: ["d-flex", "justify-content-end",  "me-4"],
            ope_report_button: ["btn", "border-0", "w-25"],
            ope_report_icon: ["img-fluid"],
            ope_show_button: ["btn", "border-0", "w-25"],
            ope_show_icon: ["img-fluid"],

            status_section: ["d-flex", "justify-content-around", "w-100", "mx-5", "fw-bold", "py-5"],
            vertical_rule_1: ["vr"],
            vertical_rule_2: ["vr"],
            balance_div: ["d-flex", "flex-column"],
            balance_title: ["align-self-end"],
            balance_currency: ["fs-5"],
            balance_value: ["text-black", "fs-2"],
            income_div: ["d-flex", "flex-column"],
            income_title: ["text-success", "align-self-end"],
            income_currency: ["fs-5"],
            income_value: ["text-black", "fs-2"],
            expense_div: ["d-flex", "flex-column"],
            expense_title: ["text-danger", "align-self-end"],
            expense_currency: ["fs-5"],
            expense_value: ["text-black", "fs-2"],

            donut_section: ["d-flex", "justify-content-around", "w-100", "p-5", "gap-5", "fw-medium"],
            donut_1_div: ["d-flex", "flex-column", "w-100"],
            donut_1_title: ["align-self-center", "fs-5"],
            donut_2_div: ["d-flex", "flex-column", "w-100"],
            donut_2_title: ["align-self-center", "fs-5"],

            bar_section: ["d-flex", "flex-column", "align-items-center", "w-100"],
            bar_title: [],
            
            transaction_section: ["d-flex", "flex-column", "align-items-center", "w-100"],
            transaction_title: [],
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
        this.page = document.createElement('div');
        this.modal_wrapper = document.createElement('div');

        this.pages = {
            Dashboard: new Dashboard({}, this.dashboard_style_config),
            Category: new Category(),
            Transaction: new Transaction(),
        }
        this.modals = {
            Transaction: new TransactionModal({toggleModal: ()=>{this.toggleModal()}}),
            Category: new CategoryModal()
        }
        
        this.header = new Header(this.header_config, this.header_style_config);
        this.sidenav = new SideNav(this.sidenav_config, this.sidenav_style_config);
    }

    setup() {
        this.modal_wrapper.addEventListener('click', (e)=>{
            if (e.target === this.modal_wrapper) {
                this.toggleModal();
            }
        });

        this.pages.Dashboard.updateTitle("Bem-vindo, Nome do Usuário");
        this.pages.Dashboard.renderLastTransactions();
        
        window.addEventListener('resize', () => {
            this.pages.Dashboard.elements.bar_component.bar.resize();
            this.pages.Dashboard.elements.donut_1_component.donut.resize();
            this.pages.Dashboard.elements.donut_2_component.donut.resize();
        });
        
        this.pages["Transaction"].setModal((_, data) => {
            this.modals["Transaction"].prepareModal(data); 
            this.toggleModal("Transaction");
        });
        
        this.pages["Dashboard"].setModal(()=>{this.toggleModal("Report")});
        this.pages["Category"].setModal(()=>{this.toggleModal("Category")});
    }

    build() {
        this.buildPage(PageState.load())
        this.wrapper.replaceChildren(this.sidenav.main, this.page);
        this.body.replaceChildren(this.header.header, this.wrapper, this.modal_wrapper);
    }

    buildPage(page) {
        const PAGE = this.pages[page];
        if (PAGE) {
            for (const TAB of this.sidenav.tabs) {
                TAB.changeStatus(false);
            }
            const index = Object.keys(this.pages).indexOf(page)

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
        this.wrapper.classList.add(...["d-flex", "min-vh-100","h-auto"]);
        this.page.classList.add(...["d-flex", "flex-grow-1"]);
        this.modal_wrapper.classList.add(...["modal-1"]);
        this.body.style.backgroundColor = "#f4f7f6"; 
        this.body.style.margin = "0";
        this.body.style.minHeight = "100vh";
        this.wrapper.style.backgroundColor = "transparent";
        this.page.style.backgroundColor = "transparent";
        this.page.style.marginTop = "20px";
        this.page.classList.add("flex-grow-1");
    }
}

const APP = new App()
export default APP
