"use strict";
/// <reference path="../typings/browser.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserPluBaSettings = (function () {
    function BrowserPluBaSettings(_storage) {
        this._storage = _storage;
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
}());
exports.BrowserPluBaSettings = BrowserPluBaSettings;
var InMemoryPluBaSettings = (function () {
    function InMemoryPluBaSettings() {
        this._store = {};
    }
    InMemoryPluBaSettings.prototype.setSetting = function (key, value) {
        this._store[key] = value;
        return Promise.resolve(null);
    };
    InMemoryPluBaSettings.prototype.getSetting = function (key) {
        return Promise.resolve(this._store[key]);
    };
    return InMemoryPluBaSettings;
}());
exports.InMemoryPluBaSettings = InMemoryPluBaSettings;
