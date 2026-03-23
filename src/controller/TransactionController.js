import TransactionModel from "../model/TransactionModel.js";
import TRANSACTION_TYPE_MODEL from "../model/TransactionTypeModel.js";
import CategoryRepository from "../repository/categoryRepository.js";
import TransactionRepository from "../repository/TransactionRepository.js";


export default class TransactionController {

    // receber um TransactionModel e insere
    static createTransaction(transaction) {
        if (!(transaction instanceof TransactionModel)) {
            throw new Error("O parâmetro passado precisa ser um TransactionModel!")
        }

        const CATEGORIES_FROM_DB = [];

        CategoryRepository.getCategories().forEach(c => CATEGORIES_FROM_DB.push(c.id));

        if (!CATEGORIES_FROM_DB.includes(transaction.category.id)) {
            throw new Error("A categoria da transação não existe!");
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

        const TRANSACTION_TO_EDIT = TransactionRepository.getTransactionById(id);

        if (!TRANSACTION_TO_EDIT) {
            throw new Error("Transação não encontrada!");
        }

        const CATEGORIES_FROM_DB = [];

        CategoryRepository.getCategories().forEach(c => CATEGORIES_FROM_DB.push(c.id));

        if (!CATEGORIES_FROM_DB.includes(newTransaction.category.id)) {
            throw new Error("A categoria da transação não existe!");
        }

        TransactionRepository.editTransaction(id, newTransaction);
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

        TransactionRepository.deleteTransaction(id);
    }
    
    // recebe um id e retorna a transação
    static getTransactionById(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        const TRANSACTION = TransactionRepository.getTransactionById(id);

        if (TRANSACTION === null) {
            throw new Error("Transação não encontrada")
        }

        return TRANSACTION;
    }
}