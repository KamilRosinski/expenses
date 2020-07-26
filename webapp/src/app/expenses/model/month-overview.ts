export interface MonthOverview {
    readonly id: number;
    readonly year: number;
    readonly month: number;
    readonly transactionCount: number;
    readonly income: number;
    readonly outcome: number;
}