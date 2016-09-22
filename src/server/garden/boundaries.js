/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

module.exports = class Boundaries {
    constructor(rectangle) {
        this.rectangle = rectangle;
    }

    isOut(point) {
        if (point.x >= this.rectangle.width || point.y >= this.rectangle.height || point.x < 0 || point.y < 0) {
            return true;
        }

        return false;
    }

    isIn(point) {
        return !this.isOut(point);
    }

    get width() {
        return this.rectangle.width;
    }

    get height() {
        return this.rectangle.height;
    }
};