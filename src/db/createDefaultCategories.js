import CategoryModel from "../model/categoryModel.js";
import CATEGORY_TYPE_MODEL from "../model/categoryTypeModel.js";
import CategoryRepository from "../repository/categoryRepository.js";

// esta classe e método tem como finalidade injetar as categorias padão no localStorage
export default class CreateCategoriesDefault {
    static create() {
        const CATEGORIES_LIST = CategoryRepository.getCategories();

        const CATEGORIES_NAMES = [
            'Alimentação', 
            'Saúde', 
            'Transporte', 
            'Moradia', 
            'Lazer', 
            'Salário', 
            'Outros', 
        ];

        for (let i = 1; i <= 7; i++) {
            
            const EXISTS = CATEGORIES_LIST.find(c => c.id === i);
            
            if (!EXISTS) {
                const category = new CategoryModel(CATEGORIES_NAMES[i - 1], 1000, CATEGORY_TYPE_MODEL.DEFAULT);

                CategoryRepository.createCategory(category);
            }
            
        }
    }
}