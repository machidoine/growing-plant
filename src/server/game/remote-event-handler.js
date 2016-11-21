/**
 * Created by bguilloteau on 21/11/16.
 */
'use strict'

module.exports = class RemoteEventDispatcher {
    constructor(socket) {
        this._socket = socket;
    }

    init(eventHandler, events) {
        for (let eventName of events) {

            if (typeof eventHandler[eventName] !== 'function') {
                throw new Error('event handler "' + eventHandler + '" does not have the function "' + eventName + '"');
            }

            this._socket.on(eventName, (...args) => {
                console.log('receive event %s', eventName);
                eventHandler[eventName].apply(eventHandler, args);
            });
        }
    }

    get sendEvent() {
        return new Proxy({}, {
            get: (target, name) => {
                return (...args) => {
                    console.log('call event "%s" with args "%s"', name, args);
                    args.unshift(name); // add name at the begin of the array
                    this._socket.emit.apply(this._socket, args);
                }
            }
        });
    }
}