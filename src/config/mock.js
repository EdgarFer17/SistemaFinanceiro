import CategoryModel from '../model/categoryModel.js';
import CategoryController from '../controller/categoryController.js';
import CATEGORY_TYPE_MODEL from '../model/categoryTypeModel.js';
import TransactionModel from '../model/TransactionModel.js';
import TransactionController from '../controller/TransactionController.js';
import TRANSACTION_TYPE_MODEL from '../model/TransactionTypeModel.js';

export function getMockTransaction(quantity = 1000, min_value = 25, max_value = 350, date_range = 365) {
    try {
        const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const getRandomDate = () => {
            const DATE = new Date();
            DATE.setDate(DATE.getDate() - getRandomValue(1, date_range));
            return DATE;
        };

        const categories = [];
        for (let i = 1; i <= 9; i++) {
            const CATEGORY = new CategoryModel(String(i), 1000, CATEGORY_TYPE_MODEL.CUSTOM);
            CategoryController.createCategory(CATEGORY);
            categories.push(CATEGORY);
        }

        const TRANSACTION_TYPES = [TRANSACTION_TYPE_MODEL.EXPENSE, TRANSACTION_TYPE_MODEL.INCOME];

        for (let i = 0; i < quantity; i++) {
            const RANDOM_CATEGORY = categories[getRandomValue(0, categories.length - 1)];
            
            const RANDOM_TYPE = TRANSACTION_TYPES[getRandomValue(0, 1)];
            
            const RANDOM_AMOUNT = getRandomValue(min_value, max_value); 
            
            const transaction = new TransactionModel(
                getRandomDate(), 
                RANDOM_CATEGORY, 
                RANDOM_TYPE, 
                RANDOM_AMOUNT
            );

            TransactionController.createTransaction(transaction);
        }

        
    } catch (error) {
        console.error(error)
    }
}