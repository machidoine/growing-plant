/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'


module.exports = class Grid {
    constructor(boundaries) {
        this._boundaries = boundaries;
        this._points = {};
    }

    get points() {
        return Object.keys(this._points).map(k => this._points[k]);
    }

    getPoint(position) {
        return this._points[this.getIndex(position)];
    }

    addPoint(point) {
        this._points[this.getIndex(point.position)] = point;
    }

    getIndex(position) {
        return position.y + '_' + position.x;
    }

    removePoint(point) {
      delete this._points[this.getIndex(point.position)];
    }

}

