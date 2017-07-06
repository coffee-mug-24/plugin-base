"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Panel_1 = require("./Panel");
var $ = require("jquery");
var chai_1 = require("chai");
var PluBaWorld_1 = require("../PluBaWorld");
var PluBaPage_1 = require("../PluBaPage");
var PluBaPlugin_1 = require("../PluBaPlugin");
var PluBaEventBus_1 = require("../PluBaEventBus");
var PluBaSettings_1 = require("../PluBaSettings");
describe('Panel', function () {
    it('should', function () {
        var panel = new Panel_1.Panel();
        var world = new PluBaWorld_1.PluBaWorld(new PluBaEventBus_1.DefaultPluBaEventBus(), new PluBaSettings_1.InMemoryPluBaSettings(), null, $);
        var page = new PluBaPage_1.PluBaPage(world, 'body');
        panel.setup(new PluBaPlugin_1.PluBaPlugin(world, page, [], { panelize: true, label: 'body' }), world, page);
        panel.initialize();
        chai_1.expect($('.plugin-base-panel')).to.be.length(1);
        chai_1.expect($('.plugin-base-panel .plugin-base-panel-test')).to.be.length(2);
    });
});
