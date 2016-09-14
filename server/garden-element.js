'use strict'

module.exports = class GardenElement {

    constructor(data) {
        this._gardener = null;
        this._data = data;
    }

    get gardener() {
        return this._gardener;
    }

    set gardener(gardener) {
        this._gardener = gardener;
    }

    get position() {
        return this._data.position;
    }

    get data() {
        return this._data;
    }

}
