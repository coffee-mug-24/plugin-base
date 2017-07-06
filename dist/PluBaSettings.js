"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PluBaSettingsKeys = (function () {
    function PluBaSettingsKeys() {
    }
    return PluBaSettingsKeys;
}());
PluBaSettingsKeys.KEY_DISPLAY_ENABLED = 'display.enabled';
exports.PluBaSettingsKeys = PluBaSettingsKeys;
var AbstractPluBaSettings = (function () {
    function AbstractPluBaSettings() {
    }
    AbstractPluBaSettings.prototype.booleanSettingOrDefault = function (key, defaultValue) {
        return this.getSetting(key)
            .then(function (enabled) {
            if (enabled === undefined) {
                return defaultValue;
            }
            return enabled === 'true';
        });
    };
    return AbstractPluBaSettings;
}());
exports.AbstractPluBaSettings = AbstractPluBaSettings;
var BrowserPluBaSettings = (function (_super) {
    __extends(BrowserPluBaSettings, _super);
    function BrowserPluBaSettings(_storage) {
        var _this = _super.call(this) || this;
        _this._storage = _storage;
        return _this;
    }
    BrowserPluBaSettings.prototype.setSetting = function (key, value) {
        var options = (_a = {}, _a[key] = value, _a);
        return this._storage.set(options);
        var _a;
    };
    BrowserPluBaSettings.prototype.getSetting = function (key) {
        return this._storage.get(key)
            .then(function (result) {
            return result[key];
        });
    };
    return BrowserPluBaSettings;
}(AbstractPluBaSettings));
exports.BrowserPluBaSettings = BrowserPluBaSettings;
var InMemoryPluBaSettings = (function (_super) {
    __extends(InMemoryPluBaSettings, _super);
    function InMemoryPluBaSettings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._store = {};
        return _this;
    }
    InMemoryPluBaSettings.prototype.setSetting = function (key, value) {
        this._store[key] = value;
        return Promise.resolve(null);
    };
    InMemoryPluBaSettings.prototype.getSetting = function (key) {
        return Promise.resolve(this._store[key]);
    };
    return InMemoryPluBaSettings;
}(AbstractPluBaSettings));
exports.InMemoryPluBaSettings = InMemoryPluBaSettings;
