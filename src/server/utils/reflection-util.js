'use strict'

/**
 * Created by bguilloteau on 28/11/16.
 */

let winston = require('winston');

module.exports = class ReflectionUtil {
    constructor() {
    }

    static listFunctionStartedBy(object, pattern) {
        let properties = this.getAllFunction(object);

        winston.silly(properties);

        return properties.filter((property) => {
            return typeof object[property] === 'function' && property.startsWith(pattern);
        });
    }

    static getAllFunction(obj) {
        var props = [];

        do {
            props = props.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));

        return props;

    }
}
