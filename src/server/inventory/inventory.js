/**
 * Created by bguilloteau on 03/11/16.
 */


module.exports = class Inventory {
    constructor(stock) {
        this._stock = stock;
    }

    provide(elementType, useIt) {
        if(this.hasEnough(elementType)) {
            this.remove(elementType);
            useIt();
        }
    }

    hasEnough(elementType) {
        return this._stock[elementType] > 0;
    }

    remove(elementType) {
        this._stock[elementType]--;
    }

    static create() {
        return new Inventory({
            'seed' : 5,
            'stem' : 8
        });
    }

    get stock() {
        return this._stock;
    }

}