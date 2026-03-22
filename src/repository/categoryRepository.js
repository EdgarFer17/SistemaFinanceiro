import TransactionController from '../controller/TransactionController.js';
import CategoryModel from '../model/categoryModel.js'
import CATEGORY_TYPE_MODEL from '../model/categoryTypeModel.js';
import TransactionModel from '../model/TransactionModel.js';

export default class CategoryRepository {

    // método utilitário para pegar as categorias do localStorage
    static _getCategoriesList() {
        return JSON.parse(localStorage.getItem('TARGET_FINANCE-categories')) || [];
    }

    // método utilitário para salvar as categorias do localStorage
    static _saveCategoriesList(categoriesList) {
        localStorage.setItem('TARGET_FINANCE-categories', JSON.stringify(categoriesList));
    }

    // método utilitário que gera id auto incrementado
    static _generateId(categoriesList) {
        if (categoriesList.length === 0) return 1;
        return Math.max(...categoriesList.map(c => c.id)) + 1;
    }
    
    // receber um CategoryModel e insere no localStorage
    static createCategory(category) {
        const CATEGORIES_LIST = this._getCategoriesList();

        category.id = this._generateId(CATEGORIES_LIST);

        CATEGORIES_LIST.push(category);

        this._saveCategoriesList(CATEGORIES_LIST);
    }

    // retorna uma lista de CategoryModel do localStorage
    static getCategories() {
        const CATEGORIES_LIST = this._getCategoriesList();

        return CATEGORIES_LIST.map(c => {
            const CATEGORY = new CategoryModel(c.categoryName, c.limit, c.type === "PADRÃO" ? CATEGORY_TYPE_MODEL.DEFAULT : CATEGORY_TYPE_MODEL.CUSTOM);
            CATEGORY.id = c.id;
            return CATEGORY;
        });
    }

    // recebe o id da categoria que deseja editar e a categoria para modificação
    static editCategory(id, newCategory) {
        const CATEGORIES_LIST = this._getCategoriesList();
        const TRANSACTION_LIST = TransactionController.getTransactions();
        const NEW_CATEGORY = new CategoryModel(newCategory.categoryName, newCategory.limit, newCategory.type);
        NEW_CATEGORY.id = id;
        let old_category_name = null;

        CATEGORIES_LIST.forEach(c => {
            if (c.id === id) {
                old_category_name = c.categoryName;
                c.categoryName = newCategory.categoryName;
                c.limit = newCategory.limit;
                c.type = newCategory.type;
                return;

            }
        })

        this._saveCategoriesList(CATEGORIES_LIST);
        console.log()

        TRANSACTION_LIST.forEach(t => {
            if (t.category.categoryName === old_category_name) {
                t.category = NEW_CATEGORY;
                TransactionController.editTransaction(t.id, t); // criar um editByCategory ou linguagem semelhante ao sql, atualmente realiza um save e um delete para cada transação modificada
            }
        })
    }
    
    // recebe um id da categoria e apaga a categoria do localStorage
    static deleteCategory(id) {
        const CATEGORIES_LIST =  this._getCategoriesList();

        const INDEX = CATEGORIES_LIST.findIndex(c => c.id === id);

        if (INDEX >= 0) {
            CATEGORIES_LIST.splice(INDEX, 1);
            this._saveCategoriesList(CATEGORIES_LIST);
        }
    }
    
    // recebe um id e retorna a categoria
    static getCategoryById(id) {
        const CATEGORIES_LIST =  this._getCategoriesList();

        const CATEGORY_STORAGE = CATEGORIES_LIST.find(c => c.id === id);

        if (!CATEGORY_STORAGE) {
            return null;
        }

        const CATEGORY = new CategoryModel(
            CATEGORY_STORAGE.categoryName, 
            CATEGORY_STORAGE.limit,
            CATEGORY_STORAGE.type === "PADRÃO" ? CATEGORY_TYPE_MODEL.DEFAULT : CATEGORY_TYPE_MODEL.CUSTOM
        );

        CATEGORY.id = CATEGORY_STORAGE.id;

        return CATEGORY;
    }
}