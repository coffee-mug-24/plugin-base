"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractPluBaPluginComponent = /** @class */ (function () {
    function AbstractPluBaPluginComponent() {
        this.active = false;
    }
    AbstractPluBaPluginComponent.prototype.setup = function (plugin, world, page) {
        this._plugin = plugin;
        this._world = world;
        this._page = page;
        this.afterSetup();
    };
    Object.defineProperty(AbstractPluBaPluginComponent.prototype, "plugin", {
        get: function () {
            if (!this._plugin) {
                throw new Error('plugin not initialized - invoke "setup"!');
            }
            return this._plugin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractPluBaPluginComponent.prototype, "world", {
        get: function () {
            if (!this._world) {
                throw new Error('world not initialized - invoke "setup"!');
            }
            return this._world;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractPluBaPluginComponent.prototype, "page", {
        get: function () {
            if (!this._page) {
                throw new Error('page not initialized - invoke "setup"!');
            }
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractPluBaPluginComponent.prototype, "jQuery", {
        get: function () {
            if (!this._page) {
                throw new Error('jQuery not initialized - invoke "setup"!');
            }
            return this.world.$;
        },
        enumerable: true,
        configurable: true
    });
    AbstractPluBaPluginComponent.prototype.afterSetup = function () {
    };
    AbstractPluBaPluginComponent.prototype.beforeInitialize = function () {
    };
    AbstractPluBaPluginComponent.prototype.initialize = function () {
    };
    AbstractPluBaPluginComponent.prototype.afterInitialize = function () {
    };
    AbstractPluBaPluginComponent.prototype.isApplicable = function (page) {
        return true;
    };
    AbstractPluBaPluginComponent.prototype.activate = function () {
        if (this.isActive() === true) {
            throw new Error('already active');
        }
        this.active = true;
        this.onActivation();
    };
    AbstractPluBaPluginComponent.prototype.onActivation = function () {
    };
    AbstractPluBaPluginComponent.prototype.deactivate = function () {
        if (this.isActive() === false) {
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
