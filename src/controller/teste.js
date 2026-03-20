import CategoryModel from "../model/categoryModel.js";
import CATEGORY_TYPE_MODEL from "../model/categoryTypeModel.js";
import TransationModel from "../model/transationModel.js";
import TRANSATION_TYPE_MODEL from "../model/transationTypeModel.js";
import DashboardController from "./dashboardController.js";
import TransactionController from "../controller/transationController.js";
import CategoryController from "../controller/categoryController.js";

// const category = new CategoryModel("1", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category1 = new CategoryModel("2", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category2 = new CategoryModel("3", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category3 = new CategoryModel("4", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category4 = new CategoryModel("5", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category5 = new CategoryModel("6", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category6 = new CategoryModel("7", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category7 = new CategoryModel("8", 1000, CATEGORY_TYPE_MODEL.CUSTOM);
// const category8 = new CategoryModel("9", 1000, CATEGORY_TYPE_MODEL.CUSTOM);

// CategoryController.createCategory(category);
// CategoryController.createCategory(category1);
// CategoryController.createCategory(category2);
// CategoryController.createCategory(category3);
// CategoryController.createCategory(category4);
// CategoryController.createCategory(category5);
// CategoryController.createCategory(category6);
// CategoryController.createCategory(category7);
// CategoryController.createCategory(category8);

// const transaction = new TransationModel(new Date(), category, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction1 = new TransationModel(new Date(), category1, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction2 = new TransationModel(new Date(), category2, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction3 = new TransationModel(new Date(), category3, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction4 = new TransationModel(new Date(), category4, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction5 = new TransationModel(new Date(), category5, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction6 = new TransationModel(new Date(), category6, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction7 = new TransationModel(new Date(), category7, TRANSATION_TYPE_MODEL.EXPENSE, 10)
// const transaction8 = new TransationModel(new Date(), category8, TRANSATION_TYPE_MODEL.EXPENSE, 10)

// TransactionController.createTransaction(transaction);
// TransactionController.createTransaction(transaction1);
// TransactionController.createTransaction(transaction2);
// TransactionController.createTransaction(transaction3);
// TransactionController.createTransaction(transaction4);
// TransactionController.createTransaction(transaction5);
// TransactionController.createTransaction(transaction6);
// TransactionController.createTransaction(transaction7);
// TransactionController.createTransaction(transaction8);

// console.log(DashboardController.getLastFiveTransactions());

// DashboardController.getExpenseIncomeForLastSixMonth()

console.log(DashboardController.getExpensiveForCategories());