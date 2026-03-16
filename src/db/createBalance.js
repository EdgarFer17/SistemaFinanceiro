export default class CreateBalance {
    static create() {
        const balance = localStorage.getItem('balance');

        if (balance === null) {
            localStorage.setItem('balance', JSON.stringify(0.0));
        }

        console.log("Saldo criado!")
    }
}