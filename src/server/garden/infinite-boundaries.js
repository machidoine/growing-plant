/**
 * Created by Benjamin on 13/04/2017.
 */

'use strict'

module.exports = class InfiniteBoundaries {
    constructor() {
    }

    isOut(point) {
        return false;
    }

    isIn(point) {
        return true;
    }

    get width() {
        return -1;
    }

    get height() {
        return -1;
    }
};