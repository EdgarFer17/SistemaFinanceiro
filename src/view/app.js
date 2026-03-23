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
import { getMockTransaction } from '../config/mock.js';
import ReportModal from './ui/modal/reportModal.js';

CreateCategoriesDefault.create();

getMockTransaction(1000, 10, 350, 280)

// Classe principal que inicializa e gerencia toda a aplicação
class App {
    constructor() {
        // Configuração do setup do header
        this.header_config = {
            brand_icon: null,
            app_name: 'TargetFinance',
            username: 'Novo Usuário',
            user_modal_function: () => {
                'funcão que ativa o modal do usuario';
            },
        }

        // bootstrap do header
        this.header_style_config = {
            header: ["bg-light", "py-3", "shadow", "vw-100"],
            header_wrapper: ["container-fluid", "d-flex", "justify-content-between", "gap-2"],
            brand_wrapper: ["d-flex", "align-items-center", "gap-1"],
            brand_icon: ["brandIcon"],
            brand_name: ["h5", "m-0", "fw-bold", "text-primary"],
            user_wrapper: ["border-0", "d-flex", "align-items-center", "gap-1", "bg-transparent"],
            user_icon: ["rounded-circle", "border"],
            user_name: ["fs-6", "m-0", "text-primary", "fw-medium"],
            user_post_icon: ["img-fluid"],
        }

        // Configuração do setup do sidenav
        this.sidenav_config = {
            tab: {
                //configuração do setup de cada TAB
                config: [
                    {
                        name: 'Dashboard',
                        icon_src_active: './assets/DashboardActive.png',
                        icon_src: './assets/Dashboard.png',
                        icon_alt: 'Botão de Dashboard',
                        function: () => {
                            this.buildPage("Dashboard");
                            PageState.save("Dashboard");
                            this.pages.Dashboard.renderCharts();
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
                // bootstrap geral de todas as tabs
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
        
        // bootstrap do sidenav
        this.sidenav_style_config = {
            main: ["navbar", "d-flex", "flex-column", "p-0", "bg-primary", "flex-shrink-0", "col-12", "col-md-2"],
            toggle_wrapper: ["toggleWrapper", "btn", "border-0", "align-self-end", "w-15", "w-md-25", "p-2"],
            toggle_icon: ["img-fluid"], 
            tab_wrapper: ["nav", "flex-column", "w-100", "px-1", "px-md-3", "gap-1"],
            footer: ["navbarFooter", "d-md-flex", "flex-column", "mt-auto", "text-white-50", "text-center", "mb-3", "w-100", "px-2", "small"],
        }

        // bootstrap do dashboard
        this.dashboard_style_config = {
            main: ["d-flex", "flex-column", "align-items-center", "w-100", "gap-4", "gap-md-5", "text-primary"],

            title_section: ["d-flex", "flex-column", "flex-md-row", "justify-content-between", "align-items-center", "w-100", "mt-4", "mt-md-5", "px-1", "px-md-5"],
            title: ["fs-5", "mb-3", "mb-md-0"],
            ope_div: ["d-flex", "justify-content-center", "justify-content-md-end", "w-md-auto"],
            ope_report_button: ["btn", "border-0", "w-25"],
            ope_report_icon: ["img-fluid"],
            ope_show_button: ["btn", "border-0", "w-25"],
            ope_show_icon: ["img-fluid"],

            status_section: ["d-flex", "flex-column", "flex-md-row", "justify-content-around", "align-items-center", "w-100", "px-1", "px-md-5", "fw-bold", "py-4", "py-md-5", "gap-4", "gap-md-0"],
            vertical_rule_1: ["vr", "d-none", "d-md-block"],
            vertical_rule_2: ["vr", "d-none", "d-md-block"],
            
            balance_div: ["d-flex", "flex-column", "align-items-center", "align-items-md-end"],
            balance_title: [],
            balance_currency: ["fs-5"],
            balance_value: ["text-black", "fs-2"],
            
            income_div: ["d-flex", "flex-column", "align-items-center", "align-items-md-end"],
            income_title: ["text-success"],
            income_currency: ["fs-5"],
            income_value: ["text-black", "fs-2"],
            
            expense_div: ["d-flex", "flex-column", "align-items-center", "align-items-md-end"],
            expense_title: ["text-danger"],
            expense_currency: ["fs-5"],
            expense_value: ["text-black", "fs-2"],

            donut_section: ["d-flex", "flex-column", "flex-md-row", "justify-content-around", "align-items-center", "w-100", "p-1", "p-md-5", "gap-4", "gap-md-5", "fw-medium"],
            donut_1_div: ["d-flex", "flex-column", "align-items-center", "w-75", "w-md-100"],
            donut_1_title: ["fs-5", "mb-3"],
            donut_2_div: ["d-flex", "flex-column", "align-items-center", "w-75", "w-md-100"],
            donut_2_title: ["fs-5", "mb-3"],

            bar_section: ["d-flex", "flex-column", "align-items-center", "w-100", "w-md-100", "px-1", "px-md-5"],
            bar_title: [],
            
            transaction_section: ["d-flex", "flex-column", "align-items-center", "w-75", "w-md-100", "px-1","px-md-5","overflow-x-scroll"],
            transaction_title: [],
        }

        this.spawn()
        this.setup()
        this.style()
        this.build()
    }

    // Instancia os componentes principais da aplicação
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
            Report: new ReportModal({toggleModal: ()=>{this.toggleModal()}}),
            Transaction: new TransactionModal({toggleModal: ()=>{this.toggleModal()}}),
            Category: new CategoryModal({toggleModal: ()=>{this.toggleModal()}})
        }
        
        this.header = new Header(this.header_config, this.header_style_config);
        this.sidenav = new SideNav(this.sidenav_config, this.sidenav_style_config);
    }

    // Configura event listeners, renderiza gráficos iniciais e prepara modais
    setup() {
        this.sidenav.setDisablePageFunction((_bool)=>{
            if (_bool) {
                this.page.classList.add("d-none", "d-md-flex");
            } else {
                this.page.classList.remove("d-none", "d-md-flex");
            }
        })

        this.modal_wrapper.addEventListener('click', (e)=>{
            if (e.target === this.modal_wrapper) {
                this.toggleModal();
            }
        });

        this.pages.Dashboard.updateTitle("Bem-vindo, Nome do Usuário");

        // console.time("donut1")
        this.pages.Dashboard.renderMonthExpenseIncome();
        // console.timeEnd("donut1")

        // console.time("donut2")
        this.pages.Dashboard.renderExpensiveForCategory();
        // console.timeEnd("donut2")

        // console.time("bar")
        this.pages.Dashboard.renderExpenseIncomeForLastSixMonth();
        // console.timeEnd("bar")

        // console.time("transaction")
        this.pages.Dashboard.renderFiveLastTransactions();
        // console.timeEnd("transaction")
        
        window.addEventListener('resize', () => {
            this.pages.Dashboard.elements.bar_component.bar.resize();
            this.pages.Dashboard.elements.donut_1_component.donut.resize();
            this.pages.Dashboard.elements.donut_2_component.donut.resize();
        });

        window.addEventListener('reload', () => {
            this.pages.Dashboard.elements.bar_component.bar.resize();
            this.pages.Dashboard.elements.donut_1_component.donut.resize();
            this.pages.Dashboard.elements.donut_2_component.donut.resize();
        });
        
        
        this.pages["Transaction"].setModal((_, data) => {
            this.modals["Transaction"].prepareModal(data); 
            this.toggleModal("Transaction");
        });
        this.pages["Category"].setModal((_, data) => {
            this.modals["Category"].prepareModal(data); 
            this.toggleModal("Category");
        });
        
        this.pages["Dashboard"].setModal(()=>{this.toggleModal("Report")});
    }

    // Monta a estrutura completa no DOM
    build() {
        this.buildPage(PageState.load())
        this.wrapper.replaceChildren(this.sidenav.main, this.page);
        this.body.replaceChildren(this.header.header, this.wrapper, this.modal_wrapper);
    }

    // Renderiza a página selecionada e marca sua tab no sidenav como ativa
    buildPage(page) {
        const PAGE = this.pages[page];
        if (PAGE) {
            for (const TAB of this.sidenav.tabs) {
                TAB.changeStatus(false);
            }
            const INDEX = Object.keys(this.pages).indexOf(page)

            this.sidenav.tabs.at(INDEX).changeStatus(true);
            this.page.replaceChildren(PAGE.main);
        }
    }
    
    // Exibe ou oculta modais na tela
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

    // Estiliza os elementos raiz da aplicação com classes Bootstrap
    style() {
        // BOOTSTRAP
        this.body.classList.add(...["overflow-x-hidden"]);
        this.html.classList.add(...["vw-100"]);
        this.wrapper.classList.add(...["d-flex", "min-vh-100", "w-100"]);
        this.page.classList.add(...["flex-grow-1"]);
        this.modal_wrapper.classList.add(...["modal-1"]);
    }
}

const APP = new App()
export default APP
