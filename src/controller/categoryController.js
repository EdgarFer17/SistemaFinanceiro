import CATEGORY_TYPE_MODEL from "../model/categoryTypeModel.js";
import CategoryRepository from "../repository/categoryRepository.js";
import CategoryModel from "../model/categoryModel.js";
import TransactionRepository from "../repository/TransactionRepository.js"; 

export default class CategoryController {
    
    static createCategory(category) {
        if (!(category instanceof CategoryModel)) {
            throw new Error("O parâmetro passado precisa ser um CategoryModel!");
        }
        const CATEGORIES_NAMES = []
        CategoryRepository.getCategories().forEach(c => CATEGORIES_NAMES.push(c.categoryName));
        if (CATEGORIES_NAMES.includes(category.categoryName)) {
            throw new Error("Nome da categoria já está cadastrado!");
        }
        
        CategoryRepository.createCategory(category);
        
        // NOVO: Avisa o resto do sistema que uma categoria foi criada
        document.dispatchEvent(new CustomEvent('categories_updated'));
    }

    static getCategories() {
        return CategoryRepository.getCategories();
    }

    // --- REQUISITO RF16 & RF17: Lógica de Cálculo ---
    static getCategoryBudgetStatus(categoryId) {
        const category = CategoryRepository.getCategoryById(categoryId);
        const limit = Number(category.limit) || 0;
        
        // Busca transações e filtra por categoria e mês atual
        const TRANSACTIONS = TransactionRepository.getTransactions() || [];
        const now = new Date();
        
        const spent = TRANSACTIONS
            .filter(t => t.category.id === categoryId && 
                        t.date.getMonth() === now.getMonth() &&
                        t.date.getFullYear() === now.getFullYear())
            .reduce((sum, t) => sum + Number(t.value), 0);

        const percentage = (limit > 0 && spent > 0) ? (spent / limit) * 100 : 0;
        return {
            spent: spent,
            limit: limit,
            percentage: Math.round(percentage) // Arredondado para facilitar a leitura
        };
    }

    static editCategory(id, newCategory) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }
        if (!(newCategory instanceof CategoryModel)) {
            throw new Error("O parâmetro passado precisa ser um CategoryModel!");
        }
        const CATEGORY_TO_EDIT = CategoryRepository.getCategoryById(id);
        if (!CATEGORY_TO_EDIT) {
            throw new Error("Categoria não encontrada!");
        }
        if (CATEGORY_TO_EDIT.type === CATEGORY_TYPE_MODEL.DEFAULT && CATEGORY_TO_EDIT.categoryName !== newCategory.categoryName) {
            throw new Error("Não pode editar o nome de uma categoria padrão!");
        }
        const CATEGORIES_NAMES = []
        CategoryRepository.getCategories().forEach(c => {
            if (c.id !== id) CATEGORIES_NAMES.push(c.categoryName);
        });
        if (CATEGORIES_NAMES.includes(newCategory.categoryName)) {
            throw new Error("Nome da categoria já está cadastrado!");
        }
        
        CategoryRepository.editCategory(id, newCategory);

        // NOVO: Avisa o resto do sistema que uma categoria mudou de nome/limite
        document.dispatchEvent(new CustomEvent('categories_updated'));
    }
    
    static deleteCategory(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }
        const CATEGORY_TO_DELETE = CategoryRepository.getCategoryById(id);
        if (!CATEGORY_TO_DELETE) {
            throw new Error("Categoria não encontrada!");
        }
        if (CATEGORY_TO_DELETE.type === CATEGORY_TYPE_MODEL.DEFAULT) {
            throw new Error("Não pode editar uma categoria padrão!");
        }
        
        CategoryRepository.deleteCategory(id);

        // NOVO: Avisa o resto do sistema que uma categoria foi apagada
        document.dispatchEvent(new CustomEvent('categories_updated'));
    }
    
    static getCategoryById(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }
        const CATEGORY = CategoryRepository.getCategoryById(id);
        if (CATEGORY === null) throw new Error("Categoria não encontrada");
        return CATEGORY;
    }
}