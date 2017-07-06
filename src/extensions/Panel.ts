import {AbstractPluBaPluginComponent} from "../PluBaPluginComponent";
import {PluBaEventTypes} from "../PluBaEventBus";
import {PluBaSettingsKeys} from "../PluBaSettings";

import htmlString = JQuery.htmlString;
import Event = JQuery.Event;

const KEY_DISPLAY_ENABLED: string = PluBaSettingsKeys.KEY_DISPLAY_ENABLED;

export class Panel extends AbstractPluBaPluginComponent {

    private panel: JQuery;

    private readonly template: string = `
<div class="plugin-base-panel" style="position: fixed; bottom: 2px; left: 4px; height: 24px; line-height: 24px;">
</div>
`;

    initialize(): void {
        const existingPanel = this.page.body().find('.plugin-base-panel');
        if (existingPanel.length === 0) {
            this.page.body().append(this.jQuery(this.template));
        }
        this.panel = this.page.body().find('.plugin-base-panel');
        this._restore(this.plugin.configuration.label);
    }

    private _restore(label: String): void {
        const existingElement: JQuery = this.panel.find(`.plugin-base-panel-${label}`);
        if (existingElement.length === 0) {
            this.panel.append(`<span class="plugin-base-panel-${label}" data-enabled="false" style="padding-right: 0.5em;">${label}</span>`);
        }
        const element: JQuery = this.panel.find(`.plugin-base-panel-${label}`);

        element.click((event: Event) => {
            const displayEnabled = element.attr('data-enabled') === 'false';

            this._styleElement(element, displayEnabled);

            this.world.settings.setSetting(KEY_DISPLAY_ENABLED, displayEnabled ? 'true' : 'false');

            this.world.emit(PluBaEventTypes.PLUGIN_STATUS, {newValue: displayEnabled ? 'active' : 'inactive' });
        });

        this.world.settings.booleanSettingOrDefault(KEY_DISPLAY_ENABLED, this.plugin.configuration.enabledByDefault)
            .then((displayEnabled: boolean) => {
                this._styleElement(element, displayEnabled);
            });
    }

    private _styleElement(element: JQuery, displayEnabled: boolean) {
        if (displayEnabled) {
            element.attr('data-enabled', 'true');
            element.css('color', 'black');
        } else {
            element.attr('data-enabled', 'false');
            element.css('color', 'lightgray');
        }
    }
}
