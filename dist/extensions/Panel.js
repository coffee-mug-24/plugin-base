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
var PluBaPluginComponent_1 = require("../PluBaPluginComponent");
var PluBaEventBus_1 = require("../PluBaEventBus");
var PluBaSettings_1 = require("../PluBaSettings");
var KEY_DISPLAY_ENABLED = PluBaSettings_1.PluBaSettingsKeys.KEY_DISPLAY_ENABLED;
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = "\n<div class=\"plugin-base-panel\" style=\"position: fixed; bottom: 2px; left: 4px; height: 24px; line-height: 24px;\">\n</div>\n";
        return _this;
    }
    Panel.prototype.initialize = function () {
        var existingPanel = this.page.body().find('.plugin-base-panel');
        if (existingPanel.length === 0) {
            this.page.body().append(this.jQuery(this.template));
        }
        this.panel = this.page.body().find('.plugin-base-panel');
        this._restore(this.plugin.configuration.label);
    };
    Panel.prototype._restore = function (label) {
        var _this = this;
        var existingElement = this.panel.find(".plugin-base-panel-" + label);
        if (existingElement.length === 0) {
            this.panel.append("<span class=\"plugin-base-panel-" + label + "\" data-enabled=\"false\" style=\"padding-right: 0.5em;\">" + label + "</span>");
        }
        var element = this.panel.find(".plugin-base-panel-" + label);
        element.click(function (event) {
            var displayEnabled = element.attr('data-enabled') === 'false';
            _this._styleElement(element, displayEnabled);
            _this.world.settings.setSetting(KEY_DISPLAY_ENABLED, displayEnabled ? 'true' : 'false');
            _this.world.emit(PluBaEventBus_1.PluBaEventTypes.PLUGIN_STATUS, { newValue: displayEnabled ? 'active' : 'inactive' });
        });
        this.world.settings.booleanSettingOrDefault(KEY_DISPLAY_ENABLED, this.plugin.configuration.enabledByDefault)
            .then(function (displayEnabled) {
            _this._styleElement(element, displayEnabled);
        });
    };
    Panel.prototype._styleElement = function (element, displayEnabled) {
        if (displayEnabled) {
            element.attr('data-enabled', 'true');
            element.css('color', 'black');
        }
        else {
            element.attr('data-enabled', 'false');
            element.css('color', 'lightgray');
        }
    };
    return Panel;
}(PluBaPluginComponent_1.AbstractPluBaPluginComponent));
exports.Panel = Panel;
