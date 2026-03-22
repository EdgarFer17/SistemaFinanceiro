export default class ReportController {
    constructor(){}

    /*
    Pega o gasto total do ultimo mês
    return: number;
    */
    static getLastMonthTotalExpense(){}

    /*
    Pega o maior gasto do ultimo mês
    return: number;
    */
    static getLastMonthHigherExpense(){}
    
    /*
    Pega a categoria com o maior gasto do ultimo mês
    return: categoryName;
    */
    static getLastMonthExpensiveCategory(){}

    /*
    Pega o gasto total de um mes para cada ano
    return: {year: [string...], sum_of_expenses: [number...]}
    */ 
    static getTotalExpensesOfMonth(){}

    /*
    Pega o maior gasto de um mes para cada ano
    return: {year: [string...], expense: [number...]}
    */ 
    static getHigherExpensesOfMonth(){}

    /*
    Pega a categoria com maior gasto de um mes para cada ano
    return: {year: [string...], category: [number...]}
    */
    static getExpensiveCategoryOfMonth(){}
}