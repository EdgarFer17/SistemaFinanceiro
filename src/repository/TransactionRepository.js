import CategoryModel from '../model/categoryModel.js';
import CATEGORY_TYPE_MODEL from '../model/categoryTypeModel.js';
import TransactionModel from '../model/TransactionModel.js'
import TRANSACTION_TYPE_MODEL from '../model/TransactionTypeModel.js';

export default class TransactionRepository {

    // método utilitário para pegar as transações do localStorage
    static _getTransactionsList() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }
    
    // método utilitário para salvar as transações do localStorage
    static _saveTransactionsList(transactionsList) {
        localStorage.setItem('transactions', JSON.stringify(transactionsList));
    }

    // método utilitário que gera id auto incrementado
    static _generateId(transactionsList) {
        if (transactionsList.length === 0) return 1;
        return Math.max(...transactionsList.map(c => c.id)) + 1;
    }
    
    // receber um TransactionModel e insere no localStorage
    static createTransaction(transaction) {
        const transactionsList = this._getTransactionsList();

        transaction.id = this._generateId(transactionsList);

        transactionsList.push(transaction);

        this._saveTransactionsList(transactionsList);
    }

    // retorna uma lista de TransactionModel do localStorage
    static getTransactions() {
        const transactionsList = this._getTransactionsList();

        return transactionsList.map(t => {
            const category = new CategoryModel(
                t.category.categoryName,
                t.category.limit,
                t.category.type === "PADRÃO"
                    ? CATEGORY_TYPE_MODEL.DEFAULT
                    : CATEGORY_TYPE_MODEL.CUSTOM
            );

            category.id = t.category.id;

            const transaction = new TransactionModel(
                new Date(t.date), 
                category, 
                t.type === 'DESPESA' ? TRANSACTION_TYPE_MODEL.EXPENSE : TRANSACTION_TYPE_MODEL.INCOME, 
                t.value,
                t.desc || "" // <-- DESCRIÇÃO ADICIONADA AQUI
            );
            transaction.id = t.id;
            return transaction; 
        });
    }

    // recebe o id da transação que deseja editar e a transação para modificação
    static editTransaction(id, newTransaction) {
        const transactionsList = this._getTransactionsList();

        transactionsList.forEach(t => {
            if (t.id === id) {
                t.date = newTransaction.date;
                t.category = newTransaction.category;
                t.type = newTransaction.type;
                t.value = newTransaction.value;
                t.desc = newTransaction.desc; // <-- DESCRIÇÃO ADICIONADA AQUI
            }
        })

        this._saveTransactionsList(transactionsList);
    }
    
    // recebe um id da transação e apaga a transação do localStorage
    static deleteTransaction(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        const transactionsList = this._getTransactionsList();

        const index = transactionsList.findIndex(t => t.id === id);

        if (index >= 0) {
            transactionsList.splice(index, 1);
            this._saveTransactionsList(transactionsList);
        }
    }

    // recebe um id e retorna a transação
    static getTransactionById(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        const transactionsList =  this._getTransactionsList();

        const transactionStorage = transactionsList.find(c => c.id === id);

        if (!transactionStorage) {
            return null;
        }

        const category = new CategoryModel(
            transactionStorage.category.categoryName,
            transactionStorage.category.limit,
            transactionStorage.category.type === "PADRÃO" ? CATEGORY_TYPE_MODEL.DEFAULT : CATEGORY_TYPE_MODEL.CUSTOM
        );

        category.id = transactionStorage.category.id;

        const transaction = new TransactionModel(
            new Date(transactionStorage.date),
            category,
            transactionStorage.type === 'DESPESA' ? TRANSACTION_TYPE_MODEL.EXPENSE :TRANSACTION_TYPE_MODEL.INCOME,
            transactionStorage.value,
            transactionStorage.desc || ""
        );

        transaction.id = transactionStorage.id;

        return transaction;
    }
}