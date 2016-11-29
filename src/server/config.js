/**
 * Created by bguilloteau on 29/11/16.
 */


module.exports = {
    server: {
        log: {
            level: 1,
            winston: {
                level: 'debug'
            }
        }
    },
    game: {
        world: {
            width: 32,
            height: 24,
            dayTime: 1000
        },
        garden: {
            plant: {
                seed: {
                    minTimeToBeCollected: 3,
                    skillCoeffToBeCollected: 3
                }
            }
        },
        player: {
            max: 4,
            inventory: {
                initialStock: [{'attack': 1}, {'defense': 1}, {'fertility': 1}, {'victory': 1}, {'growth': 1}],
                maxStock: 20
            }
        }
    }
}