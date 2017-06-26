"use strict";
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var PluBaEventBus_1 = require("../src/PluBaEventBus");
describe('PluBaEventBus', function () {
    it('should broadcast events', function () {
        var eventBus = new PluBaEventBus_1.DefaultPluBaEventBus();
        var callback = sinon.mock();
        eventBus.on('test', callback);
        eventBus.emit('test', { n: 42 });
        sinon.assert.calledOnce(callback);
        sinon.assert.calledWith(callback, { type: 'test', details: { n: 42 } });
    });
});
