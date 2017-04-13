import {Item} from './item'
export class Inventory {
    constructor() {
        let item:Item = new Item(6)
        console.log(item.getNumber());
    }
}
