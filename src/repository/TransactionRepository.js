import CategoryModel from '../model/categoryModel.js';
import CATEGORY_TYPE_MODEL from '../model/categoryTypeModel.js';
import TransactionModel from '../model/TransactionModel.js'
import TRANSACTION_TYPE_MODEL from '../model/TransactionTypeModel.js';

export default class TransactionRepository {

    // método utilitário para pegar as transações do localStorage
    static _getTransactionsList() {
        return JSON.parse(localStorage.getItem('TARGET_FINANCE-transactions')) || [];
    }
    
    // método utilitário para salvar as transações do localStorage
    static _saveTransactionsList(transactionsList) {
        localStorage.setItem('TARGET_FINANCE-transactions', JSON.stringify(transactionsList));
    }

    // método utilitário que gera id auto incrementado
    static _generateId(transactionsList) {
        if (transactionsList.length === 0) return 1;
        return Math.max(...transactionsList.map(c => c.id)) + 1;
    }
    
    // receber um TransactionModel e insere no localStorage
    static createTransaction(transaction) {
        const TRANSACTIONS_LIST = this._getTransactionsList();

        transaction.id = this._generateId(TRANSACTIONS_LIST);

        TRANSACTIONS_LIST.push(transaction);

        this._saveTransactionsList(TRANSACTIONS_LIST);
    }

    // retorna uma lista de TransactionModel do localStorage
    static getTransactions() {
        const TRANSACTIONS_LIST = this._getTransactionsList();

        return TRANSACTIONS_LIST.map(t => {
            const CATEGORY = new CategoryModel(
                t.category.categoryName,
                t.category.limit,
                t.category.type === "PADRÃO"
                    ? CATEGORY_TYPE_MODEL.DEFAULT
                    : CATEGORY_TYPE_MODEL.CUSTOM
            );

            CATEGORY.id = t.category.id;

            const TRANSACTION = new TransactionModel(
                new Date(t.date), 
                CATEGORY, 
                t.type === 'DESPESA' ? TRANSACTION_TYPE_MODEL.EXPENSE : TRANSACTION_TYPE_MODEL.INCOME, 
                t.value,
                t.desc || "" // <-- DESCRIÇÃO ADICIONADA AQUI
            );
            TRANSACTION.id = t.id;
            return TRANSACTION; 
        });
    }

    // recebe o id da transação que deseja editar e a transação para modificação
    static editTransaction(id, newTransaction) {
        const TRANSACTIONS_LIST = this._getTransactionsList();

        TRANSACTIONS_LIST.forEach(t => {
            if (t.id === id) {
                t.date = newTransaction.date;
                t.category = newTransaction.category;
                t.type = newTransaction.type;
                t.value = newTransaction.value;
                t.desc = newTransaction.desc; // <-- DESCRIÇÃO ADICIONADA AQUI
            }
        })

        this._saveTransactionsList(TRANSACTIONS_LIST);
    }
    
    // recebe um id da transação e apaga a transação do localStorage
    static deleteTransaction(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        const TRANSACTIONS_LIST = this._getTransactionsList();

        const INDEX = TRANSACTIONS_LIST.findIndex(t => t.id === id);

        if (INDEX >= 0) {
            TRANSACTIONS_LIST.splice(INDEX, 1);
            this._saveTransactionsList(TRANSACTIONS_LIST);
        }
    }

    // recebe um id e retorna a transação
    static getTransactionById(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        const TRANSACTIONS_LIST =  this._getTransactionsList();

        const TRANSACTION_STORAGE = TRANSACTIONS_LIST.find(c => c.id === id);

        if (!TRANSACTION_STORAGE) {
            return null;
        }

        const category = new CategoryModel(
            TRANSACTION_STORAGE.category.categoryName,
            TRANSACTION_STORAGE.category.limit,
            TRANSACTION_STORAGE.category.type === "PADRÃO" ? CATEGORY_TYPE_MODEL.DEFAULT : CATEGORY_TYPE_MODEL.CUSTOM
        );

        category.id = TRANSACTION_STORAGE.category.id;

        const TRANSACTION = new TransactionModel(
            new Date(TRANSACTION_STORAGE.date),
            category,
            TRANSACTION_STORAGE.type === 'DESPESA' ? TRANSACTION_TYPE_MODEL.EXPENSE :TRANSACTION_TYPE_MODEL.INCOME,
            TRANSACTION_STORAGE.value,
            TRANSACTION_STORAGE.desc || ""
        );

        TRANSACTION.id = TRANSACTION_STORAGE.id;

        return TRANSACTION;
    }
}