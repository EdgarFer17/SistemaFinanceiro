// Criação do header da aplicação

export default class Header {
    constructor(func) {
        this.header = document.createElement('header')

        this.brand_wrapper = document.createElement('div');
        this.user_wrapper = document.createElement('button');
        
        this.brand_icon; // Implement
        this.brand_name = document.createElement('h1');

        this.user_icon; // Implement
        this.user_name = document.createElement('h2');
        this.user_post_icon; // Implement

        this.setUserAction(func)
        this.loadContent()
    }

    setUserAction(func) {
        this.user_wrapper.onclick(func)
    }

    loadContent() {
        this.brand_wrapper.appendChild(this.brand_icon);
        this.brand_wrapper.appendChild(this.brand_wrapper);

        this.user_wrapper.appendChild(this.user_icon);
        this.user_wrapper.appendChild(this.user_name);
        this.user_wrapper.appendChild(this.user_post_icon);

        this.header.appendChild(this.brand_wrapper);
        this.header.appendChild(this.user_wrapper);

        this.style();
    }

    style() {
        this.header.className = "";
        this.header.classList.add([

        ]);

        this.user_wrapper.className = "";
        this.user_wrapper.classList.add([

        ]);

        this.brand_wrapper.className = "";
        this.brand_wrapper.classList.add([
            
        ]);

        this.brand_icon.className = "";
        this.brand_icon.classList.add([
            
        ]);

        this.brand_name.className = "";
        this.brand_name.classList.add([
            
        ]);

        this.user_icon.className = "";
        this.user_icon.classList.add([
            
        ]);

        this.user_name.className = "";
        this.user_name.classList.add([
            
        ]);

        this.user_post_icon.className = "";
        this.user_post_icon.classList.add([
            
        ]);
    }
}