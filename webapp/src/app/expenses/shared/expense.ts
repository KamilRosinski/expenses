export interface Expense {
    readonly id: number;
    readonly date: Date;
    readonly description: string;
    readonly value: number;
}