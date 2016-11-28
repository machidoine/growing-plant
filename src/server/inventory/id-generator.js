/**
 * Created by bguilloteau on 21/11/16.
 */

let IdGenerator = class IdGenerator {
    constructor() {
    }

    static generate() {
        return this._id++;
    }

    static set id(id) {
        if(typeof this._id !== 'undefined' || this._id > 0) {
            throw new Error('Id has been reset to zero. Error !!');
        }

        this._id = id;
    }
}

IdGenerator.id = 0;

module.exports = IdGenerator;