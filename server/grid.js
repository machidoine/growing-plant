/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'


module.exports = class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this._points = [];
        this.initPoints();
    }

    initPoints() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this._points.push(undefined);
            }
        }
    }

    get points() {
        var p = [];
        this._points.forEach(function (e) {
            if (typeof e !== 'undefined') {
                p.push(e);
            }
        });
        return p;
    }

    getPoint(position) {
        return this._points[this.getIndex(position)];
    }

    addPoint(point) {
        this._points[this.getIndex(point.position)] = point;
    }

    getCellByType(type) {
        return this._points.filter(function (e) {
            return e.type == type;
        });
    }

    getIndex(position) {
        return position.y * this.width + position.x;
    }

    removePoint(point) {
        console.log('removePoint');
        console.log(this.points);
        this._points[this.getIndex(point.position)] = undefined;
        console.log(this.points);
    }

}

