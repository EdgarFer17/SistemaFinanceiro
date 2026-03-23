export default class ReportController {
    constructor(){}

    /*
    Pega o gasto total do ultimo mês
    return: number;
    */
    static getLastMonthTotalExpense(){
        return 100;
    }

    /*
    Pega o maior gasto do ultimo mês
    return: number;
    */
    static getLastMonthHigherExpense(){
        return 200;
    }
    
    /*
    Pega a categoria com o maior gasto do ultimo mês
    return: categoryName;
    */
    static getLastMonthExpensiveCategory(){
        return "Feijao";
    }

    /*
    Pega o gasto total de um mes para cada ano
    return: {year: [string...], sum_of_expenses: [number...]}
    */ 
    static getTotalExpensesOfMonth(){
        return {year:["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"], sum_of_expenses: [100]}
    }

    /*
    Pega o maior gasto de um mes para cada ano
    return: {year: [string...], expense: [number...]}
    */ 
    static getHigherExpensesOfMonth(){
        return {year:["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"], expense: [200]}
    }

    /*
    Pega a categoria com maior gasto de um mes para cada ano
    return: {year: [string...], category: [number...]}
    */
    static getExpensiveCategoryOfMonth(){
        return {year:["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"], category: ["arroz", "feijao", "macarrao", "batata", "maionese", "peixe", "carne", "ovo"]}
    }
}