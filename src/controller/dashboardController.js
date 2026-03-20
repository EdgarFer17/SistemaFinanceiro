import TransationRepository from "../repository/transationRepository.js";
import TRANSATION_TYPE_MODEL from '../model/transationTypeModel.js';

export default class DashboardController {

    // retorna as últimas 5 transações
    static getLastFiveTransactions() {
        const allTransactions = TransationRepository.getTransactions();
        
        return allTransactions.sort((a, b) => b.id - a.id).slice(0, 5);
    }

    // retorna o gasto e a arrecadação dos últimos 6 meses
    static getExpenseIncomeForLastSixMonth() {
        const expenseIncomeForMonth = {};

        const allTransactions = TransationRepository.getTransactions();

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

            if (t.type === "income") {
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

        console.log(expenseIncomeForLastSixMonth)
        return expenseIncomeForLastSixMonth;
    }

    static getExpensiveForCategories() {
        const expensiveForCategories = {}
        const allTransactions = TransationRepository.getTransactions();

        allTransactions.forEach(t => {
            const category = t.category.categoryName.toUpperCase();

            if (!expensiveForCategories[category]) {
                expensiveForCategories[category] = {
                    expense: 0
                }
            }

            if (t.type === TRANSATION_TYPE_MODEL.EXPENSE) {
                expensiveForCategories[category].expense += t.value;
            }
        });

        return expensiveForCategories;
    }

    static getExpensiveAndIncomePerMonth() {

    }
}