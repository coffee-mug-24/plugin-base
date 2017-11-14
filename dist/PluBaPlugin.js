"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluBaEventBus_1 = require("./PluBaEventBus");
var Panel_1 = require("./extensions/Panel");
var PluBaSettings_1 = require("./PluBaSettings");
var KEY_DISPLAY_ENABLED = PluBaSettings_1.PluBaSettingsKeys.KEY_DISPLAY_ENABLED;
var PluBaPlugin = /** @class */ (function () {
    function PluBaPlugin(world, page, componentConstructors, configuration) {
        this.world = world;
        this.page = page;
        this.componentConstructors = componentConstructors;
        this.configuration = configuration;
        this._state = null;
        this._pluginComponentCandidates = [];
        this._pluginComponents = [];
        if (configuration.panelize) {
            componentConstructors.push(Panel_1.Panel);
        }
    }
    PluBaPlugin.prototype.setup = function () {
        var _this = this;
        console.log('Plugin :: Setup Start');
        this._construct(this.componentConstructors, this._pluginComponentCandidates);
        this.world.on(PluBaEventBus_1.PluBaEventTypes.PAGE_INITIALIZED, function () {
            _this.world.settings.booleanSettingOrDefault(KEY_DISPLAY_ENABLED, _this.configuration.enabledByDefault)
                .then(function (displayEnabled) {
                if (_this._state === 'active') {
                    return;
                }
                if (!displayEnabled) {
                    return;
                }
                _this.world.emit(PluBaEventBus_1.PluBaEventTypes.PLUGIN_STATUS, { newValue: 'active' });
            });
        });
        this.world.on(PluBaEventBus_1.PluBaEventTypes.PLUGIN_STATUS, function (event) {
            if (_this._state !== 'active' && event.details.newValue === 'active') {
                _this.activate();
            }
        });
        this.world.on(PluBaEventBus_1.PluBaEventTypes.PLUGIN_STATUS, function (event) {
            if (_this._state !== 'inactive' && event.details.newValue === 'inactive') {
                _this.deactivate();
            }
        });
        this.world.on('navigationRequest', function (event) {
            _this.world.navigator.goTo(event.details.href);
        });
        this._state = 'set up';
        console.log('Plugin :: Setup End');
    };
    PluBaPlugin.prototype.initialize = function () {
        var _this = this;
        console.log('Plugin :: Initialize Start');
        this._pluginComponents = this._pluginComponentCandidates
            .filter((function (pluginComponent) { return pluginComponent.isApplicable(_this.page); }));
        this._pluginComponents.forEach(function (pluginComponent) {
            pluginComponent.beforeInitialize();
        });
        this._pluginComponents.forEach(function (pluginComponent) {
            pluginComponent.initialize();
        });
        this._pluginComponents.forEach(function (pluginComponent) {
            pluginComponent.afterInitialize();
        });
        this.page.markInitialized();
        this.world.emit(PluBaEventBus_1.PluBaEventTypes.LOCATION_LOADED, {
            hostHref: this.world.navigator.hostHref(),
            currentUrl: this.world.navigator.currentUrl()
        });
        this.world.emit(PluBaEventBus_1.PluBaEventTypes.PAGE_INITIALIZED, {
            page: this.page
        });
        this._state = 'initialized';
        console.log('Plugin :: Initialize End');
    };
    PluBaPlugin.prototype.activate = function () {
        this._pluginComponents.forEach(function (pluginComponent) {
            pluginComponent.activate();
        });
        this._state = 'active';
    };
    PluBaPlugin.prototype.deactivate = function () {
        this._pluginComponents.forEach(function (pluginComponent) {
            pluginComponent.deactivate();
        });
        this._state = 'inactive';
    };
    PluBaPlugin.prototype._construct = function (constructors, target) {
        var _this = this;
        constructors.forEach(function (constructor) {
            try {
                var instance = new constructor();
                try {
                    instance.setup(_this, _this.world, _this.page);
                    target.push(instance);
                }
                catch (e) {
                    debugger;
                    console.error('Failed to add component', e);
                }
            }
            catch (e) {
                debugger;
                console.error('Failed to instantiate or setup component');
            }
        });
    };
    return PluBaPlugin;
}());
exports.PluBaPlugin = PluBaPlugin;
var PluBaConfiguration = /** @class */ (function () {
    function PluBaConfiguration() {
        this.panelize = false;
        this.label = null;
        this.enabledByDefault = false;
    }
    return PluBaConfiguration;
}());
exports.PluBaConfiguration = PluBaConfiguration;
