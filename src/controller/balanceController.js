import BalanceRepository from "../repository/balanceRepository";

export default class BalanceController {
    
    // retorna o saldo do localStorage
    static getBalance () {
        return BalanceRepository.getBalance();
    }

    // aumenta o saldo a partir do valor passado
    static deposit(value) {
        BalanceRepository.incrementBalance(value);
    }
    
    // diminui o saldo a partir do valor passado
    static withdraw(value) {
        BalanceRepository.decrementBalance(value);
    }
}