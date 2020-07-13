export class Notification {

    readonly timestamp: number = Date.now();

    constructor(public readonly message: string) {
    }

}
