export class MoneyUtils {

    static readonly MONEY_PATTERN: RegExp = /^([+-]?[0-9]*)[,.]?([0-9]{0,2})$/;

    static convertMoneyToInt(value: string): number {
        const match: RegExpMatchArray = value.match(MoneyUtils.MONEY_PATTERN);
        return 100 * +`${match[1] || '0'}.${match[2] || '0'}`;
    }

}
