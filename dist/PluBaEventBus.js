"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluBaEventTypes = /** @class */ (function () {
    function PluBaEventTypes() {
    }
    PluBaEventTypes.PLUGIN_STATUS = 'plugin.status';
    PluBaEventTypes.PAGE_INITIALIZED = 'pageInitialized';
    PluBaEventTypes.LOCATION_LOADED = 'locationLoaded';
    return PluBaEventTypes;
}());
exports.PluBaEventTypes = PluBaEventTypes;
var PluBaEvent = /** @class */ (function () {
    function PluBaEvent(type, details) {
        this.type = type;
        this.details = details;
    }
    return PluBaEvent;
}());
exports.PluBaEvent = PluBaEvent;
var DefaultPluBaEventBus = /** @class */ (function () {
    function DefaultPluBaEventBus() {
        this.callbacks = new Map();
    }
    DefaultPluBaEventBus.prototype.emit = function (type, details) {
        console.log('event emitted ' + type + ' (' + details + ')');
        console.log(details);
        if (!this.callbacks || !this.callbacks.get(type)) {
            return;
        }
        this.callbacks.get(type).forEach(function (callback) {
            try {
                console.log('invoking callback');
                callback(new PluBaEvent(type, details));
            }
            catch (e) {
                debugger;
                console.error('exception while invoking callback', e);
            }
        });
    };
    DefaultPluBaEventBus.prototype.on = function (type, callback) {
        console.log('callback registered ' + type);
        if (!this.callbacks.get(type)) {
            this.callbacks.set(type, []);
        }
        this.callbacks.get(type).push(callback);
    };
    DefaultPluBaEventBus.prototype._reset = function () {
        delete this.callbacks;
    };
    return DefaultPluBaEventBus;
}());
exports.DefaultPluBaEventBus = DefaultPluBaEventBus;
