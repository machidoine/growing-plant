/**
 * Created by bguilloteau on 19/10/16.
 */

define(['./constants', './util/proxy'], (Constants, proxy) => {
    return class GardenElementSpritePropertiesProvider {
        constructor() {
        }

        static provide(gardenElement) {
            var bodyAngleWithElbowNamed = (elbowName) => {
                return () => {
                    var bodyAngle = Constants.bodyAngle[gardenElement.previousDirection][gardenElement.direction];
                    return {
                        'angle': bodyAngle.angle,
                        'name': bodyAngle.isElbow ? 'plant-elbow' : gardenElement.type
                    }
                }
            }

            return proxy({
                'plant-body': bodyAngleWithElbowNamed('elbow'),
                'plant-head': bodyAngleWithElbowNamed('elbow')
            }).withDefaultValue(() => {
                return {
                    'angle': Constants.directions[gardenElement.direction],
                    'name': gardenElement.type
                }
            })[gardenElement.type]();
        }


    }
});
