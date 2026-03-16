export default class PageState {
    static load() {
        const PAGE = localStorage.getItem("TARGET_FINANCE-actual_page");
        if (PAGE === null) {
            this.save("Dashboard");
            return "Dashboard";
        }

        return PAGE;
    }

    static save(page) {
        if (page === null) {
            localStorage.setItem("TARGET_FINANCE-actual_page", "Dashboard");
            return false;
        }
        
        localStorage.setItem("TARGET_FINANCE-actual_page", page);
        return true;
    }
}