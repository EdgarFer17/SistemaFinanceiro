import TransactionModel from "../model/TransactionModel.js";
import TRANSACTION_TYPE_MODEL from "../model/TransactionTypeModel.js";
import CategoryRepository from "../repository/categoryRepository.js";
import TransactionRepository from "../repository/TransactionRepository.js";
import BalanceController from "./balanceController.js";


export default class TransactionController {

    // receber um TransactionModel e insere
    static createTransaction(transaction) {
        if (!(transaction instanceof TransactionModel)) {
            throw new Error("O parâmetro passado precisa ser um TransactionModel!")
        }

        const categoriesFromDB = [];

        CategoryRepository.getCategories().forEach(c => categoriesFromDB.push(c.id));

        if (!categoriesFromDB.includes(transaction.category.id)) {
            throw new Error("A categoria da transação não existe!");
        }

        // transfere
        if (transaction.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
            BalanceController.withdraw(transaction.value);
        } else {
            BalanceController.deposit(transaction.value);
        }

        TransactionRepository.createTransaction(transaction);
    }

    // retorna uma lista de TransactionModel
    static getTransactions() {
        return TransactionRepository.getTransactions();
    }

    // recebe o id da transação que deseja editar e a transação para modificação
    static editTransaction(id, newTransaction) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        if (!(newTransaction instanceof TransactionModel)) {
            throw new Error("O parâmetro passado precisa ser um TransactionModel!")
        }

        const transactionForEdit = TransactionRepository.getTransactionById(id);

        if (!transactionForEdit) {
            throw new Error("Transação não encontrada!");
        }

        const categoriesFromDB = [];

        CategoryRepository.getCategories().forEach(c => categoriesFromDB.push(c.id));

        if (!categoriesFromDB.includes(newTransaction.category.id)) {
            throw new Error("A categoria da transação não existe!");
        }

        // devolve
        if (transactionForEdit.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
            BalanceController.deposit(transactionForEdit.value);
        } else {
            BalanceController.withdraw(transactionForEdit.value);
        }

        TransactionRepository.editTransaction(id, newTransaction);

        // transfere
        if (newTransaction.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
            BalanceController.withdraw(newTransaction.value);
        } else {
            BalanceController.deposit(newTransaction.value);
        }
    }
    
    // recebe um id da transação e apaga a transação
    static deleteTransaction(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        const transactionForDelete = TransactionRepository.getTransactionById(id);

        if (!transactionForDelete) {
            throw new Error("Transação não encontrada!");
        }

        if (transactionForDelete.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
            BalanceController.deposit(transactionForDelete.value);
        } else {
            BalanceController.withdraw(transactionForDelete.value);
        }

        TransactionRepository.deleteTransaction(id);
    }
    
    // recebe um id e retorna a transação
    static getTransactionById(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        const transaction = TransactionRepository.getTransactionById(id);

        if (transaction === null) {
            throw new Error("Transação não encontrada")
        }

        return transaction;
    }
}