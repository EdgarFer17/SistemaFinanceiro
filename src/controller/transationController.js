import TransationModel from "../model/transationModel.js";
import TRANSATION_TYPE_MODEL from "../model/transationTypeModel.js";
import CategoryRepository from "../repository/categoryRepository.js";
import TransationRepository from "../repository/transationRepository.js";
import BalanceController from "./balanceController.js";


export default class TransationController {

    // receber um TransactionModel e insere
    static createTransaction(transaction) {
        if (!(transaction instanceof TransationModel)) {
            throw new Error("O parâmetro passado precisa ser um TransactionModel!")
        }

        const categoriesFromDB = [];

        CategoryRepository.getCategories().forEach(c => categoriesFromDB.push(c.id));

        if (!categoriesFromDB.includes(transaction.category.id)) {
            throw new Error("A categoria da transação não existe!");
        }

        // transfere
        if (transaction.type === TRANSATION_TYPE_MODEL.EXPENSE) {
            BalanceController.withdraw(transaction.value);
        } else {
            BalanceController.deposit(transaction.value);
        }

        TransationRepository.createTransaction(transaction);
    }

    // retorna uma lista de TransactionModel
    static getTransactions() {
        return TransationRepository.getTransactions();
    }

    // recebe o id da transação que deseja editar e a transação para modificação
    static editTransaction(id, newTransaction) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        if (!(newTransaction instanceof TransationModel)) {
            throw new Error("O parâmetro passado precisa ser um TransactionModel!")
        }

        const transationForEdit = TransationRepository.getTransactionById(id);

        if (!transationForEdit) {
            throw new Error("Transação não encontrada!");
        }

        const categoriesFromDB = [];

        CategoryRepository.getCategories().forEach(c => categoriesFromDB.push(c.id));

        if (!categoriesFromDB.includes(newTransaction.category.id)) {
            throw new Error("A categoria da transação não existe!");
        }

        // devolve
        if (transationForEdit.type === TRANSATION_TYPE_MODEL.EXPENSE) {
            BalanceController.deposit(transationForEdit.value);
        } else {
            BalanceController.withdraw(transationForEdit.value);
        }

        TransationRepository.editTransaction(id, newTransaction);

        // transfere
        if (newTransaction.type === TRANSATION_TYPE_MODEL.EXPENSE) {
            BalanceController.withdraw(newTransaction.value);
        } else {
            BalanceController.deposit(newTransaction.value);
        }
    }
    
    // recebe um id da transação e apaga a transação
    static deleteTransation(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        const transationForDelete = TransationRepository.getTransactionById(id);

        if (!transationForDelete) {
            throw new Error("Transação não encontrada!");
        }

        if (transationForDelete.type === TRANSATION_TYPE_MODEL.EXPENSE) {
            BalanceController.deposit(transationForDelete.value);
        } else {
            BalanceController.withdraw(transationForDelete.value);
        }

        TransationRepository.deleteTransaction(id);
    }
    
    // recebe um id e retorna a transação
    static getTransationById(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        const transaction = TransationRepository.getTransactionById(id);

        if (transaction === null) {
            throw new Error("Transação não encontrada")
        }

        return transaction;
    }
}