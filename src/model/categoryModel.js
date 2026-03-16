import CATEGORY_TYPE_MODEL from "./categoryTypeModel.js";

export default class CategoryModel {

    // o atributo categoryName deve receber uma String com nome da categoria
    // o atrbuto limit é um Number e refere-se ao limite da categoria
    constructor(categoryName, limit, type) {    
        if (typeof categoryName !== "string") {
            throw new Error("O categoryName deve ser uma String!");
        }

        if (typeof limit !== "number") {
            throw new Error("O limit deve ser um Number!")
        }

        if (!Object.values(CATEGORY_TYPE_MODEL).includes(type)) {
            throw new Error("O type deve estar contido em CATEGORY_TYPE_MODEL!");
        }

        this.id = null;
        this.categoryName = categoryName;
        this.limit = limit;
        this.type = type
    }
}