/**
 * Created by bguilloteau on 21/11/16.
 */
'use strict'

let ReflectionUtil = require('../utils/reflection-util');

module.exports = class RemoteEventDispatcher {
    constructor(socket) {
        this._socket = socket;
    }

    init(eventHandler) {

        let onEvents = ReflectionUtil.listFunctionStartedBy(eventHandler, 'on');

        for (let onEventName of onEvents) {

            if (typeof eventHandler[onEventName] !== 'function') {
                throw new Error('event handler "' + eventHandler + '" does not have the function "' + onEventName + '"');
            }

            this._socket.on(this.rename(onEventName), (...args) => {
                console.log('receive event %s', onEventName);
                eventHandler[onEventName].apply(eventHandler, args);
            });
        }
    }

    rename(onEvent) {
        let event =  onEvent.substring(2);
        return event.charAt(0).toLowerCase() + event.slice(1);
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