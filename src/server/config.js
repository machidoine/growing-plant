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
            dayTime: 1000,
            refreshTime:500
        },
        garden: {
            plant: {
                collected : {
                    minAgeToBeCollected: 3,
                    skillCoeffToBeCollected: 3
                },
                maxGrowth:20
            }
        },
        player: {
            max: 4,
            inventory: {
                initialStock: [{'attack': 1}, {'defense': 1}, {'fertility': 1}, {'victory': 1}, {'growth': 10}],
                maxStock: 20
            }
        }
    }
}