"use strict";

/**
 * Created by bguilloteau on 20/10/16.
 */

define([], () => {
    return (target) => {
        return {
            'withDefaultValue': (defaultValue) => {
                return new Proxy(target, {
                    get: (obj, prop) => {
                        if (prop in obj) {
                            return obj[prop];
                        }

                        return defaultValue;
                    }
                });
            }
        }
    }
});
