import TransactionRepository from "../repository/TransactionRepository.js";
import TRANSACTION_TYPE_MODEL from "../model/TransactionTypeModel.js";

export default class ReportController {
    constructor(){}

    /**
    Método auxiliar para filtrar apenas despesas
    */
    static _getExpenses() {
        return TransactionRepository.getTransactions().filter(
            t => t.type === TRANSACTION_TYPE_MODEL.EXPENSE
        );
    }

    /**
    Métod auxiliar para pegar transações do mês passado
     */
    static _getLastMonthTransactions() {
        const now = new Date();
        const expenses = this._getExpenses();
        
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        return expenses.filter(t => t.date >= firstDayLastMonth && t.date <= lastDayLastMonth);
    }

    /*
    Pega o gasto total do ultimo mês
    return: number;
    */
    static getLastMonthTotalExpense(){
        const lastMonthTransactions = this._getLastMonthTransactions();
        return lastMonthTransactions.reduce((ac, t) => ac + t.value, 0);
    }

    /*
    Pega o maior gasto do ultimo mês
    return: number;
    */
    static getLastMonthHigherExpense(){
        const lastMonthTransactions = this._getLastMonthTransactions();
        if (lastMonthTransactions.length === 0) return 0;
        return Math.max(...lastMonthTransactions.map(t => t.value));
    }
        
    /*
    Pega a categoria com o maior gasto do ultimo mês
    return: categoryName;
    */
    static getLastMonthExpensiveCategory(){
        const lastMonthTransactions = this._getLastMonthTransactions();
        if (lastMonthTransactions.length === 0) return null;

        const categoryTotals = {};
        lastMonthTransactions.forEach(t => {
            const name = t.category.categoryName;
            categoryTotals[name] = (categoryTotals[name] || 0) + t.value;
        });

        return Object.keys(categoryTotals).reduce((a, b) => 
            categoryTotals[a] > categoryTotals[b] ? a : b
        );
    }

    /*
    Pega o gasto total de um mes para cada ano
    return: {year: [string...], sum_of_expenses: [number...]}
    */ 
    static getTotalExpensesOfMonth(monthNumber){
        const expenses = this._getExpenses();
        const yearGroups = {};

        expenses.filter(t => t.date.getMonth() === monthNumber).forEach(t => {
            const year = t.date.getFullYear().toString();
            yearGroups[year] = (yearGroups[year] || 0) + t.value;
        });

        return {
            year: Object.keys(yearGroups),
            sum_of_expenses: Object.values(yearGroups)
        };
    }

    /*
    Pega o maior gasto de um mes para cada ano
    return: {year: [string...], expense: [number...]}
    */ 
    static getHigherExpensesOfMonth(monthNumber){
        const expenses = this._getExpenses();
        const yearGroups = {};

        expenses.filter(t => t.date.getMonth() === monthNumber).forEach(t => {
            const year = t.date.getFullYear().toString();
            if (!yearGroups[year] || t.value > yearGroups[year]) {
                yearGroups[year] = t.value;
            }
        });

        return {
            year: Object.keys(yearGroups),
            expense: Object.values(yearGroups)
        };
    }

    /*
    Pega a categoria com maior gasto de um mes para cada ano
    return: {year: [string...], category: [number...]}
    */
    static getExpensiveCategoryOfMonth(monthNumber){
        const expenses = this._getExpenses();
        const result = { year: [], category: [] };
        
        const dataMap = {}; 

        expenses.filter(t => t.date.getMonth() === monthNumber).forEach(t => {
            const year = t.date.getFullYear();
            const nameCat = t.category.categoryName;
            if (!dataMap[year]) dataMap[year] = {};
            dataMap[year][nameCat] = (dataMap[year][nameCat] || 0) + t.value;
        });

        Object.keys(dataMap).forEach(year => {
            const categories = dataMap[year];
            const topCategory = Object.keys(categories).reduce((a, b) => 
                categories[a] > categories[b] ? a : b
            );
            result.year.push(year);
            result.category.push(topCategory);
        });

        return result;
    }
}