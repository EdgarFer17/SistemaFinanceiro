import CategoryModel from "../model/categoryModel.js";
import CATEGORY_TYPE_MODEL from "../model/categoryTypeModel.js";
import CategoryRepository from "../repository/categoryRepository.js";

// esta classe e método tem como finalidade injetar as categorias padão no localStorage
export default class CreateCategoriesDefault {
    static create() {
        const categoriesList = CategoryRepository.getCategories();

        const nameForCategories = [
            'Alimentação', 
            'Saúde', 
            'Transporte', 
            'Moradia', 
            'Lazer', 
            'Salário', 
            'Outros', 
        ];

        for (let i = 1; i <= 7; i++) {
            
            const exists = categoriesList.find(c => c.id === i);
            
            if (!exists) {
                const category = new CategoryModel(nameForCategories[i - 1], 1000, CATEGORY_TYPE_MODEL.DEFAULT);

                CategoryRepository.createCategory(category);
            }
            
        }

        console.log(
            "Categorias padrão inseridas!");
    }
}