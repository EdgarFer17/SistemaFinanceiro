import CATEGORY_TYPE_MODEL from "../model/categoryTypeModel.js";
import CategoryRepository from "../repository/categoryRepository.js";
import CategoryModel from "../model/categoryModel.js";

export default class CategoryController {
    
    // receber um CategoryModel e insere
    static createCategory(category) {
        if (!(category instanceof CategoryModel)) {
            throw new Error("O parâmetro passado precisa ser um CategoryModel!");
        }

        const categoriesNames = []

        CategoryRepository.getCategories().forEach(c => categoriesNames.push(c.categoryName));

        if (categoriesNames.includes(category.categoryName)) {
            throw new Error("Nome da categoria já está cadastrado!");
        }

        CategoryRepository.createCategory(category);
    }

    // retorna uma lista de CategoryModel
    static getCategories() {
        return CategoryRepository.getCategories();
    }

    // recebe o id da categoria que deseja editar e a categoria para modificação
    static editCategory(id, newCategory) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        if (!(newCategory instanceof CategoryModel)) {
            throw new Error("O parâmetro passado precisa ser um CategoryModel!");
        }

        const categoryForEdit = CategoryRepository.getCategoryById(id);

        if (!categoryForEdit) {
            throw new Error("Categoria não encontrada!");
        }

        if (categoryForEdit.type === CATEGORY_TYPE_MODEL.DEFAULT && categoryForEdit.categoryName !== newCategory.categoryName) {
            throw new Error("Não pode editar o nome de uma categoria padrão!");
        }

        const categoriesNames = []

        CategoryRepository.getCategories().forEach(c => {
            if (c.id !== id) {
                categoriesNames.push(c.categoryName);
            }
        });

        if (categoriesNames.includes(newCategory.categoryName)) {
            throw new Error("Nome da categoria já está cadastrado!");
        }

        CategoryRepository.editCategory(id, newCategory);
    }
    
    // recebe um id da categoria e apaga a categoria
    static deleteCategory(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        const categoryForDelete = CategoryRepository.getCategoryById(id);

        if (!categoryForDelete) {
            throw new Error("Categoria não encontrada!");
        }

        if (categoryForDelete.type === CATEGORY_TYPE_MODEL.DEFAULT) {
            throw new Error("Não pode editar uma categoria padrão!");
        }

        CategoryRepository.deleteCategory(id);
    }
    
    // recebe um id e retorna a categoria
    static getCategoryById(id) {
        if (typeof id !== "number" || id < 0) {
            throw new Error("O id deve ser um número maior do que zero!");
        }

        const category = CategoryRepository.getCategoryById(id);

        if (category === null) {
            throw new Error("Categoria não encontrada")
        }

        return category;
    }
}