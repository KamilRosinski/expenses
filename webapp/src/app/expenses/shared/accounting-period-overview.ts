export interface AccountingPeriodOverview {
    readonly id: number;
    readonly startDate: string;
    readonly endDate: number;
    readonly income: number;
    readonly outcome: number;
}