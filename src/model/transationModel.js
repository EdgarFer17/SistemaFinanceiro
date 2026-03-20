import CategoryModel from './categoryModel.js';
import TRANSATION_TYPE_MODEL from './transationTypeModel.js'

export default class TransationModel {

    // o atributo date de ser um objeto contendo day, month e year;
    // o atributo type deve ser um TRANSACTION_TYPE;
    constructor(date, category, type, value, desc) {
        if (!Object.values(TRANSATION_TYPE_MODEL).includes(type)) {
            throw new Error("O type deve estar contido em TRANSACTION_TYPE_MODEL!");
        }

        if (!(date instanceof Date)) {
            throw new Error("O date deve ser uma instância Date!")
        }
        
        if (typeof value !== "number") {
            throw new Error("O value deve ser um Number!")
        }
        
        if (!(category instanceof CategoryModel)) {
            throw new Error("O category deve ser uma instância de CategoryModel!")
        }

        this.id = null;
        this.date = date;
        this.category = category;
        this.type = type;
        this.value = value;
        this.desc = desc;

    }
}