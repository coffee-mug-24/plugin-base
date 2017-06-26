"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluBaNavigator = (function () {
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
    PluBaNavigator.prototype.hostHref = function () {
        return this.currentUrl().substr(0, this.currentUrl().indexOf('\/mars\/'));
    };
    return PluBaNavigator;
}());
exports.PluBaNavigator = PluBaNavigator;
