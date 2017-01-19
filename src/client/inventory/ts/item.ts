export class Item {
    name: string
    count: number

    constructor(count:number){
        this.count = count
    }

    getNumber():number {
        return this.count;
    }
}
