import Category from "./category.js";
import TRANSACTION_TYPE from "./transactionType.js";
import Transaction from "./transaction.js";

const CATEGORY_1 = new Category("Saúde", 1000);
const CATEGORY_2 = new Category("Educação", 45);

console.log(CATEGORY_1);
console.log(CATEGORY_2);


const TRANSACTION_1 = new Transaction(new Date(), CATEGORY_1, TRANSACTION_TYPE.EXPENSE, 10);
const TRANSACTION_2 = new Transaction(new Date(), CATEGORY_2, TRANSACTION_TYPE.INCOME, 20);

console.log(TRANSACTION_1);
console.log(TRANSACTION_2);


// Testando Validações

const CATEGORY_3 = new Category(1000, "Saúde");
const CATEGORY_4 = new Category(45, "Educação" );

console.log(CATEGORY_3);
console.log(CATEGORY_4);


const TRANSACTION_3 = new Transaction(1000, 1000, "TRANSACTION_TYPE.EXPENSE", "Teste");
const TRANSACTION_4 = new Transaction(1000, 1000, "TRANSACTION_TYPE.INCOME", "Teste");

console.log(TRANSACTION_3);
console.log(TRANSACTION_4);