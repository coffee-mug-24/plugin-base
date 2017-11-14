"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INITIALIZED_KEY = 'tofInitialized';
var PluBaPage = /** @class */ (function () {
    function PluBaPage(world, bodySelector) {
        this.world = world;
        this.bodySelector = bodySelector;
        this._body = null;
    }
    PluBaPage.prototype.body = function () {
        if (this._body === null) {
            var lookupResult = this.world.$(this.bodySelector);
            if (lookupResult.length !== 1) {
                throw Error("No body found with selector '" + this.bodySelector + "'");
            }
            this._body = this.world.$(lookupResult[0]);
        }
        return this._body;
    };
    PluBaPage.prototype.markInitialized = function () {
        if (this.isInitialized()) {
            return;
        }
        this.body().attr('data-' + exports.INITIALIZED_KEY, 'initialized');
    };
    PluBaPage.prototype.isInitialized = function () {
        return this.body().attr('data-' + exports.INITIALIZED_KEY) === 'initialized';
    };
    return PluBaPage;
}());
exports.PluBaPage = PluBaPage;
