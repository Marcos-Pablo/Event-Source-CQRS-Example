export class UpdateItemCommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly quantity: number,
        public readonly cost: number,
    ) { }
}