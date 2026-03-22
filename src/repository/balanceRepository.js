export default class BalanceRepository {
    
    // retorna o saldo do localStorage
    static getBalance () {
        const BALANCE = Number(localStorage.getItem('TARGET_FINANCE-balance')) || 0;

        return BALANCE;
    }

    // aumenta o saldo a partir do valor passado e salva no localStorage
    static incrementBalance(value) {
        let balance = Number(localStorage.getItem('TARGET_FINANCE-balance')) || 0;

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