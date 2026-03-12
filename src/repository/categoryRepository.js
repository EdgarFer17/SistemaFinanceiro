import CategoryModel from '../model/categoryModel.js'

export default class CategoryRepository {

    // método utilitário para pegar as categorias do localStorage
    static _getCategoriesList() {
        return JSON.parse(localStorage.getItem('categories')) || [];
    }

    // método utilitário para salvar as categorias do localStorage
    static _saveCategoriesList(categoriesList) {
        localStorage.setItem('categories', JSON.stringify(categoriesList));
    }
    
    // receber um CategoryModel e insere no localStorage
    static createCategory(category) {
        if (!(category instanceof CategoryModel)) {
            throw new Error("O parâmetro passado precisa ser um CategoryModel!")
        }

        const categoriesList = this._getCategoriesList();

        categoriesList.push(category);

        this._saveCategoriesList(categoriesList);
    }

    // retorna uma lista de CategoryModel do localStorage
    static getCategories() {
        const categoriesList = this._getCategoriesList();

        return categoriesList.map(c => {
            const category = new CategoryModel(c.categoryName, c.limit);
            category.id = c.id;
            return category;
        });
    }

    // recebe o id da categoria que deseja remover e a categoria para modificação
    static editCategory(id, newCategory) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        if (!(newCategory instanceof CategoryModel)) {
            throw new Error("O parâmetro passado precisa ser um CategoryModel!")
        }

        const categoriesList = this._getCategoriesList();

        categoriesList.forEach(c => {
            if (c.id === id) {
                c.categoryName = newCategory.categoryName;
                c.limit = newCategory.limit;
            }
        })

        this._saveCategoriesList(categoriesList);
    }
    
    // recebe um id da categoria e apaga a categoria do localStorage
    static deleteCategory(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!")
        }

        const categoriesList =  this._getCategoriesList();

        const index = categoriesList.findIndex(c => c.id === id);

        if (index >= 0) {
            categoriesList.splice(index, 1);
            this._saveCategoriesList(categoriesList);
        }
    }
}