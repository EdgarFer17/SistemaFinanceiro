export default class PageState {
    static load() {
        const PAGE_INDEX = localStorage.getItem('actual_page');
        if (PAGE_INDEX === null || isNaN(Number(PAGE_INDEX))) {
            this.save(0);
            return 0;
        }

        return Number(PAGE_INDEX);
    }

    static save(page_index) {
        if (isNaN(page_index)) {
            localStorage.setItem('actual_page', '0');
            return false;
        }

        localStorage.setItem('actual_page', page_index.toString());
        return true;
    }
}
