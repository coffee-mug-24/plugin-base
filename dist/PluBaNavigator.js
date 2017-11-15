"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluBaNavigator = /** @class */ (function () {
    function PluBaNavigator(window) {
        this.window = window;
    }
    PluBaNavigator.prototype.goTo = function (href) {
        console.log('opening href ' + href);
        this.window.location.href = href;
    };
    PluBaNavigator.prototype.currentUrl = function () {
        return this.window.location.href;
    };
    PluBaNavigator.prototype.currentHostname = function () {
        return new URL(this.currentUrl()).hostname;
    };
    PluBaNavigator.prototype.hostHref = function () {
        return this.currentHref();
    };
    PluBaNavigator.prototype.currentHref = function () {
        var url = new URL(this.currentUrl());
        var result = '';
        if (url.protocol) {
            result += url.protocol + '//';
        }
        result += url.host;
        result += '/';
        return result;
    };
    return PluBaNavigator;
}());
exports.PluBaNavigator = PluBaNavigator;
