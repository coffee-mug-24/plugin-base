"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluBaWorld = (function () {
    function PluBaWorld(eventBus, settings, navigator, $) {
        this.eventBus = eventBus;
        this.settings = settings;
        this.navigator = navigator;
        this.$ = $;
    }
    PluBaWorld.prototype.emit = function (type, event) {
        this.eventBus.emit(type, event);
    };
    PluBaWorld.prototype.on = function (type, handler) {
        this.eventBus.on(type, handler);
    };
    return PluBaWorld;
}());
exports.PluBaWorld = PluBaWorld;
