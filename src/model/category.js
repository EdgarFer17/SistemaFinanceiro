export default class Category {

    static idIncrementer = 1;

    // o atributo categoryName deve receber uma String com nome da categoria
    // o atrbuto limit é um Number e refere-se ao limite da categoria
    constructor(categoryName, limit) {    
        if (typeof categoryName !== "string") {
            throw new Error("O categoryName deve ser uma String!");
        }

        if (typeof limit !== "number") {
            throw new Error("O limit deve ser um Number!")
        }

        this.id = Category.idIncrementer++;
        this.categoryName = categoryName;
        this.limit = limit;
    }
}