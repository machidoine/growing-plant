/**
 * Created by benjamin on 7/28/2016.
 */
'use strict'

module.exports = {
    clone : function (object) {
        return JSON.parse(JSON.stringify(object));
    }
}
