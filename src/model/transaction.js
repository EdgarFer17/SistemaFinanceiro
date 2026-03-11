import Category from './category.js';
import TRANSACTION_TYPE from './transactionType.js'

export default class Transaction {

    static idIncrementer = 1;

    // o atributo date de ser um objeto contendo day, month e year;
    // o atributo type deve ser um TRANSACTION_TYPE;
    constructor(date, category, type, value) {
        if (!Object.values(TRANSACTION_TYPE).includes(type)) {
            throw new Error("O type deve estar contido em TRANSACTION_TYPE!");
        }

        if (!(date instanceof Date)) {
            throw new Error("O date deve ser uma instância Date!")
        }
        
        if (typeof value !== "number") {
            throw new Error("O value deve ser um Number!")
        }
        
        if (!(category instanceof Category)) {
            throw new Error("O category deve ser uma instância String!")
        }

        this.id = Transaction.idIncrementer++;
        this.date = date;
        this.category = category;
        this.type = type;
        this.value = value;

    }
}