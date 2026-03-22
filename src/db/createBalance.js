export default class CreateBalance {
    static create() {
        const BALANCE = localStorage.getItem('TARGET_FINANCE-balance');

        if (BALANCE === null) {
            localStorage.setItem('TARGET_FINANCE-balance', JSON.stringify(0.0));
        }

        console.log("Saldo criado!")
    }
}