import {Item} from './item'
export class Inventory {
    constructor() {
        let item:Item = new Item(5)
        console.log(item.getNumber());
    }
}
