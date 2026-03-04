// will be used to centralize the build of the entire application

import Header from './ui/header'
import SideNav from './ui/sidenav'
import config from './config'

class App {
    constructor () {
        this.html = document.querySelector('html')
        this.body = document.querySelector('body');

        this.dashboard = new Dashboard();
        this.transaction = new Transaction();
        this.category = new Category();
        
        this.header = new Header({
            "brand_icon": null,
            "app_name": "TargetFinance",
            "username": "Novo Usuário",
            "user_modal_function": ()=>{"funcão que ativa o modal do usuario"}
        });
        
        this.wrapper = document.createElement('div');
        this.sidenav = new SideNav([
                {"name": "Dashboard", "icon": null, "function": ()=>{this.loadContent(this.dashboard)}},
                {"name": "Transações", "icon": null, "function": ()=>{this.loadContent(this.transaction)}},
                {"name": "Categorias", "icon": null, "function": ()=>{this.loadContent(this.category)}},
            ],
            [
                "© 2026 TargetFinance", 
                "Todos os direitos reservados.",
            ]);
        this.content = document.createElement('main');
    }

    start() {
        this.body.innerHTML = "";

        this.sidenav_content_wrapper.appendChild(this.sidenav);
        this.sidenav_content_wrapper.appendChild(this.content);
        
        this.body.appendChild(this.header);
        this.body.appendChild(this.sidenav_content_wrapper);
    }

    loadContent(page) {
        this.content.innerHTML = "";
        this.content.appendChild(page);
    }

    style() {
        // BOOTSTRAP

        this.body.className = "";
        this.body.classList.add([
            
        ]);

        this.html.className = "";
        this.html.classList.add([

        ]);

        this.content.className = "";
        this.content.classList.add([

        ]);

        this.wrapper.className = "";
        this.wrapper.classList.add([

        ]);
    }
    
}

export default new App(config);
