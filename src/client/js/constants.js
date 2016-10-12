'use strict'
/**
 * Created by bguilloteau on 06/10/16.
 */

define([], () => {
    return class Constants {
        static get directions() {
            return {
                'up': 0,
                'down': 180,
                'right': 90,
                'left': -90
            };
        }
    }
});