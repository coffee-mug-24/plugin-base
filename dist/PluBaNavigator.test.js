"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var PluBaNavigator_1 = require("./PluBaNavigator");
describe('PluBaNavigator', function () {
    it('should return href for root', function () {
        var navigator = new PluBaNavigator_1.PluBaNavigator({ location: { href: 'http://localhost:8080/' } });
        chai_1.expect(navigator.hostHref()).to.equal('http://localhost:8080/');
    });
    it('should return href for non-root', function () {
        var navigator = new PluBaNavigator_1.PluBaNavigator({ location: { href: 'http://localhost:8080/some/folder/file.html' } });
        chai_1.expect(navigator.hostHref()).to.equal('http://localhost:8080/');
    });
});
