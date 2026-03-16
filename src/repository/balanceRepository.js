export default class BalanceRepository {
    
    // retorna o saldo do localStorage
    static getBalance () {
        const balance = Number(localStorage.getItem('balance')) || 0;

        return balance;
    }

    // aumenta o saldo a partir do valor passado e salva no localStorage
    static incrementBalance(value) {
        let balance = Number(localStorage.getItem('balance')) || 0;

        balance += Number(value);

        localStorage.setItem('balance', balance);
    }
    
    // diminui o saldo a partir do valor passado e salva no localStorage
    static decrementBalance(value) {
        let balance = Number(localStorage.getItem('balance')) || 0;

        balance -= Number(value);

        localStorage.setItem('balance', balance);
    }
}