import CategoryModel from '../model/categoryModel.js'
import CATEGORY_TYPE_MODEL from '../model/categoryTypeModel.js';

export default class CategoryRepository {

    // método utilitário para pegar as categorias do localStorage
    static _getCategoriesList() {
        return JSON.parse(localStorage.getItem('categories')) || [];
    }

    // método utilitário para salvar as categorias do localStorage
    static _saveCategoriesList(categoriesList) {
        localStorage.setItem('categories', JSON.stringify(categoriesList));
    }

    // método utilitário que gera id auto incrementado
    static _generateId(categoriesList) {
        if (categoriesList.length === 0) return 1;
        return Math.max(...categoriesList.map(c => c.id)) + 1;
    }
    
    // receber um CategoryModel e insere no localStorage
    static createCategory(category) {
        const categoriesList = this._getCategoriesList();

        category.id = this._generateId(categoriesList);

        categoriesList.push(category);

        this._saveCategoriesList(categoriesList);
    }

    // retorna uma lista de CategoryModel do localStorage
    static getCategories() {
        const categoriesList = this._getCategoriesList();

        return categoriesList.map(c => {
            const category = new CategoryModel(c.categoryName, c.limit, c.type === "PADRÃO" ? CATEGORY_TYPE_MODEL.DEFAULT : CATEGORY_TYPE_MODEL.CUSTOM);
            category.id = c.id;
            return category;
        });
    }

    // recebe o id da categoria que deseja editar e a categoria para modificação
    static editCategory(id, newCategory) {
        const categoriesList = this._getCategoriesList();

        categoriesList.forEach(c => {
            if (c.id === id) {
                c.categoryName = newCategory.categoryName;
                c.limit = newCategory.limit;
                c.type = newCategory.type;
            }
        })

        this._saveCategoriesList(categoriesList);
    }
    
    // recebe um id da categoria e apaga a categoria do localStorage
    static deleteCategory(id) {
        const categoriesList =  this._getCategoriesList();

        const index = categoriesList.findIndex(c => c.id === id);

        if (index >= 0) {
            categoriesList.splice(index, 1);
            this._saveCategoriesList(categoriesList);
        }
    }
    
    // recebe um id e retorna a categoria
    static getCategoryById(id) {
        const categoriesList =  this._getCategoriesList();

        const categoryStorage = categoriesList.find(c => c.id === id);

        if (!categoryStorage) {
            return null;
        }

        const category = new CategoryModel(
            categoryStorage.categoryName, 
            categoryStorage.limit,
            categoryStorage.type === "PADRÃO" ? CATEGORY_TYPE_MODEL.DEFAULT : CATEGORY_TYPE_MODEL.CUSTOM
        );

        category.id = categoryStorage.id;

        return category;
    }
}