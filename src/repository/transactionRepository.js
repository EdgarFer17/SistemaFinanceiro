import CategoryModel from '../model/categoryModel.js';
import TransactionModel from '../model/transactionModel.js'
import TRANSACTION_TYPE_MODEL from '../model/transactionTypeModel.js';

export default class TransactionRepository {

    // método utilitário para pegar as transações do localStorage
    static _getTransactionsList() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }
    
    // método utilitário para salvar as transações do localStorage
    static _saveTransactionsList(transactionsList) {
        localStorage.setItem('transactions', JSON.stringify(transactionsList));
    }
    
    // receber um TransactionModel e insere no localStorage
    static createTransaction(transaction) {
        if (!(transaction instanceof TransactionModel)) {
            throw new Error("O parâmetro passado precisa ser um TransactionModel!")
        }

        const transactionsList = this._getTransactionsList();

        transactionsList.push(transaction);

        this._saveTransactionsList(transactionsList);
    }

    // retorna uma lista de TransactionModel do localStorage
    static getTransactions() {
        const transactionsList = this._getTransactionsList();

        return transactionsList.map(t => {
            const category = new CategoryModel(
                t.category.categoryName,
                t.category.limit
            );

            category.id = t.category.id;

            const transaction = new TransactionModel(
                new Date(t.date), 
                category, 
                t.type === 'DESPESA' ? TRANSACTION_TYPE_MODEL.EXPENSE : TRANSACTION_TYPE_MODEL.INCOME, 
                t.value
            );
            transaction.id = t.id;
            return transaction; 
        });
    }

    // recebe o id da transação que deseja remover e a transação para modificação
    static editTransaction(id, newTransaction) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        if (!(newTransaction instanceof TransactionModel)) {
            throw new Error("O parâmetro passado precisa ser um TransactionModel!")
        }

        const transactionsList = this._getTransactionsList();

        transactionsList.forEach(t => {
            if (t.id === id) {
                t.date = newTransaction.date;
                t.category = newTransaction.category;
                t.type = newTransaction.type;
                t.value = newTransaction.value;
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
}