"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractPluBaPluginComponent = (function () {
    function AbstractPluBaPluginComponent() {
        this.active = false;
    }
    AbstractPluBaPluginComponent.prototype.setup = function (world, page) {
    };
    AbstractPluBaPluginComponent.prototype.initialize = function () {
    };
    AbstractPluBaPluginComponent.prototype.isApplicable = function (page) {
        return true;
    };
    AbstractPluBaPluginComponent.prototype.activate = function () {
        if (this.isActive() === true) {
            debugger;
            throw new Error('already active');
        }
        this.active = true;
        this.onActivation();
    };
    AbstractPluBaPluginComponent.prototype.onActivation = function () {
    };
    AbstractPluBaPluginComponent.prototype.deactivate = function () {
        if (this.isActive() === false) {
            debugger;
            throw new Error('already inactive');
        }
        this.active = false;
        this.onDeactivation();
    };
    AbstractPluBaPluginComponent.prototype.onDeactivation = function () {
    };
    AbstractPluBaPluginComponent.prototype.isActive = function () {
        return this.active;
    };
    return AbstractPluBaPluginComponent;
}());
exports.AbstractPluBaPluginComponent = AbstractPluBaPluginComponent;
