import TransactionRepository from "../repository/TransactionRepository.js";
import TRANSACTION_TYPE_MODEL from '../model/TransactionTypeModel.js';
import BalanceController from "./balanceController.js";

export default class DashboardController {

    // retorna as últimas 5 transações
    static getLastFiveTransactions() {
        const ALL_TRANSACTIONS = TransactionRepository.getTransactions();
        
        return ALL_TRANSACTIONS.sort((a, b) => b.id - a.id).slice(0, 5);
    }

    // retorna o gasto e a arrecadação dos últimos 6 meses
    static getExpenseIncomeOfLastSixMonths() {
        const EXPENSE_INCOME_PER_MONTH = {};

        const ALL_TRANSACTIONS = TransactionRepository.getTransactions();

        ALL_TRANSACTIONS.forEach(t => {
            const MONTH = new Date(t.date).getMonth();
            const YEAR = new Date(t.date).getFullYear();
            const KEY = `${YEAR}-${MONTH}`;

            if (!EXPENSE_INCOME_PER_MONTH[KEY]) {
                EXPENSE_INCOME_PER_MONTH[KEY] = {
                    expense: 0,
                    income: 0
                }
            }

            if (t.type === TRANSACTION_TYPE_MODEL.INCOME) {
                EXPENSE_INCOME_PER_MONTH[KEY].income += t.value;
            } else {
                EXPENSE_INCOME_PER_MONTH[KEY].expense += t.value;
            }
        });

        const EXPENSE_INCOME_OF_LAST_SIX_MONTHS = Object.entries(EXPENSE_INCOME_PER_MONTH)
        .sort((a,b) => new Date(b[0].split("-")[0], b[0].split("-")[1]) - new Date(a[0].split("-")[0], a[0].split("-")[1]))
        .slice(0, 6)
        .map(([date, data]) => ({
            date: date.split("-")[0] + " - " + new Date(date.split("-")[0], date.split("-")[1])
                .toLocaleString('pt-BR', { month: 'long' })
                .toUpperCase(),
            ...data
        }));

        return EXPENSE_INCOME_OF_LAST_SIX_MONTHS;
    }

    // retorna o gasto e a arrecadação do ultimo mês
    static getMonthExpenseIncome() {
        const EXPENSE_INCOME = {};

        const ALL_TRANSACTIONS = TransactionRepository.getTransactions();

        ALL_TRANSACTIONS.forEach(t => {
            const MONTH = new Date(t.date).getMonth();
            const YEAR = new Date(t.date).getFullYear();
            const KEY = `${YEAR}-${MONTH}`;

            if (!EXPENSE_INCOME[KEY]) {
                EXPENSE_INCOME[KEY] = {
                    expense: 0,
                    income: 0
                }
            }

            if (t.type === TRANSACTION_TYPE_MODEL.INCOME) {
                EXPENSE_INCOME[KEY].income += t.value;
            } else {
                EXPENSE_INCOME[KEY].expense += t.value;
            }
        });

        const expenseIncomeForLastMonth = Object.entries(EXPENSE_INCOME)
        .sort((a,b) => new Date(b[0].split("-")[0], b[0].split("-")[1]) - new Date(a[0].split("-")[0], a[0].split("-")[1]))
        .at(0)[1];
        
        return expenseIncomeForLastMonth;
    }

    static getExpenseByCategories() {
        const EXPENSE_BY_CATEGORY = {}
        const ALL_TRANSACTIONS = TransactionRepository.getTransactions();

        ALL_TRANSACTIONS.forEach(t => {
            const category = t.category.categoryName.toUpperCase();

            if (!EXPENSE_BY_CATEGORY[category]) {
                EXPENSE_BY_CATEGORY[category] = {
                    expense: 0
                }
            }

            if (t.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
                EXPENSE_BY_CATEGORY[category].expense += t.value;
            }
        });
        return EXPENSE_BY_CATEGORY;
    }

    static getTotalIncome() {
        const ALL_TRANSACTIONS = TransactionRepository.getTransactions();
        let total_income = 0;
        ALL_TRANSACTIONS.forEach(t => {
            if (t.type === TRANSACTION_TYPE_MODEL.INCOME) {
                total_income += t.value;
            }
        });
        return total_income;
    }

    static getTotalExpense() {
        const ALL_TRANSACTIONS = TransactionRepository.getTransactions();
        let total_expense = 0;
        ALL_TRANSACTIONS.forEach(t => {
            if (t.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
                total_expense += t.value;
            }
        });
        return total_expense;
    }
}