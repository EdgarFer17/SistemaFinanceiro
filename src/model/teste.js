import CategoryModel from "./categoryModel.js";
import TRANSACTION_TYPE_MODEL from "./transactionTypeModel.js";
import TransactionModel from "./transactionModel.js";
import CategoryRepository from "../repository/categoryRepository.js";
import TransactionRepository from "../repository/transactionRepository.js";

// limpar storage para teste
localStorage.removeItem("categories");
localStorage.removeItem("transactions");


// --------------------
// Criando categorias
// --------------------
const CATEGORY_1 = new CategoryModel("Saúde", 1000);
const CATEGORY_2 = new CategoryModel("Educação", 45);

// salvando categorias
CategoryRepository.createCategory(CATEGORY_1);
CategoryRepository.createCategory(CATEGORY_2);

console.log("Categorias salvas:");
console.log(CategoryRepository.getCategories());


// --------------------
// Criando transações
// --------------------
const TRANSACTION_1 = new TransactionModel(
    new Date(),
    CATEGORY_1,
    TRANSACTION_TYPE_MODEL.EXPENSE,
    10
);

const TRANSACTION_2 = new TransactionModel(
    new Date(),
    CATEGORY_2,
    TRANSACTION_TYPE_MODEL.INCOME,
    20
);

// salvando transações
TransactionRepository.createTransaction(TRANSACTION_1);
TransactionRepository.createTransaction(TRANSACTION_2);

console.log("Transações salvas:");
console.log(TransactionRepository.getTransactions());


// --------------------
// Editando transação
// --------------------
const NEW_TRANSACTION = new TransactionModel(
    new Date(),
    CATEGORY_1,
    TRANSACTION_TYPE_MODEL.EXPENSE,
    99
);

TransactionRepository.editTransaction(TRANSACTION_1.id, NEW_TRANSACTION);

console.log("Transações após edição:");
console.log(TransactionRepository.getTransactions());


// --------------------
// Deletando transação
// --------------------
TransactionRepository.deleteTransaction(TRANSACTION_2.id);

console.log("Transações após deletar:");
console.log(TransactionRepository.getTransactions());