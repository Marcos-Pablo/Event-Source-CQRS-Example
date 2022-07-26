export class CreateItemCommand {
    constructor(
        public readonly name: string,
        public readonly quantity: number,
        public readonly cost: number,
    ) { }
}