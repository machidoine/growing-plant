/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

module.exports = class GardenBoundaries {
    constructor(garden) {
        this.garden = garden;
    }

    isOut(point) {
        if (point.x >= this.garden.width || point.y >= this.garden.height || point.x < 0 || point.y < 0) {
            return true;
        }

        return false;
    }

    isIn(point) {
        return !this.isOut(point);
    }
};