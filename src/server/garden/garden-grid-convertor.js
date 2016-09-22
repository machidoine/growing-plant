/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'


module.exports = class GardenGridConvertor {
    static toGrid(garden) {
        return garden.plantGrid.points.concat(garden.stemGrid.points).concat(garden.moldGrid.points);
    }
};
