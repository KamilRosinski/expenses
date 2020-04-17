export interface AccountingPeriodOverview {
    readonly id: number;
    readonly yearMonth: string;
    readonly transactionCount: number;
    readonly income: number;
    readonly outcome: number;
}