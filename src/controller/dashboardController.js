import TransactionRepository from "../repository/TransactionRepository.js";
import TRANSACTION_TYPE_MODEL from '../model/TransactionTypeModel.js';
import BalanceController from "./balanceController.js";

export default class DashboardController {

    // retorna as últimas 5 transações
    static getLastFiveTransactions() {
        const allTransactions = TransactionRepository.getTransactions();
        
        return allTransactions.sort((a, b) => b.id - a.id).slice(0, 5);
    }

    // retorna o gasto e a arrecadação dos últimos 6 meses
    static getExpenseIncomeForLastSixMonth() {
        const expenseIncomeForMonth = {};

        const allTransactions = TransactionRepository.getTransactions();

        allTransactions.forEach(t => {
            const month = new Date(t.date).getMonth();
            const year = new Date(t.date).getFullYear();
            const key = `${year}-${month}`;

            if (!expenseIncomeForMonth[key]) {
                expenseIncomeForMonth[key] = {
                    expense: 0,
                    income: 0
                }
            }

            if (t.type === TRANSACTION_TYPE_MODEL.INCOME) {
                expenseIncomeForMonth[key].income += t.value;
            } else {
                expenseIncomeForMonth[key].expense += t.value;
            }
        });

        const expenseIncomeForLastSixMonth = Object.entries(expenseIncomeForMonth)
        .sort((a,b) => new Date(b[0].split("-")[0], b[0].split("-")[1]) - new Date(a[0].split("-")[0], a[0].split("-")[1]))
        .slice(0, 6)
        .map(([date, data]) => ({
            date: date.split("-")[0] + " - " + new Date(date.split("-")[0], date.split("-")[1])
                .toLocaleString('pt-BR', { month: 'long' })
                .toUpperCase(),
            ...data
        }));

        return expenseIncomeForLastSixMonth;
    }

    // retorna o gasto e a arrecadação do ultimo mês
    static getMonthExpenseIncome() {
        const expenseIncome = {};

        const allTransactions = TransactionRepository.getTransactions();

        allTransactions.forEach(t => {
            const month = new Date(t.date).getMonth();
            const year = new Date(t.date).getFullYear();
            const key = `${year}-${month}`;

            if (!expenseIncome[key]) {
                expenseIncome[key] = {
                    expense: 0,
                    income: 0
                }
            }

            if (t.type === TRANSACTION_TYPE_MODEL.INCOME) {
                expenseIncome[key].income += t.value;
            } else {
                expenseIncome[key].expense += t.value;
            }
        });

        const expenseIncomeForLastMonth = Object.entries(expenseIncome)
        .sort((a,b) => new Date(b[0].split("-")[0], b[0].split("-")[1]) - new Date(a[0].split("-")[0], a[0].split("-")[1]))
        .at(0)[1];
        
        return expenseIncomeForLastMonth;
    }

    static getExpensiveForCategories() {
        const expensiveForCategories = {}
        const allTransactions = TransactionRepository.getTransactions();

        allTransactions.forEach(t => {
            const category = t.category.categoryName.toUpperCase();

            if (!expensiveForCategories[category]) {
                expensiveForCategories[category] = {
                    expense: 0
                }
            }

            if (t.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
                expensiveForCategories[category].expense += t.value;
            }
        });

        return expensiveForCategories;
    }

    static getTotalIncome() {
        const allTransactions = TransactionRepository.getTransactions();
        let total_income = 0;
        allTransactions.forEach(t => {
            if (t.type === TRANSACTION_TYPE_MODEL.INCOME) {
                total_income += t.value;
            }
        });
        return total_income;
    }

    static getTotalExpense() {
        const allTransactions = TransactionRepository.getTransactions();
        let total_expense = 0;
        allTransactions.forEach(t => {
            if (t.type === TRANSACTION_TYPE_MODEL.EXPENSE) {
                total_expense += t.value;
            }
        });
        return total_expense;
    }
}