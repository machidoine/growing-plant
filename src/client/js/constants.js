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

        static get bodyAngle() {
            return {
                "up": {
                    "up": {"angle": 0, "isElbow": false},
                    "down": {},
                    "left": {"angle": 90, "isElbow": true},
                    "right": {"angle": 0, "isElbow": true}
                },
                "down": {
                    "up": {},
                    "down": {"angle": 180, "isElbow": false},
                    "left": {"angle": 180, "isElbow": true},
                    "right": {"angle": -90, "isElbow": true}
                },
                "left": {
                    "up": {"angle": -90, "isElbow": true},
                    "down": {"angle": 0, "isElbow": true},
                    "left": {"angle": -90, "isElbow": false},
                    "right": {}
                },
                "right": {
                    "up": {"angle": 180, "isElbow": true},
                    "down": {"angle": 90, "isElbow": true},
                    "left": {},
                    "right": {"angle": 90, "isElbow": false}
                }
            }
        }
    }
});